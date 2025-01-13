import attr
import typing
import jstruct
import karrio.core.units as units
from karrio.core.models import (
    DocumentDetails,
    Documents,
    Images,
    Parcel,
    Message,
    Address as BaseAddress,
    TrackingRequest as BaseTrackingRequest,
    ShipmentDetails,
    Payment,
    Customs,
    RateRequest as BaseRateRequest,
    ShipmentRequest as BaseShipmentRequest,
    ShipmentCancelRequest,
    ChargeDetails,
    PickupRequest as BasePickupRequest,
    PickupDetails,
    PickupUpdateRequest as BasePickupUpdateRequest,
    PickupCancelRequest as BasePickupCancelRequest,
    ConfirmationDetails as Confirmation,
    TrackingEvent,
    TrackingDetails,
    TrackingInfo,
    DocumentFile,
    DocumentUploadRequest,
    ManifestRequest,
    ManifestDetails,
    ManifestDocument,
)


COUNTRIES = [(c.name, c.name) for c in units.Country]
CURRENCIES = [(c.name, c.name) for c in units.Currency]
WEIGHT_UNITS = [(c.name, c.name) for c in units.WeightUnit]
DIMENSION_UNITS = [(c.name, c.name) for c in units.DimensionUnit]
CAPABILITIES_CHOICES = [(c, c) for c in units.CarrierCapabilities.get_capabilities()]
LABEL_TYPES = [(c.name, c.name) for c in list(units.LabelType)]


class CarrierSettings:
    def __init__(
        self,
        carrier_name: str,
        carrier_id: str,
        test_mode: bool = None,
        active: bool = None,
        id: str = None,
        display_name: str = None,
        **kwargs
    ):
        self.carrier_name = carrier_name
        self.display_name = display_name
        self.carrier_id = carrier_id
        self.active = active
        self.test_mode = test_mode
        self.id = id

        for name, value in kwargs.items():
            if name not in ["carrier_ptr", "created_by", "active_users", "active_orgs"]:
                self.__setattr__(name, value)

    # TODO: rename this to avoid confusion
    def to_dict(self):
        return {
            name: value
            for name, value in self.__dict__.items()
            if name
            not in [
                "carrier_name",
                "created_by",
                "active",
                "capabilities",
                "active_users",
                "active_orgs",
                *([] if self.carrier_name == "generic" else ["display_name"]),
            ]
        }

    @classmethod
    def create(cls, data: dict):
        return cls(**data)


@attr.s(auto_attribs=True)
class AddressValidation:
    success: bool
    meta: dict = {}


@attr.s(auto_attribs=True)
class Address(BaseAddress):
    id: str = None
    postal_code: str = None
    city: str = None
    person_name: str = None
    company_name: str = None
    country_code: str = None
    email: str = None
    phone_number: str = None

    state_code: str = None
    residential: bool = False

    address_line1: str = ""
    address_line2: str = ""

    federal_tax_id: str = None
    state_tax_id: str = None

    validate_location: bool = None
    validation: jstruct.JStruct[AddressValidation] = None


@attr.s(auto_attribs=True)
class PickupRequest(BasePickupRequest):
    pickup_date: str
    ready_time: str
    closing_time: str
    address: Address = jstruct.JStruct[Address, jstruct.REQUIRED]

    parcels: typing.List[Parcel] = jstruct.JList[Parcel]
    shipment_identifiers: typing.List[str] = []
    package_location: str = None
    metadata: typing.Dict = {}
    options: typing.Dict = {}
    instruction: str = None


@attr.s(auto_attribs=True)
class PickupUpdateRequest(BasePickupUpdateRequest):
    confirmation_number: str
    pickup_date: str
    ready_time: str
    closing_time: str
    address: Address = jstruct.JStruct[Address, jstruct.REQUIRED]

    parcels: typing.List[Parcel] = jstruct.JList[Parcel]
    shipment_identifiers: typing.List[str] = []
    package_location: str = None
    options: typing.Dict = {}
    instruction: str = None


@attr.s(auto_attribs=True)
class PickupCancelRequest(BasePickupCancelRequest):
    confirmation_number: str

    address: Address = jstruct.JStruct[Address]
    pickup_date: str = None
    reason: str = None
    options: typing.Dict = {}


@attr.s(auto_attribs=True)
class Rate:
    carrier_name: str
    carrier_id: str

    currency: str = None
    transit_days: int = None
    service: str = None
    total_charge: float = 0.0
    extra_charges: typing.List[ChargeDetails] = []
    estimated_delivery: str = None
    id: str = None
    meta: dict = None
    test_mode: bool = None
    object_type: str = "rate"


@attr.s(auto_attribs=True)
class RateRequest(BaseRateRequest):
    shipper: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    recipient: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    parcels: typing.List[Parcel] = jstruct.JList[Parcel, jstruct.REQUIRED]

    payment: Payment = jstruct.JStruct[Payment]
    customs: Customs = jstruct.JStruct[Customs]
    return_address: Address = jstruct.JStruct[Address]
    billing_address: Address = jstruct.JStruct[Address]

    services: typing.List[str] = []
    options: typing.Dict = {}
    reference: str = ""

    carrier_ids: typing.List[str] = []


