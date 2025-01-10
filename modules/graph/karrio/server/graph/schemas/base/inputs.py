import pydoc
import typing
import datetime
import strawberry

import karrio.server.providers.models as providers
import karrio.server.serializers as serializers
import karrio.server.graph.utils as utils


@strawberry.input
class LogFilter(utils.Paginated):
    api_endpoint: typing.Optional[str] = strawberry.UNSET
    remote_addr: typing.Optional[str] = strawberry.UNSET
    date_after: typing.Optional[datetime.datetime] = strawberry.UNSET
    date_before: typing.Optional[datetime.datetime] = strawberry.UNSET
    entity_id: typing.Optional[str] = strawberry.UNSET
    method: typing.Optional[typing.List[str]] = strawberry.UNSET
    status: typing.Optional[str] = strawberry.UNSET
    status_code: typing.Optional[typing.List[int]] = strawberry.UNSET


@strawberry.input
class TracingRecordFilter(utils.Paginated):
    key: typing.Optional[str] = strawberry.UNSET
    request_log_id: typing.Optional[int] = strawberry.UNSET
    date_after: typing.Optional[datetime.datetime] = strawberry.UNSET
    date_before: typing.Optional[datetime.datetime] = strawberry.UNSET


@strawberry.input
class TrackerFilter(utils.Paginated):
    tracking_number: typing.Optional[str] = strawberry.UNSET
    created_after: typing.Optional[datetime.datetime] = strawberry.UNSET
    created_before: typing.Optional[datetime.datetime] = strawberry.UNSET
    carrier_name: typing.Optional[typing.List[str]] = strawberry.UNSET
    status: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class ShipmentFilter(utils.Paginated):
    keyword: typing.Optional[str] = strawberry.UNSET
    address: typing.Optional[str] = strawberry.UNSET
    id: typing.Optional[typing.List[str]] = strawberry.UNSET
    created_after: typing.Optional[datetime.datetime] = strawberry.UNSET
    created_before: typing.Optional[datetime.datetime] = strawberry.UNSET
    carrier_name: typing.Optional[typing.List[str]] = strawberry.UNSET
    reference: typing.Optional[str] = strawberry.UNSET
    service: typing.Optional[typing.List[str]] = strawberry.UNSET
    status: typing.Optional[typing.List[utils.ShipmentStatusEnum]] = strawberry.UNSET
    option_key: typing.Optional[str] = strawberry.UNSET
    option_value: typing.Optional[utils.JSON] = strawberry.UNSET
    metadata_key: typing.Optional[str] = strawberry.UNSET
    metadata_value: typing.Optional[utils.JSON] = strawberry.UNSET
    meta_key: typing.Optional[str] = strawberry.UNSET
    meta_value: typing.Optional[utils.JSON] = strawberry.UNSET
    has_tracker: typing.Optional[bool] = strawberry.UNSET
    has_manifest: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class ManifestFilter(utils.Paginated):
    id: typing.Optional[typing.List[str]] = strawberry.UNSET
    created_after: typing.Optional[datetime.datetime] = strawberry.UNSET
    created_before: typing.Optional[datetime.datetime] = strawberry.UNSET
    carrier_name: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class TemplateFilter(utils.Paginated):
    label: typing.Optional[str] = strawberry.UNSET
    keyword: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class AddressFilter(TemplateFilter):
    address: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class CarrierFilter(utils.BaseInput):
    active: typing.Optional[bool] = strawberry.UNSET
    metadata_key: typing.Optional[str] = strawberry.UNSET
    metadata_value: typing.Optional[str] = strawberry.UNSET
    carrier_name: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class UpdateUserInput(utils.BaseInput):
    full_name: typing.Optional[str] = strawberry.UNSET
    is_active: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class WorkspaceConfigMutationInput(utils.BaseInput):
    default_currency: typing.Optional[utils.CurrencyCodeEnum] = strawberry.UNSET
    default_country_code: typing.Optional[utils.CountryCodeEnum] = strawberry.UNSET
    default_label_type: typing.Optional[utils.LabelTypeEnum] = strawberry.UNSET

    default_weight_unit: typing.Optional[utils.WeightUnitEnum] = strawberry.UNSET
    default_dimension_unit: typing.Optional[utils.DimensionUnitEnum] = strawberry.UNSET

    state_tax_id: typing.Optional[str] = strawberry.UNSET
    federal_tax_id: typing.Optional[str] = strawberry.UNSET

    customs_aes: typing.Optional[str] = strawberry.UNSET
    customs_eel_pfc: typing.Optional[str] = strawberry.UNSET
    customs_eori_number: typing.Optional[str] = strawberry.UNSET
    customs_license_number: typing.Optional[str] = strawberry.UNSET
    customs_certificate_number: typing.Optional[str] = strawberry.UNSET
    customs_nip_number: typing.Optional[str] = strawberry.UNSET
    customs_vat_registration_number: typing.Optional[str] = strawberry.UNSET

    insured_by_default: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class TokenMutationInput(utils.BaseInput):
    key: str
    password: typing.Optional[str] = strawberry.UNSET
    refresh: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class CreateAPIKeyMutationInput(utils.BaseInput):
    password: str
    label: str
    permissions: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class DeleteAPIKeyMutationInput(utils.BaseInput):
    password: str
    key: str


