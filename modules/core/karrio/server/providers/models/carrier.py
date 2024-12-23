import typing
import functools
import django.conf as conf
import django.forms as forms
import django.db.models as models

import karrio
import karrio.lib as lib
import karrio.core.units as units
import django.core.cache as caching
import karrio.api.gateway as gateway
import karrio.server.core.models as core
import karrio.server.core.fields as fields
import karrio.server.core.datatypes as datatypes


COUNTRIES = [(c.name, c.name) for c in units.Country]
CURRENCIES = [(c.name, c.name) for c in units.Currency]
WEIGHT_UNITS = [(c.name, c.name) for c in units.WeightUnit]
DIMENSION_UNITS = [(c.name, c.name) for c in units.DimensionUnit]
CAPABILITIES_CHOICES = [(c, c) for c in units.CarrierCapabilities.get_capabilities()]


class Manager(models.Manager):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .select_related(
                "created_by",
                *(("link",) if conf.settings.MULTI_ORGANIZATIONS else tuple()),
            )
        )


class CarrierManager(Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_system=False)


class SystemCarrierManager(models.Manager):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .prefetch_related(
                "configs",
            )
            .select_related(
                "created_by",
                *(("link",) if conf.settings.MULTI_ORGANIZATIONS else tuple()),
            )
            .filter(is_system=True)
        )


