import typing
import strawberry
from django.db import transaction
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions

import karrio.server.serializers as serializers
import karrio.server.core.validators as validators
import karrio.server.providers.models as providers
import karrio.server.manager.models as manager
import karrio.server.graph.models as graph
import karrio.server.core.models as core
import karrio.server.user.models as auth


class UserModelSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)

    class Meta:
        model = get_user_model()
        extra_kwargs = {
            field: {"read_only": True}
            for field in ["id", "is_staff", "last_login", "date_joined"]
        }
        fields = [
            "email",
            "full_name",
            "is_active",
            "is_staff",
            "last_login",
            "date_joined",
        ]

    @transaction.atomic
    def update(self, instance, data: dict, **kwargs):
        user = super().update(instance, data)

        if data.get("is_active") == False:
            user.save(update_fields=["is_active"])

        return user


@serializers.owned_model_serializer
class WorkspaceConfigModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth.WorkspaceConfig
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}
        exclude = ["created_at", "updated_at", "created_by"]

    def create(
        self, validated_data: dict, context: serializers.Context = None, **kwargs
    ):
        instance = super().create(validated_data, context=context, **kwargs)

        if (
            hasattr(auth.WorkspaceConfig, "org")
            and getattr(context, "org", None) is not None
        ):
            context.org.config = instance
            context.org.save()

        return instance


@serializers.owned_model_serializer
class MetafieldModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = core.Metafield
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}
        exclude = ["created_at", "updated_at", "created_by"]


@serializers.owned_model_serializer
class AddressModelSerializer(
    validators.AugmentedAddressSerializer, serializers.ModelSerializer
):
    country_code = serializers.CharField(required=False)

    class Meta:
        model = manager.Address
        extra_kwargs = {field: {"read_only": True} for field in ["id", "validation"]}
        exclude = ["created_at", "updated_at", "created_by", "validation"]


@serializers.owned_model_serializer
class CommodityModelSerializer(serializers.ModelSerializer):
    weight_unit = serializers.CharField()
    value_currency = serializers.CharField(required=False)
    origin_country = serializers.CharField(required=False)

    class Meta:
        model = manager.Commodity
        exclude = ["created_at", "updated_at", "created_by", "parent"]
        extra_kwargs = {field: {"read_only": True} for field in ["id", "parent"]}


@serializers.owned_model_serializer
class CustomsModelSerializer(serializers.ModelSerializer):
    NESTED_FIELDS = ["commodities"]

    incoterm = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    commodities = serializers.make_fields_optional(CommodityModelSerializer)(
        many=True, allow_null=True, required=False
    )

    class Meta:
        model = manager.Customs
        exclude = ["created_at", "updated_at", "created_by"]
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}

    @transaction.atomic
    def create(self, validated_data: dict, context: dict):
        data = {
            name: value
            for name, value in validated_data.items()
            if name not in self.NESTED_FIELDS
        }

        instance = super().create(data)

        serializers.save_many_to_many_data(
            "commodities",
            CommodityModelSerializer,
            instance,
            payload=validated_data,
            context=context,
        )

        return instance

    @transaction.atomic
    def update(
        self, instance: manager.Customs, validated_data: dict, **kwargs
    ) -> manager.Customs:
        data = {
            name: value
            for name, value in validated_data.items()
            if name not in self.NESTED_FIELDS
        }

        return super().update(instance, data)


@serializers.owned_model_serializer
class ParcelModelSerializer(validators.PresetSerializer, serializers.ModelSerializer):
    weight_unit = serializers.CharField(
        required=False, allow_null=True, allow_blank=True
    )
    dimension_unit = serializers.CharField(
        required=False, allow_null=True, allow_blank=True
    )

    class Meta:
        model = manager.Parcel
        exclude = ["created_at", "updated_at", "created_by", "items"]
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}


@serializers.owned_model_serializer
class TemplateModelSerializer(serializers.ModelSerializer):
    address = serializers.make_fields_optional(AddressModelSerializer)(required=False)
    customs = serializers.make_fields_optional(CustomsModelSerializer)(required=False)
    parcel = serializers.make_fields_optional(ParcelModelSerializer)(required=False)

    class Meta:
        model = graph.Template
        exclude = ["created_at", "updated_at", "created_by"]
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}

    @transaction.atomic
    def create(self, validated_data: dict, context: dict, **kwargs) -> graph.Template:
        data = {
            **validated_data,
            "address": serializers.save_one_to_one_data(
                "address",
                AddressModelSerializer,
                payload=validated_data,
                context=context,
            ),
            "customs": serializers.save_one_to_one_data(
                "customs",
                CustomsModelSerializer,
                payload=validated_data,
                context=context,
            ),
            "parcel": serializers.save_one_to_one_data(
                "parcel", ParcelModelSerializer, payload=validated_data, context=context
            ),
        }

        ensure_unique_default_related_data(validated_data, context=context)

        return super().create(data)

    @transaction.atomic
    def update(
        self, instance: graph.Template, validated_data: dict, **kwargs
    ) -> graph.Template:
        data = {
            key: value
            for key, value in validated_data.items()
            if key not in ["address", "customs", "parcel"]
        }

        serializers.save_one_to_one_data(
            "address", AddressModelSerializer, instance, payload=validated_data
        )
        serializers.save_one_to_one_data(
            "customs", CustomsModelSerializer, instance, payload=validated_data
        )
        serializers.save_one_to_one_data(
            "parcel", ParcelModelSerializer, instance, payload=validated_data
        )

        ensure_unique_default_related_data(validated_data, instance)

        return super().update(instance, data)