@strawberry.input
class RequestEmailChangeMutationInput(utils.BaseInput):
    email: str
    password: str
    redirect_url: str


@strawberry.input
class ConfirmEmailChangeMutationInput(utils.BaseInput):
    token: str


@strawberry.input
class RegisterUserMutationInput(utils.BaseInput):
    email: str
    password1: str
    password2: str
    redirect_url: str
    full_name: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class ConfirmEmailMutationInput(utils.BaseInput):
    token: str


@strawberry.input
class ChangePasswordMutationInput(utils.BaseInput):
    old_password: str
    new_password1: str
    new_password2: str


@strawberry.input
class RequestPasswordResetMutationInput(utils.BaseInput):
    email: str
    redirect_url: str


@strawberry.input
class ConfirmPasswordResetMutationInput(utils.BaseInput):
    uid: str
    token: str
    new_password1: str
    new_password2: str


@strawberry.input
class EnableMultiFactorMutationInput(utils.BaseInput):
    password: str


@strawberry.input
class ConfirmMultiFactorMutationInput(utils.BaseInput):
    token: str


@strawberry.input
class DisableMultiFactorMutationInput(utils.BaseInput):
    password: str


@strawberry.input
class MetadataMutationInput(utils.BaseInput):
    id: str
    object_type: utils.MetadataObjectTypeEnum
    added_values: utils.JSON
    discarded_keys: typing.Optional[typing.List[str]]


@strawberry.input
class CommodityInput:
    weight: float
    weight_unit: utils.WeightUnitEnum
    quantity: typing.Optional[int] = 1
    sku: typing.Optional[str] = strawberry.UNSET
    title: typing.Optional[str] = strawberry.UNSET
    hs_code: typing.Optional[str] = strawberry.UNSET
    description: typing.Optional[str] = strawberry.UNSET
    value_amount: typing.Optional[float] = strawberry.UNSET
    origin_country: typing.Optional[utils.CountryCodeEnum] = strawberry.UNSET
    value_currency: typing.Optional[utils.CurrencyCodeEnum] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET
    parent_id: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class UpdateCommodityInput(CommodityInput):
    id: typing.Optional[str] = strawberry.UNSET
    quantity: typing.Optional[int] = strawberry.UNSET
    weight: typing.Optional[float] = strawberry.UNSET
    weight_unit: typing.Optional[utils.WeightUnitEnum] = strawberry.UNSET


@strawberry.input
class AddressInput:
    country_code: typing.Optional[utils.CountryCodeEnum]
    postal_code: typing.Optional[str] = strawberry.UNSET
    city: typing.Optional[str] = strawberry.UNSET
    federal_tax_id: typing.Optional[str] = strawberry.UNSET
    state_tax_id: typing.Optional[str] = strawberry.UNSET
    person_name: typing.Optional[str] = strawberry.UNSET
    company_name: typing.Optional[str] = strawberry.UNSET
    email: typing.Optional[str] = strawberry.UNSET
    phone_number: typing.Optional[str] = strawberry.UNSET
    state_code: typing.Optional[str] = strawberry.UNSET
    suburb: typing.Optional[str] = strawberry.UNSET
    residential: typing.Optional[bool] = strawberry.UNSET
    street_number: typing.Optional[str] = strawberry.UNSET
    address_line1: typing.Optional[str] = strawberry.UNSET
    address_line2: typing.Optional[str] = strawberry.UNSET
    validate_location: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class UpdateAddressInput(AddressInput):
    id: typing.Optional[str] = strawberry.UNSET
    country_code: typing.Optional[utils.CountryCodeEnum] = strawberry.UNSET