@attr.s(auto_attribs=True)
class ShipmentRequest(BaseShipmentRequest):
    service: str
    selected_rate_id: str  # type: ignore

    shipper: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    recipient: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    parcels: typing.List[Parcel] = jstruct.JList[Parcel, jstruct.REQUIRED]
    rates: typing.List[Rate] = jstruct.JList[Rate, jstruct.REQUIRED]

    payment: Payment = jstruct.JStruct[Payment]
    customs: Customs = jstruct.JStruct[Customs]
    return_address: Address = jstruct.JStruct[Address]
    billing_address: Address = jstruct.JStruct[Address]

    options: typing.Dict = {}
    reference: str = ""
    label_type: str = None
    id: str = None

    metadata: typing.Dict = {}


@attr.s(auto_attribs=True)
class Shipment:
    carrier_id: str
    carrier_name: str
    tracking_number: str
    shipment_identifier: str
    service: str
    selected_rate_id: str

    shipper: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    recipient: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    parcels: typing.List[Parcel] = jstruct.JList[Parcel, jstruct.REQUIRED]
    rates: typing.List[Rate] = jstruct.JList[Rate, jstruct.REQUIRED]
    selected_rate: Rate = jstruct.JStruct[Rate, jstruct.REQUIRED]
    docs: Documents = jstruct.JStruct[Documents, jstruct.REQUIRED]

    payment: Payment = jstruct.JStruct[Payment]
    customs: Customs = jstruct.JStruct[Customs]
    billing_address: Address = jstruct.JStruct[Address]

    options: typing.Dict = {}
    reference: str = ""
    label_type: str = None
    tracking_url: str = None
    tracker_id: str = None
    status: str = ""
    metadata: typing.Dict = {}
    meta: dict = {}
    id: str = None

    messages: typing.List[Message] = jstruct.JList[Message]
    created_at: str = None
    test_mode: bool = None


@attr.s(auto_attribs=True)
class Pickup:
    carrier_id: str
    carrier_name: str

    pickup_date: str
    ready_time: str
    closing_time: str
    confirmation_number: str
    address: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    parcels: typing.List[Parcel] = jstruct.JList[Parcel, jstruct.REQUIRED]

    pickup_charge: ChargeDetails = jstruct.JStruct[ChargeDetails]
    instruction: str = None
    package_location: str = None
    metadata: typing.Dict = {}
    options: typing.Dict = {}
    meta: dict = {}
    id: str = None

    messages: typing.List[Message] = jstruct.JList[Message]
    test_mode: bool = None


@attr.s(auto_attribs=True)
class TrackingRequest(BaseTrackingRequest):
    tracking_numbers: typing.List[str]
    account_numer: str = None
    reference: str = None
    options: typing.Dict = {}
    info: TrackingInfo = jstruct.JStruct[TrackingInfo]


@attr.s(auto_attribs=True)
class Tracking:
    carrier_name: str
    carrier_id: str
    tracking_number: str
    events: typing.List[TrackingEvent] = jstruct.JList[TrackingEvent]

    status: str = "unknown"
    info: TrackingInfo = jstruct.JStruct[TrackingInfo]
    images: Images = jstruct.JStruct[Images]
    estimated_delivery: str = None
    delivered: bool = None
    test_mode: bool = None
    options: typing.Dict = {}
    meta: dict = None
    id: str = None


@attr.s(auto_attribs=True)
class DocumentUploadResponse:
    carrier_name: str
    carrier_id: str
    documents: typing.List[DocumentDetails] = jstruct.JList[DocumentDetails]
    reference: str = ""

    test_mode: bool = None
    options: typing.Dict = {}
    meta: dict = None
    id: str = None
    messages: typing.List[Message] = jstruct.JList[Message]


@attr.s(auto_attribs=True)
class Manifest:
    carrier_id: str
    carrier_name: str

    shipment_identifiers: typing.List[str]
    address: Address = jstruct.JStruct[Address, jstruct.REQUIRED]
    doc: ManifestDocument = jstruct.JStruct[ManifestDocument]

    reference: str = None
    metadata: typing.Dict = {}
    options: typing.Dict = {}
    meta: dict = {}
    id: str = None

    messages: typing.List[Message] = jstruct.JList[Message]
    test_mode: bool = None


@attr.s(auto_attribs=True)
class ConfirmationResponse:
    messages: typing.List[Message] = jstruct.JList[Message]
    confirmation: Confirmation = jstruct.JStruct[Confirmation]


@attr.s(auto_attribs=True)
class PickupResponse:
    messages: typing.List[Message] = jstruct.JList[Message]
    pickup: Pickup = jstruct.JStruct[Pickup]


@attr.s(auto_attribs=True)
class RateResponse:
    messages: typing.List[Message] = jstruct.JList[Message]
    rates: typing.List[Rate] = jstruct.JList[Rate]


@attr.s(auto_attribs=True)
class TrackingResponse:
    messages: typing.List[Message] = jstruct.JList[Message]
    tracking: Tracking = jstruct.JStruct[Tracking]


@attr.s(auto_attribs=True)
class ManifestResponse:
    messages: typing.List[Message] = jstruct.JList[Message]
    manifest: Manifest = jstruct.JStruct[Manifest]


@attr.s(auto_attribs=True)
class Error:
    message: str = None
    code: str = None
    details: typing.Dict = None
