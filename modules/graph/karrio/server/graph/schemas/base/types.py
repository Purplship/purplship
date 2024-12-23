import typing
import logging
import datetime
import strawberry
import django.db.models as models
import django.db.models.functions as functions
from strawberry.types import Info
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

import karrio.lib as lib
import karrio.server.conf as conf
import karrio.server.user.models as auth
import karrio.server.core.models as core
import karrio.server.graph.utils as utils
import karrio.server.graph.models as graph
import karrio.server.core.filters as filters
import karrio.server.orders.models as orders
import karrio.server.manager.models as manager
import karrio.server.tracing.models as tracing
import karrio.server.providers.models as providers
import karrio.server.orders.filters as order_filters
import karrio.server.user.serializers as user_serializers
import karrio.server.graph.schemas.base.inputs as inputs

User = get_user_model()
logger = logging.getLogger(__name__)


@strawberry.type
class UserType:
    email: str
    full_name: str
    is_staff: bool
    is_active: bool
    date_joined: datetime.datetime
    is_superuser: typing.Optional[bool] = strawberry.UNSET
    last_login: typing.Optional[datetime.datetime] = strawberry.UNSET

    @strawberry.field
    def permissions(self: User, info) -> typing.Optional[typing.List[str]]:
        # Return permissions from token if exists
        if hasattr(getattr(info.context.request, "token", None), "permissions"):
            return info.context.request.token.permissions

        # Return permissions from user
        return info.context.request.user.permissions

    @staticmethod
    @utils.authentication_required
    def resolve(info) -> typing.Optional["UserType"]:
        return User.objects.get(id=info.context.request.user.id)