@strawberry.input
class ParcelInput:
    weight: float
    weight_unit: utils.WeightUnitEnum
    width: typing.Optional[float] = strawberry.UNSET
    height: typing.Optional[float] = strawberry.UNSET
    length: typing.Optional[float] = strawberry.UNSET
    packaging_type: typing.Optional[str] = strawberry.UNSET
    package_preset: typing.Optional[str] = strawberry.UNSET
    description: typing.Optional[str] = strawberry.UNSET
    content: typing.Optional[str] = strawberry.UNSET
    is_document: typing.Optional[bool] = strawberry.UNSET
    dimension_unit: typing.Optional[utils.DimensionUnitEnum] = strawberry.UNSET
    reference_number: typing.Optional[str] = strawberry.UNSET
    freight_class: typing.Optional[str] = strawberry.UNSET
    items: typing.Optional[typing.List[CommodityInput]] = strawberry.UNSET


@strawberry.input
class UpdateParcelInput(ParcelInput):
    id: typing.Optional[str] = strawberry.UNSET
    weight: typing.Optional[float] = strawberry.UNSET
    weight_unit: typing.Optional[utils.WeightUnitEnum] = strawberry.UNSET
    items: typing.Optional[typing.List[UpdateCommodityInput]] = strawberry.UNSET  # type: ignore


@strawberry.input
class DutyInput:
    paid_by: utils.PaidByEnum
    currency: typing.Optional[utils.CurrencyCodeEnum] = strawberry.UNSET
    account_number: typing.Optional[str] = strawberry.UNSET
    declared_value: typing.Optional[float] = strawberry.UNSET
    bill_to: typing.Optional[AddressInput] = strawberry.UNSET


@strawberry.input
class UpdateDutyInput(DutyInput):
    paid_by: typing.Optional[utils.PaidByEnum] = strawberry.UNSET


@strawberry.input
class CustomsInput:
    commodities: typing.List[CommodityInput]
    certify: typing.Optional[bool] = strawberry.UNSET
    commercial_invoice: typing.Optional[bool] = strawberry.UNSET
    content_type: typing.Optional[utils.CustomsContentTypeEnum] = strawberry.UNSET
    content_description: typing.Optional[str] = strawberry.UNSET
    incoterm: typing.Optional[utils.IncotermCodeEnum] = strawberry.UNSET
    invoice: typing.Optional[str] = strawberry.UNSET
    invoice_date: typing.Optional[str] = strawberry.UNSET
    signer: typing.Optional[str] = strawberry.UNSET
    duty: typing.Optional[DutyInput] = strawberry.UNSET
    duty_billing_address: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    options: typing.Optional[utils.JSON] = strawberry.UNSET


@strawberry.input
class UpdateCustomsInput(CustomsInput):
    id: typing.Optional[str] = strawberry.UNSET
    duty: typing.Optional[UpdateDutyInput] = strawberry.UNSET
    duty_billing_address: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    commodities: typing.Optional[typing.List[UpdateCommodityInput]] = strawberry.UNSET  # type: ignore


@strawberry.input
class PaymentInput:
    account_number: typing.Optional[str] = strawberry.UNSET
    paid_by: typing.Optional[utils.PaidByEnum] = strawberry.UNSET
    currency: typing.Optional[utils.CurrencyCodeEnum] = strawberry.UNSET