@core.register_model
class Carrier(core.OwnedEntity):
    class Meta:
        ordering = ["test_mode", "-created_at"]

    objects = Manager()
    user_carriers = CarrierManager()
    system_carriers = SystemCarrierManager()

    id = models.CharField(
        max_length=50,
        primary_key=True,
        default=functools.partial(core.uuid, prefix="car_"),
        editable=False,
    )
    carrier_code = models.CharField(
        max_length=100,
        db_index=True,
        default="generic",
        help_text="eg. dhl_express, fedex, ups, usps, ...",
    )
    carrier_id = models.CharField(
        max_length=150,
        db_index=True,
        help_text="eg. canadapost, dhl_express, fedex, purolator_courrier, ups...",
    )
    credentials = models.JSONField(
        default=core.field_default({}),
        help_text="Carrier connection credentials",
    )
    capabilities = fields.MultiChoiceField(
        choices=datatypes.CAPABILITIES_CHOICES,
        default=core.field_default([]),
        help_text="Select the capabilities of the carrier that you want to enable",
    )
    metadata = models.JSONField(
        blank=True,
        null=True,
        default=core.field_default({}),
        help_text="User defined metadata",
    )
    active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Disable/Hide carrier from clients",
    )
    is_system = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Determine that the carrier connection is available system wide.",
    )
    test_mode = models.BooleanField(
        default=True,
        db_column="test_mode",
        help_text="Toggle carrier connection mode",
    )

    created_by = models.ForeignKey(
        conf.settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        editable=False,
    )
    active_users = models.ManyToManyField(
        conf.settings.AUTH_USER_MODEL,
        blank=True,
        related_name="connection_users",
    )
    rate_sheet = models.ForeignKey(
        "RateSheet",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return self.carrier_id

    @property
    def object_type(self):
        return "carrier-connection"

    @property
    def ext(self) -> str:
        return (
            "generic"
            if "custom_carrier_name" in self.credentials
            else lib.failsafe(lambda: self.carrier_code) or "generic"
        )

    @property
    def carrier_name(self):
        return (
            self.credentials.get("custom_carrier_name")
            if "custom_carrier_name" in self.credentials
            else lib.failsafe(lambda: self.carrier_code) or "generic"
        )

    @property
    def display_name(self):
        import karrio.references as references

        return self.credentials.get("display_name") or references.collect_references()[
            "carriers"
        ].get(self.ext)

    @property
    def carrier_config(self):
        return self.__class__.resolve_config(self)

    @property
    def config(self) -> dict:
        return getattr(self.carrier_config, "config", {})

    @property
    def services(self) -> typing.Optional[typing.List[dict]]:

        if self.rate_sheet is None:
            return None

        return self.rate_sheet.services.all()

    @property
    def data(self) -> datatypes.CarrierSettings:
        _computed_data: typing.Dict = dict(
            id=self.id,
            config=self.config,
            test_mode=self.test_mode,
            metadata=self.metadata,
            carrier_id=self.carrier_id,
            carrier_name=self.ext,
            display_name=self.display_name,
        )

        if any(self.services or []):
            _computed_data.update(
                services=[forms.model_to_dict(s) for s in self.services]
            )

        # override the config with the system config
        if self.is_system and self.carrier_config is None:
            _config = self.__class__.resolve_config(self, is_system_config=True)
            _computed_data.update(config=getattr(_config, "config", None))

        return datatypes.CarrierSettings.create(
            {
                **self.credentials,
                **_computed_data,
            }
        )

    @property
    def gateway(self) -> gateway.Gateway:
        import karrio.server.core.middleware as middleware

        _context = middleware.SessionContext.get_current_request()
        _tracer = getattr(_context, "tracer", lib.Tracer())
        _cache = lib.Cache(caching.cache)

        return karrio.gateway[self.ext].create(
            self.data.to_dict(),
            _tracer,
            _cache,
        )

    @staticmethod
    def resolve_config(
        carrier, is_user_config: bool = False, is_system_config: bool = False
    ):
        """Resolve the config for a carrier.
        Here are the rules:
        - If the carrier is a system carrier, return the first config with no org
        - If the carrier is an org carrier, return the first config from the org
        - If the carrier is a user carrier, return the first config from the user
        """
        import karrio.server.serializers as serializers
        import karrio.server.core.middleware as middleware
        from django.contrib.auth.models import AnonymousUser
        from karrio.server.providers.models.config import CarrierConfig

        if carrier.id is None:
            return None

        _ctx = serializers.get_object_context(carrier)
        ctx = lib.identity(
            _ctx
            if (_ctx.user or _ctx.org)
            else lib.failsafe(lambda: middleware.SessionContext.get_current_request())
        )
        has_ctx_user = lib.identity(
            ctx and ((ctx.user and not isinstance(ctx.user, AnonymousUser)) or ctx.org)
        )

        queryset = lib.identity(
            CarrierConfig.objects.filter(carrier=carrier)
            if carrier.is_system
            else CarrierConfig.access_by(ctx).filter(carrier=carrier)
        )

        if carrier.is_system:
            _config = queryset.filter(
                created_by__is_staff=True,
                **({"org": None} if hasattr(carrier, "org") else {}),
            ).first()

            if has_ctx_user:
                return queryset.filter(
                    **(
                        {"org": (None if is_system_config else ctx.org)}
                        if hasattr(carrier, "org")
                        else {"created_by": ctx.user}
                    )
                ).first() or (None if is_user_config else _config)

            return _config

        return queryset.first()


def create_carrier_proxy(carrier_name: str, display_name):
    class _Manager(Manager):
        def get_queryset(self):
            return super().get_queryset().filter(carrier_code=carrier_name)

    class _CarrierManager(CarrierManager):
        def get_queryset(self):
            return super().get_queryset().filter(carrier_code=carrier_name)

    class _SystemCarrierManager(SystemCarrierManager):
        def get_queryset(self):
            return super().get_queryset().filter(carrier_code=carrier_name)

    return type(
        f"{carrier_name}Connection",
        (Carrier,),
        {
            "Meta": type(
                "Meta",
                (),
                {
                    "proxy": True,
                    "__module__": __name__,
                    "verbose_name": f"{display_name} Connection",
                    "verbose_name_plural": f"{display_name} Connections",
                },
            ),
            "__module__": __name__,
            "objects": _Manager(),
            "user_carriers": _CarrierManager(),
            "system_carriers": _SystemCarrierManager(),
        },
    )
