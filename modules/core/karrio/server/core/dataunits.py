import typing
from django.urls import reverse
from rest_framework.request import Request

import karrio.lib as lib
import karrio.server.conf as conf
import karrio.core.units as units
import karrio.references as references


PACKAGE_MAPPERS = references.collect_providers_data()

REFERENCE_MODELS = {
    **references.collect_references(),
    "customs_content_type": {c.name: c.value for c in list(units.CustomsContentType)},
    "incoterms": {c.name: c.value for c in list(units.Incoterm)},
}
REFERENCE_EXCLUSIONS = [
    "currencies",
    "incoterms",
    "weight_units",
    "dimension_units",
    "payment_types",
    "option_names",
    "customs_content_type",
    "options",
]
CARRIER_NAMES = list(sorted(REFERENCE_MODELS["carriers"].keys()))
CARRIER_HUBS = list(sorted(REFERENCE_MODELS["carrier_hubs"].keys()))
NON_HUBS_CARRIERS = [
    carrier_name for carrier_name in CARRIER_NAMES if carrier_name not in CARRIER_HUBS
]


def contextual_metadata(request: Request):
    _host: str = typing.cast(
        str,
        (
            request.build_absolute_uri(
                reverse("karrio.server.core:metadata", kwargs={})
            )
            if hasattr(request, "build_absolute_uri")
            else "/"
        ),
    )
    host = _host[:-1] if _host[-1] == "/" else _host

    return {
        "VERSION": conf.settings.VERSION,
        "APP_NAME": conf.settings.APP_NAME,
        "APP_WEBSITE": conf.settings.APP_WEBSITE,
        "HOST": f"{host}/",
        "ADMIN": f"{host}/admin",
        "GRAPHQL": f"{host}/graphql",
        "OPENAPI": f"{host}/openapi",
        **{
            flag: getattr(conf.settings, flag, None)
            for flag, _ in conf.settings.FEATURE_FLAGS
        },
    }


def contextual_reference(request: Request = None, reduced: bool = True):
    import karrio.server.core.gateway as gateway
    import karrio.server.core.validators as validators
    import karrio.server.core.middleware as middleware

    request = request or middleware.SessionContext.get_current_request()
    is_authenticated = (
        request.user.is_authenticated if hasattr(request, "user") else False
    )
    references = {
        **contextual_metadata(request),
        "ADDRESS_AUTO_COMPLETE": validators.Address.get_info(is_authenticated),
        **{
            k: v
            for k, v in REFERENCE_MODELS.items()
            if k not in (REFERENCE_EXCLUSIONS if reduced else [])
        },
    }

    def _get_generic_carriers():
        system_custom_carriers = [
            c for c in gateway.Carriers.list(system_only=True, carrier_name="generic")
        ]
        custom_carriers = [
            c
            for c in (
                gateway.Carriers.list(context=request, carrier_name="generic").exclude(
                    is_system=True
                )
                if is_authenticated
                else []
            )
        ]

        extra_carriers = {
            f"{c.credentials.get('custom_carrier_name') or 'generic'}": c.display_name
            for c in custom_carriers
        }
        system_carriers = {
            f"{c.credentials.get('custom_carrier_name') or 'generic'}": c.display_name
            for c in system_custom_carriers
        }
        extra_services = {
            f"{c.credentials.get('custom_carrier_name') or 'generic'}": {
                s.service_code: s.service_code
                for s in c.services
                or [
                    lib.to_object(lib.models.ServiceLevel, _)
                    for _ in references["service_levels"][c.ext]
                ]
            }
            for c in custom_carriers
        }
        extra_service_names = {
            name: {key: key.upper().replace("_", " ") for key, _ in value.items()}
            for name, value in extra_services.items()
        }

        references.update(
            dict(
                custom_carriers=extra_carriers,
                services={**references["services"], **extra_services},
                carriers={**references["carriers"], **system_carriers},
                service_names={**references["service_names"], **extra_service_names},
            )
        )

    if request is not None and "generic" in CARRIER_NAMES:
        _get_generic_carriers()

    return references