@strawberry.input
class PartialShipmentMutationInput(utils.BaseInput):
    id: str
    recipient: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    shipper: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    return_address: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    billing_address: typing.Optional[UpdateAddressInput] = strawberry.UNSET
    customs: typing.Optional[UpdateCustomsInput] = strawberry.UNSET
    parcels: typing.Optional[typing.List[UpdateParcelInput]] = strawberry.UNSET
    payment: typing.Optional[PaymentInput] = strawberry.UNSET
    label_type: typing.Optional[utils.LabelTypeEnum] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET
    options: typing.Optional[utils.JSON] = strawberry.UNSET
    reference: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class ChangeShipmentStatusMutationInput(utils.BaseInput):
    id: str
    status: typing.Optional[utils.ManualShipmentStatusEnum]


@strawberry.input
class CreateAddressTemplateInput(utils.BaseInput):
    label: str
    address: AddressInput
    is_default: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class UpdateAddressTemplateInput(CreateAddressTemplateInput):
    id: str  # type: ignore
    label: typing.Optional[str]
    address: typing.Optional[UpdateAddressInput] = strawberry.UNSET


@strawberry.input
class CreateCustomsTemplateInput(utils.BaseInput):
    label: str
    customs: CustomsInput
    is_default: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class UpdateCustomsTemplateInput(CreateCustomsTemplateInput):
    id: str  # type: ignore
    label: typing.Optional[str] = strawberry.UNSET
    is_default: typing.Optional[bool] = strawberry.UNSET
    customs: typing.Optional[UpdateCustomsInput] = strawberry.UNSET  # type: ignore


@strawberry.input
class CreateParcelTemplateInput(utils.BaseInput):
    label: str
    parcel: ParcelInput
    is_default: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class UpdateParcelTemplateInput(CreateParcelTemplateInput):
    id: str  # type: ignore
    label: typing.Optional[str] = strawberry.UNSET
    is_default: typing.Optional[bool] = strawberry.UNSET
    parcel: typing.Optional[UpdateParcelInput] = strawberry.UNSET


@strawberry.input
class DeleteMutationInput(utils.BaseInput):
    id: str


@strawberry.input
class LabelTemplateInput(utils.BaseInput):
    slug: str
    template: str
    template_type: utils.LabelTemplateTypeEnum
    width: typing.Optional[int] = strawberry.UNSET
    height: typing.Optional[int] = strawberry.UNSET
    shipment_sample: typing.Optional[utils.JSON] = strawberry.UNSET
    id: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class ServiceZoneInput(utils.BaseInput):
    rate: float
    label: typing.Optional[str] = strawberry.UNSET

    min_weight: typing.Optional[float] = strawberry.UNSET
    max_weight: typing.Optional[float] = strawberry.UNSET

    transit_days: typing.Optional[int] = strawberry.UNSET
    transit_time: typing.Optional[float] = strawberry.UNSET

    radius: typing.Optional[float] = strawberry.UNSET
    latitude: typing.Optional[float] = strawberry.UNSET
    longitude: typing.Optional[float] = strawberry.UNSET

    cities: typing.Optional[typing.List[str]] = strawberry.UNSET
    postal_codes: typing.Optional[typing.List[str]] = strawberry.UNSET
    country_codes: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class UpdateServiceZoneInput(utils.BaseInput):
    rate: typing.Optional[float] = strawberry.UNSET
    label: typing.Optional[str] = strawberry.UNSET

    min_weight: typing.Optional[float] = strawberry.UNSET
    max_weight: typing.Optional[float] = strawberry.UNSET

    transit_days: typing.Optional[int] = strawberry.UNSET
    transit_time: typing.Optional[float] = strawberry.UNSET

    radius: typing.Optional[float] = strawberry.UNSET
    latitude: typing.Optional[float] = strawberry.UNSET
    longitude: typing.Optional[float] = strawberry.UNSET

    cities: typing.Optional[typing.List[str]] = strawberry.UNSET
    postal_codes: typing.Optional[typing.List[str]] = strawberry.UNSET
    country_codes: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class UpdateServiceZoneMutationInput(utils.BaseInput):
    id: str
    service_id: str
    zone_index: int
    zone: UpdateServiceZoneInput