def ensure_unique_default_related_data(
    data: dict = None, instance: typing.Optional[graph.Template] = None, context=None
):
    _get = lambda key: data.get(key, getattr(instance, key, None))
    if _get("is_default") is not True:
        return

    if _get("address") is not None:
        query = dict(address__isnull=False, is_default=True)
    elif _get("customs") is not None:
        query = dict(customs__isnull=False, is_default=True)
    elif _get("parcel") is not None:
        query = dict(parcel__isnull=False, is_default=True)
    else:
        return

    graph.Template.access_by(context or instance.created_by).exclude(
        id=_get("id")
    ).filter(**query).update(is_default=False)


@serializers.owned_model_serializer
class ServiceLevelModelSerializer(serializers.ModelSerializer):
    dimension_unit = serializers.CharField(
        required=False, allow_null=True, allow_blank=True
    )
    weight_unit = serializers.CharField(
        required=False, allow_null=True, allow_blank=True
    )
    currency = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = providers.ServiceLevel
        exclude = ["created_at", "updated_at", "created_by"]
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}

    def update_zone(self, zone_index: int, zone_data: dict) -> None:
        """Update a specific zone in the service level."""
        if zone_index >= len(self.instance.zones):
            raise exceptions.ValidationError(
                _(f"Zone index {zone_index} is out of range"),
                code="invalid_zone_index",
            )

        self.instance.zones[zone_index].update(
            {k: v for k, v in zone_data.items() if v != strawberry.UNSET}
        )
        self.instance.save(update_fields=["zones"])

    def update(self, instance, validated_data):
        """Handle partial updates of service level data including zones."""
        zones_data = validated_data.pop("zones", None)
        instance = super().update(instance, validated_data)

        if zones_data is not None:
            # Handle zone updates if provided
            existing_zones = instance.zones or []
            updated_zones = []

            for idx, zone_data in enumerate(zones_data):
                if idx < len(existing_zones):
                    # Update existing zone
                    zone = existing_zones[idx].copy()
                    zone.update(
                        {k: v for k, v in zone_data.items() if v != strawberry.UNSET}
                    )
                    updated_zones.append(zone)
                else:
                    # Add new zone
                    updated_zones.append(zone_data)

            instance.zones = updated_zones
            instance.save(update_fields=["zones"])

        return instance


@serializers.owned_model_serializer
class LabelTemplateModelSerializer(serializers.ModelSerializer):
    template_type = serializers.CharField(required=False)

    class Meta:
        model = providers.LabelTemplate
        exclude = ["created_at", "updated_at", "created_by"]
        extra_kwargs = {field: {"read_only": True} for field in ["id"]}


@serializers.owned_model_serializer
class RateSheetModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = providers.RateSheet
        exclude = ["created_at", "updated_at", "created_by"]
        extra_kwargs = {field: {"read_only": True} for field in ["id", "services"]}

    def update_services(
        self, services_data: list, remove_missing: bool = False
    ) -> None:
        """Update services of the rate sheet."""
        existing_services = {s.id: s for s in self.instance.services.all()}

        for service_data in services_data:
            service_id = service_data.get("id")
            if service_id and service_id in existing_services:
                # Update existing service
                service = existing_services[service_id]
                service_serializer = ServiceLevelModelSerializer(
                    service,
                    data=service_data,
                    context=self.context,
                    partial=True,
                )
                service_serializer.is_valid(raise_exception=True)
                service_serializer.save()
            else:
                # Create new service
                service_serializer = ServiceLevelModelSerializer(
                    data=service_data,
                    context=self.context,
                )
                service_serializer.is_valid(raise_exception=True)
                service = service_serializer.save()
                self.instance.services.add(service)

        # Remove services that are not in the update
        if remove_missing:
            service_ids = {s.get("id") for s in services_data if "id" in s}
            for service in existing_services.values():
                if service.id not in service_ids:
                    self.instance.services.remove(service)
                    service.delete()

    def update_carriers(self, carriers: list) -> None:
        """Update carrier associations."""
        if carriers is not None:
            _ids = set(
                [*carriers, *(self.instance.carriers.values_list("id", flat=True))]
            )
            _carriers = gateway.Carriers.list(
                context=self.context,
                carrier_name=self.instance.carrier_name,
            ).filter(id__in=list(_ids))

            for carrier in _carriers:
                carrier.settings.rate_sheet = (
                    self.instance if carrier.id in carriers else None
                )
                carrier.settings.save(update_fields=["rate_sheet"])

    def update(self, instance, validated_data, **kwargs):
        """Handle updates of rate sheet data including services and carriers."""
        services_data = validated_data.pop("services", None)
        carriers = (
            validated_data.pop("carriers", None)
            if "carriers" in validated_data
            else None
        )
        remove_missing_services = validated_data.pop("remove_missing_services", False)

        instance = super().update(instance, validated_data)

        if services_data is not None:
            self.update_services(services_data, remove_missing_services)

        if carriers is not None:
            self.update_carriers(carriers)

        return instance