@strawberry.type
class WorkspaceConfigType:
    object_type: str

    @property
    def config(self: auth.WorkspaceConfig) -> dict:
        try:
            return lib.to_dict(self.config)
        except:
            return self.config

    # general preferences
    # region

    @strawberry.field
    def default_currency(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[utils.CurrencyCodeEnum]:
        return self.config.get("default_currency")

    @strawberry.field
    def default_country_code(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[utils.CountryCodeEnum]:
        return self.config.get("default_country_code")

    @strawberry.field
    def default_weight_unit(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[utils.WeightUnitEnum]:
        return self.config.get("default_weight_unit")

    @strawberry.field
    def default_dimension_unit(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[utils.DimensionUnitEnum]:
        return self.config.get("default_dimension_unit")

    @strawberry.field
    def state_tax_id(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("state_tax_id")

    @strawberry.field
    def federal_tax_id(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("federal_tax_id")

    @strawberry.field
    def default_label_type(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[utils.LabelTypeEnum]:
        return self.config.get("default_label_type")

    # endregion

    # default options preferences
    # region

    @strawberry.field
    def insured_by_default(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[bool]:
        return self.config.get("insured_by_default")

    # endregion

    # customs identifiers
    # region

    @strawberry.field
    def customs_aes(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_aes")

    @strawberry.field
    def customs_eel_pfc(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_eel_pfc")

    @strawberry.field
    def customs_license_number(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_license_number")

    @strawberry.field
    def customs_certificate_number(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_certificate_number")

    @strawberry.field
    def customs_nip_number(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_nip_number")

    @strawberry.field
    def customs_eori_number(self: auth.WorkspaceConfig) -> typing.Optional[str]:
        return self.config.get("customs_eori_number")

    @strawberry.field
    def customs_vat_registration_number(
        self: auth.WorkspaceConfig,
    ) -> typing.Optional[str]:
        return self.config.get("customs_vat_registration_number")

    # endregion

    @staticmethod
    @utils.authentication_required
    def resolve(info) -> typing.Optional["WorkspaceConfigType"]:
        return auth.WorkspaceConfig.access_by(info.context.request).first()


@strawberry.type
class SystemUsageType:
    total_errors: typing.Optional[int] = None
    order_volume: typing.Optional[float] = None
    total_requests: typing.Optional[int] = None
    total_trackers: typing.Optional[int] = None
    total_shipments: typing.Optional[int] = None
    organization_count: typing.Optional[int] = None
    user_count: typing.Optional[int] = None
    total_shipping_spend: typing.Optional[float] = None
    api_errors: typing.Optional[typing.List[utils.UsageStatType]] = None
    api_requests: typing.Optional[typing.List[utils.UsageStatType]] = None
    order_volumes: typing.Optional[typing.List[utils.UsageStatType]] = None
    shipment_count: typing.Optional[typing.List[utils.UsageStatType]] = None
    shipping_spend: typing.Optional[typing.List[utils.UsageStatType]] = None
    tracker_count: typing.Optional[typing.List[utils.UsageStatType]] = None

    @staticmethod
    @utils.authentication_required
    def resolve(
        info,
        filter: typing.Optional[utils.UsageFilter] = strawberry.UNSET,
    ) -> "SystemUsageType":
        _test_mode = info.context.request.test_mode
        _test_filter = dict(test_mode=_test_mode)
        _filter = {
            "date_before": datetime.datetime.now(),
            "date_after": (datetime.datetime.now() - datetime.timedelta(days=30)),
            **(filter if not utils.is_unset(filter) else utils.UsageFilter()).to_dict(),
        }

        api_requests = (
            filters.LogFilter(
                _filter,
                core.APILogIndex.objects.filter(**_test_filter),
            )
            .qs.annotate(date=functions.TruncDay("requested_at"))
            .values("date")
            .annotate(count=models.Count("id"))
            .order_by("-date")
        )
        api_errors = (
            filters.LogFilter(
                {**_filter, "status": "failed"},
                core.APILogIndex.objects.filter(**_test_filter),
            )
            .qs.annotate(date=functions.TruncDay("requested_at"))
            .values("date")
            .annotate(count=models.Count("id"))
            .order_by("-date")
        )
        order_volumes = (
            order_filters.OrderFilters(
                dict(
                    created_before=_filter["date_before"],
                    created_after=_filter["date_after"],
                ),
                orders.Order.objects.filter(**_test_filter).exclude(
                    status__in=["cancelled", "unfulfilled"]
                ),
            )
            .qs.annotate(date=functions.TruncDay("created_at"))
            .values("date")
            .annotate(
                count=models.Sum(
                    models.F("line_items__value_amount")
                    * models.F("line_items__quantity")
                )
            )
            .order_by("-date")
        )
        shipment_count = (
            filters.ShipmentFilters(
                dict(
                    created_before=_filter["date_before"],
                    created_after=_filter["date_after"],
                ),
                manager.Shipment.objects.filter(**_test_filter),
            )
            .qs.annotate(date=functions.TruncDay("created_at"))
            .values("date")
            .annotate(count=models.Count("id"))
            .order_by("-date")
        )
        shipping_spend = (
            filters.ShipmentFilters(
                dict(
                    created_before=_filter["date_before"],
                    created_after=_filter["date_after"],
                ),
                manager.Shipment.objects.filter(**_test_filter).exclude(
                    status__in=["cancelled", "draft"]
                ),
            )
            .qs.annotate(date=functions.TruncDay("created_at"))
            .values("date")
            .annotate(
                count=models.Sum(
                    functions.Cast("selected_rate__total_charge", models.FloatField())
                )
            )
            .order_by("-date")
        )
        tracker_count = (
            filters.TrackerFilters(
                dict(
                    created_before=_filter["date_before"],
                    created_after=_filter["date_after"],
                ),
                manager.Tracking.objects.filter(**_test_filter),
            )
            .qs.annotate(date=functions.TruncDay("created_at"))
            .values("date")
            .annotate(count=models.Count("id"))
            .order_by("-date")
        )

        total_errors = sum([item["count"] for item in api_errors], 0)
        total_requests = sum([item["count"] for item in api_requests], 0)
        total_trackers = sum([item["count"] for item in tracker_count], 0)
        total_shipments = sum([item["count"] for item in shipment_count], 0)
        order_volume = lib.to_money(sum([item["count"] for item in order_volumes], 0.0))
        total_shipping_spend = lib.to_money(
            sum([item["count"] for item in shipping_spend], 0.0)
        )
        user_count = User.objects.count()
        organization_count = 1

        if conf.settings.MULTI_ORGANIZATIONS:
            import karrio.server.orgs.models as orgs

            organization_count = orgs.Organization.objects.count()

        return SystemUsageType(
            order_volume=order_volume,
            total_errors=total_errors,
            total_requests=total_requests,
            total_trackers=total_trackers,
            total_shipments=total_shipments,
            organization_count=organization_count,
            user_count=user_count,
            total_shipping_spend=total_shipping_spend,
            api_errors=[utils.UsageStatType.parse(item) for item in api_errors],
            api_requests=[utils.UsageStatType.parse(item) for item in api_requests],
            order_volumes=[utils.UsageStatType.parse(item) for item in order_volumes],
            shipment_count=[utils.UsageStatType.parse(item) for item in shipment_count],
            shipping_spend=[utils.UsageStatType.parse(item) for item in shipping_spend],
            tracker_count=[utils.UsageStatType.parse(item) for item in tracker_count],
        )


@strawberry.type
class MetafieldType:
    object_type: str
    id: str
    key: str
    is_required: bool
    type: utils.MetafieldTypeEnum
    value: typing.Optional[str] = None


@strawberry.type
class LogType:
    object_type: str
    id: int
    user: typing.Optional[UserType]
    requested_at: typing.Optional[datetime.datetime]
    response_ms: typing.Optional[int]
    path: typing.Optional[str]
    remote_addr: typing.Optional[str]
    host: typing.Optional[str]
    method: typing.Optional[str]
    status_code: typing.Optional[int]
    test_mode: typing.Optional[bool]

    @strawberry.field
    def data(self: core.APILog) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.data)
        except:
            return self.data

    @strawberry.field
    def response(self: core.APILog) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.response)
        except:
            return self.response

    @strawberry.field
    def query_params(self: core.APILog) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.query_params)
        except:
            return self.query_params

    @strawberry.field
    def records(
        self: tracing.TracingRecord, info: Info
    ) -> typing.List["TracingRecordType"]:
        queryset = tracing.TracingRecord.objects.filter(meta__request_log_id=self.id)

        if User.objects.filter(
            id=info.context.request.user.id, is_staff=False
        ).exists():
            # exclude system carriers records if user is not staff
            system_carriers = [
                item["id"]
                for item in providers.Carrier.system_carriers.all().values("id")
            ]
            queryset = queryset.exclude(meta__carrier_account_id__in=system_carriers)

        return queryset

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: int) -> typing.Optional["LogType"]:
        return core.APILogIndex.access_by(info.context.request).filter(id=id).first()

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.LogFilter] = strawberry.UNSET,
    ) -> utils.Connection["LogType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.LogFilter()
        queryset = filters.LogFilter(
            _filter.to_dict(), core.APILogIndex.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class TracingRecordType:
    object_type: str
    id: typing.Optional[str]
    key: typing.Optional[str]
    timestamp: typing.Optional[float]
    test_mode: typing.Optional[bool]
    created_by: typing.Optional[UserType]
    created_at: typing.Optional[datetime.datetime]
    updated_at: typing.Optional[datetime.datetime]

    @strawberry.field
    def record(self: tracing.TracingRecord) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.record)
        except:
            return self.record

    @strawberry.field
    def meta(self: tracing.TracingRecord) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.meta)
        except:
            return self.meta

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: str) -> typing.Optional["TracingRecordType"]:
        return (
            tracing.TracingRecord.access_by(info.context.request).filter(id=id).first()
        )

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.TracingRecordFilter] = strawberry.UNSET,
    ) -> utils.Connection["TracingRecordType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.TracingRecordFilter()
        queryset = filters.TracingRecordFilter(
            _filter.to_dict(), tracing.TracingRecord.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class TokenType:
    object_type: str
    key: str
    label: str
    test_mode: bool
    created: datetime.datetime

    @strawberry.field
    def permissions(self: auth.Token, info) -> typing.Optional[typing.List[str]]:
        return self.permissions

    @staticmethod
    @utils.authentication_required
    def resolve(info, org_id: typing.Optional[str] = strawberry.UNSET) -> "TokenType":
        return user_serializers.TokenSerializer.retrieve_token(
            info.context.request,
            **({"org_id": org_id} if org_id is not strawberry.UNSET else {}),
        )


@strawberry.type
class APIKeyType:
    object_type: str
    key: str
    label: str
    test_mode: bool
    created: datetime.datetime

    @strawberry.field
    def permissions(self: auth.Token, info) -> typing.Optional[typing.List[str]]:
        return self.permissions

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
    ) -> typing.List["APIKeyType"]:
        _filters = {
            "user__id": info.context.request.user.id,
            "test_mode": info.context.request.test_mode,
            **(
                {"org__id": info.context.request.org.id}
                if getattr(info.context.request, "org", None) is not None
                else {}
            ),
        }
        keys = auth.Token.objects.filter(**_filters)

        if keys.exists():
            return keys

        user_serializers.TokenSerializer.map(
            data={}, context=info.context.request
        ).save()

        return auth.Token.objects.filter(**_filters)


@strawberry.type
class MessageType:
    carrier_name: typing.Optional[str]
    carrier_id: typing.Optional[str]
    message: typing.Optional[str]
    code: typing.Optional[str]
    details: typing.Optional[utils.JSON] = None

    @staticmethod
    def parse(charge: dict):
        return MessageType(
            **{k: v for k, v in charge.items() if k in MessageType.__annotations__}
        )


@strawberry.type
class ChargeType:
    name: typing.Optional[str] = None
    amount: typing.Optional[float] = None
    currency: utils.CurrencyCodeEnum = None

    @staticmethod
    def parse(charge: dict):
        return ChargeType(
            **{k: v for k, v in charge.items() if k in ChargeType.__annotations__}
        )


@strawberry.type
class RateType:
    id: str
    object_type: str
    carrier_name: str
    carrier_id: str
    service: str
    test_mode: bool
    total_charge: float
    currency: utils.CurrencyCodeEnum
    extra_charges: typing.List[ChargeType]
    meta: typing.Optional[utils.JSON] = None
    transit_days: typing.Optional[int] = None

    @staticmethod
    def parse(rate: dict):
        return RateType(
            **{
                "object_type": "rate",
                **{k: v for k, v in rate.items() if k in RateType.__annotations__},
                "extra_charges": [
                    ChargeType.parse(charge)
                    for charge in (rate.get("extra_charges") or [])
                ],
            }
        )


@strawberry.type
class CommodityType:
    id: str
    object_type: str
    weight: float
    quantity: int
    metadata: utils.JSON
    sku: typing.Optional[str]
    title: typing.Optional[str]
    hs_code: typing.Optional[str]
    description: typing.Optional[str]
    value_amount: typing.Optional[float]
    weight_unit: typing.Optional[utils.WeightUnitEnum]
    origin_country: typing.Optional[utils.CountryCodeEnum]
    value_currency: typing.Optional[utils.CurrencyCodeEnum]
    created_at: typing.Optional[datetime.datetime]
    updated_at: typing.Optional[datetime.datetime]
    created_by: typing.Optional[UserType]
    parent_id: typing.Optional[str] = None
    parent: typing.Optional["CommodityType"] = None
    unfulfilled_quantity: typing.Optional[int] = None


@strawberry.type
class AddressType:
    id: str
    object_type: str
    postal_code: typing.Optional[str]
    city: typing.Optional[str]
    federal_tax_id: typing.Optional[str]
    state_tax_id: typing.Optional[str]
    person_name: typing.Optional[str]
    company_name: typing.Optional[str]
    country_code: utils.CountryCodeEnum
    email: typing.Optional[str]
    phone_number: typing.Optional[str]
    state_code: typing.Optional[str]
    suburb: typing.Optional[str]
    residential: typing.Optional[bool]
    street_number: typing.Optional[str]
    address_line1: typing.Optional[str]
    address_line2: typing.Optional[str]
    created_at: typing.Optional[datetime.datetime]
    updated_at: typing.Optional[datetime.datetime]
    created_by: typing.Optional[UserType]
    validate_location: typing.Optional[bool]
    validation: typing.Optional[utils.JSON] = None


@strawberry.type
class ParcelType:
    id: str
    object_type: str
    weight: typing.Optional[float]
    width: typing.Optional[float]
    height: typing.Optional[float]
    length: typing.Optional[float]
    packaging_type: typing.Optional[str]
    package_preset: typing.Optional[str]
    description: typing.Optional[str]
    content: typing.Optional[str]
    is_document: typing.Optional[bool]
    weight_unit: typing.Optional[utils.WeightUnitEnum]
    dimension_unit: typing.Optional[utils.DimensionUnitEnum]
    freight_class: typing.Optional[str]
    reference_number: typing.Optional[str]
    created_at: datetime.datetime
    updated_at: datetime.datetime
    created_by: UserType

    @strawberry.field
    def items(self: manager.Parcel) -> typing.List[CommodityType]:
        return self.items.all()


@strawberry.type
class DutyType:
    paid_by: typing.Optional[utils.PaidByEnum] = None
    currency: typing.Optional[utils.CurrencyCodeEnum] = None
    account_number: typing.Optional[str] = None
    declared_value: typing.Optional[float] = None
    bill_to: typing.Optional[AddressType] = None


@strawberry.type
class CustomsType:
    id: str
    object_type: str
    certify: typing.Optional[bool] = strawberry.UNSET
    commercial_invoice: typing.Optional[bool] = strawberry.UNSET
    content_type: typing.Optional[utils.CustomsContentTypeEnum] = strawberry.UNSET
    content_description: typing.Optional[str] = strawberry.UNSET
    incoterm: typing.Optional[utils.IncotermCodeEnum] = strawberry.UNSET
    invoice: typing.Optional[str] = strawberry.UNSET
    invoice_date: typing.Optional[str] = strawberry.UNSET
    signer: typing.Optional[str] = strawberry.UNSET
    created_at: typing.Optional[datetime.datetime] = strawberry.UNSET
    updated_at: typing.Optional[datetime.datetime] = strawberry.UNSET
    created_by: typing.Optional[UserType] = strawberry.UNSET
    options: typing.Optional[utils.JSON] = strawberry.UNSET
    duty_billing_address: typing.Optional[AddressType] = strawberry.UNSET

    @strawberry.field
    def duty(self: manager) -> typing.Optional[DutyType]:
        if self.duty is None:
            return None

        return DutyType(**self.duty)

    @strawberry.field
    def commodities(self: manager.Customs) -> typing.List[CommodityType]:
        return self.commodities.all()


@strawberry.type
class AddressTemplateType:
    id: str
    object_type: str
    label: str
    address: AddressType
    is_default: typing.Optional[bool] = None

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.AddressFilter] = strawberry.UNSET,
    ) -> utils.Connection["AddressTemplateType"]:
        _filter = inputs.AddressFilter() if utils.is_unset(filter) else filter
        _search = _filter.to_dict()
        _query = models.Q()

        if any(_search.get("label") or ""):
            _value = _search.get("label")
            _query = _query | models.Q(label__icontains=_value)

        if any(_search.get("address") or ""):
            _value = _search.get("address")
            _query = (
                _query
                | models.Q(address__address_line1__icontains=_value)
                | models.Q(address__address_line2__icontains=_value)
                | models.Q(address__postal_code__icontains=_value)
                | models.Q(address__person_name__icontains=_value)
                | models.Q(address__company_name__icontains=_value)
                | models.Q(address__country_code__icontains=_value)
                | models.Q(address__city__icontains=_value)
                | models.Q(address__email__icontains=_value)
                | models.Q(address__phone_number__icontains=_value)
            )

        if any(_search.get("keyword") or ""):
            _value = _search.get("keyword")
            _query = (
                _query
                | models.Q(label__icontains=_value)
                | models.Q(address__address_line1__icontains=_value)
                | models.Q(address__address_line2__icontains=_value)
                | models.Q(address__postal_code__icontains=_value)
                | models.Q(address__person_name__icontains=_value)
                | models.Q(address__company_name__icontains=_value)
                | models.Q(address__country_code__icontains=_value)
                | models.Q(address__city__icontains=_value)
                | models.Q(address__email__icontains=_value)
                | models.Q(address__phone_number__icontains=_value)
            )

        _queryset = graph.Template.access_by(info.context.request).filter(
            _query, address__isnull=False
        )

        return utils.paginated_connection(_queryset, **_filter.pagination())


@strawberry.type
class ParcelTemplateType:
    id: str
    object_type: str
    label: str
    parcel: ParcelType
    is_default: typing.Optional[bool]

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.TemplateFilter] = strawberry.UNSET,
    ) -> utils.Connection["ParcelTemplateType"]:
        _filter = inputs.TemplateFilter() if filter == strawberry.UNSET else filter
        _search = _filter.to_dict()
        _query = models.Q()

        if any(_search.get("label") or ""):
            _value = _search.get("label")
            _query = _query | models.Q(label__icontains=_value)

        if any(_search.get("keyword") or ""):
            _value = _search.get("keyword")
            _query = _query | models.Q(label__icontains=_value)

        queryset = graph.Template.access_by(info.context.request).filter(
            _query,
            parcel__isnull=False,
        )

        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class CustomsTemplateType:
    id: str
    object_type: str
    label: str
    customs: CustomsType
    is_default: typing.Optional[bool]

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.TemplateFilter] = strawberry.UNSET,
    ) -> utils.Connection["CustomsTemplateType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.TemplateFilter()

        queryset = graph.Template.access_by(info.context.request).filter(
            customs__isnull=False,
            **(
                {"label__icontain": _filter.label}
                if _filter.label is not strawberry.UNSET
                else {}
            ),
        )
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class DefaultTemplatesType:
    default_address: typing.Optional[AddressTemplateType] = None
    default_customs: typing.Optional[CustomsTemplateType] = None
    default_parcel: typing.Optional[ParcelTemplateType] = None

    @staticmethod
    @utils.authentication_required
    def resolve(info) -> "DefaultTemplatesType":
        templates = graph.Template.access_by(info.context.request).filter(
            is_default=True
        )

        return DefaultTemplatesType(  # type: ignore
            default_address=templates.filter(address__isnull=False).first(),
            default_customs=templates.filter(customs__isnull=False).first(),
            default_parcel=templates.filter(parcel__isnull=False).first(),
        )


@strawberry.type
class TrackingEventType:
    description: typing.Optional[str] = None
    location: typing.Optional[str] = None
    code: typing.Optional[str] = None
    date: typing.Optional[str] = None
    time: typing.Optional[str] = None
    latitude: typing.Optional[float] = None
    longitude: typing.Optional[float] = None

    @staticmethod
    def parse(charge: dict):
        return TrackingEventType(
            **{
                k: v
                for k, v in charge.items()
                if k in TrackingEventType.__annotations__
            }
        )


@strawberry.type
class TrackingInfoType:
    carrier_tracking_link: typing.Optional[str] = None
    customer_name: typing.Optional[str] = None
    expected_delivery: typing.Optional[str] = None
    note: typing.Optional[str] = None
    order_date: typing.Optional[str] = None
    order_id: typing.Optional[str] = None
    package_weight: typing.Optional[str] = None
    package_weight_unit: typing.Optional[str] = None
    shipment_package_count: typing.Optional[str] = None
    shipment_pickup_date: typing.Optional[str] = None
    shipment_delivery_date: typing.Optional[str] = None
    shipment_service: typing.Optional[str] = None
    shipment_origin_country: typing.Optional[str] = None
    shipment_origin_postal_code: typing.Optional[str] = None
    shipment_destination_country: typing.Optional[str] = None
    shipment_destination_postal_code: typing.Optional[str] = None
    shipping_date: typing.Optional[str] = None
    signed_by: typing.Optional[str] = None
    source: typing.Optional[str] = None

    @staticmethod
    def parse(charge: dict):
        return TrackingInfoType(
            **{k: v for k, v in charge.items() if k in TrackingInfoType.__annotations__}
        )


@strawberry.type
class TrackerType:
    id: str
    object_type: str
    tracking_number: str
    test_mode: bool
    metadata: utils.JSON
    status: utils.TrackerStatusEnum
    delivered: typing.Optional[bool]
    estimated_delivery: typing.Optional[datetime.date]
    document_image_url: typing.Optional[str]
    signature_image_url: typing.Optional[str]
    options: typing.Optional[utils.JSON]
    meta: typing.Optional[utils.JSON]
    shipment: typing.Optional["ShipmentType"]
    created_at: datetime.datetime
    updated_at: datetime.datetime
    created_by: UserType

    @strawberry.field
    def carrier_id(self: manager.Tracking) -> str:
        return getattr(self.tracking_carrier, "carrier_id", None)

    @strawberry.field
    def carrier_name(self: manager.Tracking) -> str:
        return getattr(self.tracking_carrier, "carrier_name", None)

    @strawberry.field
    def info(self: manager.Tracking) -> typing.Optional[TrackingInfoType]:
        return TrackingInfoType.parse(self.info) if self.info else None

    @strawberry.field
    def events(self: manager.Tracking) -> typing.List[TrackingEventType]:
        return [TrackingEventType.parse(msg) for msg in self.events or []]

    @strawberry.field
    def messages(self: manager.Tracking) -> typing.List[MessageType]:
        return [MessageType.parse(msg) for msg in self.messages or []]

    @strawberry.field
    def tracking_carrier(
        self: manager.Tracking,
    ) -> typing.Optional["CarrierConnectionType"]:
        return self.tracking_carrier

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: str) -> typing.Optional["TrackerType"]:
        return manager.Tracking.access_by(info.context.request).filter(id=id).first()

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.TrackerFilter] = strawberry.UNSET,
    ) -> utils.Connection["TrackerType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.TrackerFilter()
        queryset = filters.TrackerFilters(
            _filter.to_dict(), manager.Tracking.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class ManifestType:
    id: str
    object_type: str
    test_mode: bool
    metadata: utils.JSON
    meta: utils.JSON
    options: utils.JSON
    address: AddressType
    shipment_identifiers: typing.List[str]
    manifest_url: typing.Optional[str]
    reference: typing.Optional[str]
    created_at: datetime.datetime
    updated_at: datetime.datetime

    @strawberry.field
    def carrier_id(self: manager.Manifest) -> str:
        return getattr(self.manifest_carrier, "carrier_id", None)

    @strawberry.field
    def carrier_name(self: manager.Manifest) -> str:
        return getattr(self.manifest_carrier, "carrier_name", None)

    @strawberry.field
    def messages(self: manager.Manifest) -> typing.List[MessageType]:
        return [MessageType.parse(msg) for msg in self.messages or []]

    @strawberry.field
    def manifest_carrier(
        self: manager.Manifest,
    ) -> typing.Optional["CarrierConnectionType"]:
        return self.manifest_carrier

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: str) -> typing.Optional["ManifestType"]:
        return manager.Manifest.access_by(info.context.request).filter(id=id).first()

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.ManifestFilter] = strawberry.UNSET,
    ) -> utils.Connection["ManifestType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.ManifestFilter()
        queryset = filters.ManifestFilters(
            _filter.to_dict(), manager.Manifest.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class PaymentType:
    account_number: typing.Optional[str] = None
    paid_by: typing.Optional[utils.PaidByEnum] = None
    currency: typing.Optional[utils.CurrencyCodeEnum] = None


@strawberry.type
class ShipmentType:
    id: str
    object_type: str
    test_mode: bool
    shipper: AddressType
    recipient: AddressType
    options: utils.JSON
    metadata: utils.JSON
    status: utils.ShipmentStatusEnum
    return_address: typing.Optional[AddressType]
    billing_address: typing.Optional[AddressType]
    meta: typing.Optional[utils.JSON]
    label_type: typing.Optional[utils.LabelTypeEnum]
    tracking_number: typing.Optional[str]
    shipment_identifier: typing.Optional[str]
    tracking_url: typing.Optional[str]
    reference: typing.Optional[str]
    customs: typing.Optional[CustomsType]
    services: typing.Optional[typing.List[str]]
    service: typing.Optional[str]
    carrier_ids: typing.List[str]
    selected_rate_id: typing.Optional[str]
    tracker_id: typing.Optional[str]
    label_url: typing.Optional[str]
    invoice_url: typing.Optional[str]
    tracker: typing.Optional[TrackerType]
    created_at: datetime.datetime
    updated_at: datetime.datetime
    created_by: UserType

    @strawberry.field
    def carrier_id(self: manager.Shipment) -> typing.Optional[str]:
        return getattr(self.selected_rate_carrier, "carrier_id", None)

    @strawberry.field
    def carrier_name(self: manager.Shipment) -> typing.Optional[str]:
        return getattr(self.selected_rate_carrier, "carrier_name", None)

    @strawberry.field
    def parcels(self: manager.Shipment) -> typing.List[ParcelType]:
        return self.parcels.all()

    @strawberry.field
    def rates(self: manager.Shipment) -> typing.List[RateType]:
        return [RateType.parse(rate) for rate in self.rates or []]

    @strawberry.field
    def selected_rate(self: manager.Shipment) -> typing.Optional[RateType]:
        return RateType.parse(self.selected_rate) if self.selected_rate else None

    @strawberry.field
    def selected_rate_carrier(
        self: manager.Shipment,
    ) -> typing.Optional["CarrierConnectionType"]:
        return self.selected_rate_carrier

    @strawberry.field
    def payment(self: manager.Shipment) -> typing.Optional[PaymentType]:
        return PaymentType(**self.payment) if self.payment else None

    @strawberry.field
    def messages(self: manager.Shipment) -> typing.List[MessageType]:
        return [MessageType.parse(msg) for msg in self.messages or []]

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: str) -> typing.Optional["ShipmentType"]:
        return manager.Shipment.access_by(info.context.request).filter(id=id).first()

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.ShipmentFilter] = strawberry.UNSET,
    ) -> utils.Connection["ShipmentType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.ShipmentFilter()
        queryset = filters.ShipmentFilters(
            _filter.to_dict(), manager.Shipment.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class ServiceZoneType:
    object_type: str
    label: typing.Optional[str] = None
    rate: typing.Optional[float] = None

    min_weight: typing.Optional[float] = None
    max_weight: typing.Optional[float] = None

    transit_days: typing.Optional[int] = None
    transit_time: typing.Optional[float] = None

    radius: typing.Optional[float] = None
    latitude: typing.Optional[float] = None
    longitude: typing.Optional[float] = None

    cities: typing.Optional[typing.List[str]] = None
    postal_codes: typing.Optional[typing.List[str]] = None
    country_codes: typing.Optional[typing.List[utils.CountryCodeEnum]] = None

    @staticmethod
    def parse(zone: dict):
        return ServiceZoneType(
            **{
                "object_type": "zone",
                **{
                    k: v
                    for k, v in zone.items()
                    if k in ServiceZoneType.__annotations__
                },
            }
        )


@strawberry.type
class ServiceLevelType:
    id: str
    object_type: str
    service_name: typing.Optional[str]
    service_code: typing.Optional[str]
    carrier_service_code: typing.Optional[str]
    description: typing.Optional[str]
    active: typing.Optional[bool]

    currency: typing.Optional[utils.CurrencyCodeEnum]
    transit_days: typing.Optional[int]
    transit_time: typing.Optional[float]

    max_width: typing.Optional[float]
    max_height: typing.Optional[float]
    max_length: typing.Optional[float]
    dimension_unit: typing.Optional[utils.DimensionUnitEnum]

    max_weight: typing.Optional[float]
    weight_unit: typing.Optional[utils.WeightUnitEnum]

    domicile: typing.Optional[bool]
    international: typing.Optional[bool]

    @strawberry.field
    def zones(self: providers.ServiceLevel) -> typing.List[ServiceZoneType]:
        return [ServiceZoneType.parse(zone) for zone in self.zones or []]

    @strawberry.field
    def metadata(self: providers.RateSheet) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.metadata)
        except:
            return self.metadata


@strawberry.type
class LabelTemplateType:
    id: str
    object_type: str
    slug: typing.Optional[str]
    template: typing.Optional[str]
    width: typing.Optional[int]
    height: typing.Optional[int]
    shipment_sample: typing.Optional[utils.JSON]
    template_type: typing.Optional[utils.LabelTemplateTypeEnum]


@strawberry.type
class RateSheetType:
    object_type: str
    id: str
    name: str
    slug: str
    carrier_name: utils.CarrierNameEnum

    @strawberry.field
    def metadata(self: providers.RateSheet) -> typing.Optional[utils.JSON]:
        try:
            return lib.to_dict(self.metadata)
        except:
            return self.metadata

    @strawberry.field
    def carriers(self: providers.RateSheet) -> typing.List["CarrierConnectionType"]:
        return self.carriers

    @strawberry.field
    def services(self: providers.RateSheet) -> typing.List[ServiceLevelType]:
        return self.services.all()

    @staticmethod
    @utils.authentication_required
    def resolve(info, id: str) -> typing.Optional["RateSheetType"]:
        return providers.RateSheet.access_by(info.context.request).filter(id=id).first()

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.RateSheetFilter] = strawberry.UNSET,
    ) -> utils.Connection["RateSheetType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.RateSheetFilter()
        queryset = filters.RateSheetFilter(
            _filter.to_dict(), providers.RateSheet.access_by(info.context.request)
        ).qs
        return utils.paginated_connection(queryset, **_filter.pagination())


@strawberry.type
class SystemConnectionType:
    id: str
    active: bool
    carrier_id: str
    display_name: str
    test_mode: bool
    capabilities: typing.List[str]
    created_at: typing.Optional[datetime.datetime]
    updated_at: typing.Optional[datetime.datetime]

    @strawberry.field
    def carrier_name(self: providers.Carrier) -> str:
        return getattr(self, "settings", self).carrier_name

    @strawberry.field
    def enabled(self: providers.Carrier, info: Info) -> bool:
        if hasattr(self, "active_orgs"):
            return self.active_orgs.filter(id=info.context.request.org.id).exists()

        return self.active_users.filter(id=info.context.request.user.id).exists()

    @strawberry.field
    def config(self: providers.Carrier, info: Info) -> typing.Optional[utils.JSON]:
        return getattr(self, "config", None)

    @staticmethod
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.CarrierFilter] = strawberry.UNSET,
    ) -> typing.List["SystemConnectionType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.CarrierFilter()
        connections = filters.CarrierFilters(
            _filter.to_dict(),
            providers.Carrier.system_carriers.filter(
                active=True,
                test_mode=getattr(info.context.request, "test_mode", False),
            ),
        ).qs
        return connections


@strawberry.type
class CarrierConnectionType:
    id: str
    carrier_id: str
    carrier_name: str
    display_name: str
    active: bool
    is_system: bool
    test_mode: bool
    credentials: utils.JSON
    capabilities: typing.List[str]
    rate_sheet: typing.Optional[RateSheetType] = None

    @strawberry.field
    def metadata(self: providers.Carrier, info: Info) -> typing.Optional[utils.JSON]:
        return getattr(self, "metadata", None)

    @strawberry.field
    def config(self: providers.Carrier, info: Info) -> typing.Optional[utils.JSON]:
        return getattr(self, "config", None)

    def rate_sheet(
        self: providers.Carrier, info: Info
    ) -> typing.Optional[RateSheetType]:
        return getattr(self, "rate_sheet", None)

    @staticmethod
    @utils.utils.error_wrapper
    @utils.authentication_required
    def resolve_list_legacy(
        info,
        filter: typing.Optional[inputs.CarrierFilter] = strawberry.UNSET,
    ) -> typing.List["CarrierConnectionType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.CarrierFilter()
        connections = filters.CarrierFilters(
            _filter.to_dict(),
            providers.Carrier.access_by(info.context.request).filter(is_system=False),
        ).qs
        return connections

    @staticmethod
    @utils.utils.error_wrapper
    @utils.authentication_required
    def resolve(
        info,
        id: str,
    ) -> typing.Optional["CarrierConnectionType"]:
        connection = (
            providers.Carrier.access_by(info.context.request).filter(id=id).first()
        )
        return connection

    @staticmethod
    @utils.utils.error_wrapper
    @utils.authentication_required
    def resolve_list(
        info,
        filter: typing.Optional[inputs.CarrierFilter] = strawberry.UNSET,
    ) -> utils.Connection["CarrierConnectionType"]:
        _filter = filter if not utils.is_unset(filter) else inputs.CarrierFilter()
        queryset = filters.CarrierFilters(
            _filter.to_dict(),
            providers.Carrier.access_by(info.context.request).filter(is_system=False),
        ).qs
        connections = utils.paginated_connection(queryset, **_filter.pagination())

        return utils.Connection(
            page_info=connections.page_info,
            edges=[
                utils.Edge(
                    node=edge.node,
                    cursor=edge.cursor,
                )
                for edge in connections.edges
            ],
        )