@strawberry.input
class CreateServiceLevelInput(utils.BaseInput):
    service_name: str
    service_code: str
    currency: utils.CurrencyCodeEnum
    zones: typing.List[ServiceZoneInput]

    carrier_service_code: typing.Optional[str] = strawberry.UNSET
    description: typing.Optional[str] = strawberry.UNSET
    active: typing.Optional[bool] = strawberry.UNSET

    transit_days: typing.Optional[int] = strawberry.UNSET
    transit_time: typing.Optional[float] = strawberry.UNSET

    max_width: typing.Optional[float] = strawberry.UNSET
    max_height: typing.Optional[float] = strawberry.UNSET
    max_length: typing.Optional[float] = strawberry.UNSET
    dimension_unit: typing.Optional[utils.DimensionUnitEnum] = strawberry.UNSET

    min_weight: typing.Optional[float] = strawberry.UNSET
    max_weight: typing.Optional[float] = strawberry.UNSET
    weight_unit: typing.Optional[utils.WeightUnitEnum] = strawberry.UNSET

    domicile: typing.Optional[bool] = strawberry.UNSET
    international: typing.Optional[bool] = strawberry.UNSET

    metadata: typing.Optional[utils.JSON] = strawberry.UNSET


@strawberry.input
class UpdateServiceLevelInput(CreateServiceLevelInput):
    id: typing.Optional[str] = strawberry.UNSET
    service_name: typing.Optional[str] = strawberry.UNSET
    service_code: typing.Optional[str] = strawberry.UNSET
    currency: typing.Optional[utils.CurrencyCodeEnum] = strawberry.UNSET
    zones: typing.Optional[typing.List[UpdateServiceZoneInput]] = strawberry.UNSET


@strawberry.input
class CreateRateSheetMutationInput(utils.BaseInput):
    name: str
    carrier_name: utils.CarrierNameEnum
    services: typing.Optional[typing.List[CreateServiceLevelInput]] = strawberry.UNSET
    carriers: typing.Optional[typing.List[str]] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET


@strawberry.input
class UpdateRateSheetMutationInput(utils.BaseInput):
    id: str
    name: typing.Optional[str] = strawberry.UNSET
    services: typing.Optional[typing.List[UpdateServiceLevelInput]] = strawberry.UNSET
    carriers: typing.Optional[typing.List[str]] = strawberry.UNSET
    remove_missing_services: typing.Optional[bool] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET


@strawberry.input
class RateSheetFilter(utils.Paginated):
    keyword: typing.Optional[str] = strawberry.UNSET


@strawberry.input
class CreateCarrierConnectionMutationInput(utils.BaseInput):
    carrier_name: utils.CarrierNameEnum
    carrier_id: str
    credentials: utils.JSON
    active: typing.Optional[bool] = True
    config: typing.Optional[utils.JSON] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET
    capabilities: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class UpdateCarrierConnectionMutationInput(utils.BaseInput):
    id: str
    active: typing.Optional[bool] = True
    carrier_id: typing.Optional[str] = strawberry.UNSET
    credentials: typing.Optional[utils.JSON] = strawberry.UNSET
    config: typing.Optional[utils.JSON] = strawberry.UNSET
    metadata: typing.Optional[utils.JSON] = strawberry.UNSET
    capabilities: typing.Optional[typing.List[str]] = strawberry.UNSET


@strawberry.input
class SystemCarrierMutationInput(utils.BaseInput):
    id: str
    enable: typing.Optional[bool] = strawberry.UNSET
    config: typing.Optional[utils.JSON] = strawberry.UNSET


@strawberry.input
class CreateMetafieldInput(utils.BaseInput):
    key: str
    type: utils.MetafieldTypeEnum
    value: typing.Optional[str] = strawberry.UNSET
    namespace: typing.Optional[str] = strawberry.UNSET
    is_required: typing.Optional[bool] = strawberry.UNSET


@strawberry.input
class UpdateMetafieldInput(CreateMetafieldInput):
    id: str
    key: typing.Optional[str] = strawberry.UNSET
    type: typing.Optional[utils.MetafieldTypeEnum] = strawberry.UNSET


@strawberry.input
class MetafieldInput(utils.BaseInput):
    key: str
    type: utils.MetafieldTypeEnum
    value: typing.Optional[str] = strawberry.UNSET
    namespace: typing.Optional[str] = strawberry.UNSET
    is_required: typing.Optional[bool] = strawberry.UNSET
    id: typing.Optional[str] = strawberry.UNSET
