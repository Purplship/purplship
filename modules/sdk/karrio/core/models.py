"""Karrio Unified model definitions module."""

from unicodedata import category
import attr
from typing import List, Dict, Any, Union
from jstruct import JList, JStruct, REQUIRED


@attr.s(auto_attribs=True)
class Address:
    """shipping party (contact and address) data type."""

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
    address_line2: str = None
    street_number: str = None
    suite: str = None

    federal_tax_id: str = None
    state_tax_id: str = None


@attr.s(auto_attribs=True)
class Commodity:
    """commodity or product unified data type."""

    id: str = None
    sku: str = None
    title: str = None
    quantity: int = 1
    hs_code: str = None
    weight: float = None
    weight_unit: str = None
    description: str = None
    value_amount: float = None
    value_currency: str = None
    origin_country: str = None
    category: str = None

    metadata: Dict = {}


@attr.s(auto_attribs=True)
class Parcel:
    """parcel unified data type."""

    id: str = None
    weight: float = None
    width: float = None
    height: float = None
    length: float = None
    weight_unit: str = None
    dimension_unit: str = None

    packaging_type: str = None
    package_preset: str = None

    is_document: bool = False
    description: str = None
    content: str = None

    items: List[Commodity] = JList[Commodity]
    reference_number: str = None
    freight_class: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class Payment:
    """payment details unified data type."""

    paid_by: str = "sender"
    currency: str = None
    account_number: str = None
    id: str = None


@attr.s(auto_attribs=True)
class Duty:
    """duty payment details unified data type."""

    paid_by: str = "sender"
    currency: str = None
    account_number: str = None
    declared_value: float = None
    id: str = None


@attr.s(auto_attribs=True)
class Customs:
    """customs info unified data type."""

    commodities: List[Commodity] = JList[Commodity, REQUIRED]
    certify: bool = None
    signer: str = None
    content_type: str = None
    content_description: str = None
    incoterm: str = None
    invoice: str = None
    invoice_date: str = None
    duty: Duty = JStruct[Duty]
    duty_billing_address: Address = JStruct[Address]
    commercial_invoice: bool = False
    options: Dict = {}
    id: str = None


@attr.s(auto_attribs=True)
class ShipmentRequest:
    """shipment request unified data type."""

    service: str

    shipper: Address = JStruct[Address, REQUIRED]
    recipient: Address = JStruct[Address, REQUIRED]
    parcels: List[Parcel] = JList[Parcel, REQUIRED]

    payment: Payment = JStruct[Payment]
    customs: Customs = JStruct[Customs]
    return_address: Address = JStruct[Address]
    billing_address: Address = JStruct[Address]

    options: Dict = {}
    reference: str = ""
    label_type: str = None

    metadata: Dict = {}


@attr.s(auto_attribs=True)
class ShipmentCancelRequest:
    """shipment cancellation request unified data type."""

    shipment_identifier: str

    service: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class RateRequest:
    """rate fetching request unified data type."""

    shipper: Address = JStruct[Address, REQUIRED]
    recipient: Address = JStruct[Address, REQUIRED]
    parcels: List[Parcel] = JList[Parcel, REQUIRED]

    payment: Payment = JStruct[Payment]
    customs: Customs = JStruct[Customs]
    return_address: Address = JStruct[Address]
    billing_address: Address = JStruct[Address]

    services: List[str] = []
    options: Dict = {}
    reference: str = ""


@attr.s(auto_attribs=True)
class TrackingRequest:
    """tracking request unified data type."""

    tracking_numbers: List[str]
    account_numer: str = None
    reference: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class PickupRequest:
    """pickup request unified data type."""

    pickup_date: str
    ready_time: str
    closing_time: str
    address: Address = JStruct[Address, REQUIRED]

    parcels: List[Parcel] = JList[Parcel]
    shipment_identifiers: List[str] = []
    package_location: str = None
    instruction: str = None
    options: Dict = {}

    metadata: Dict = {}


@attr.s(auto_attribs=True)
class PickupUpdateRequest:
    """pickup update request unified data type."""

    confirmation_number: str
    pickup_date: str
    ready_time: str
    closing_time: str
    address: Address = JStruct[Address, REQUIRED]

    parcels: List[Parcel] = JList[Parcel]
    shipment_identifiers: List[str] = []
    package_location: str = None
    instruction: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class PickupCancelRequest:
    """pickup cancellation request unified data type."""

    confirmation_number: str

    address: Address = JStruct[Address]
    pickup_date: str = None
    reason: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class AddressValidationRequest:
    """address validation request unified data type."""

    address: Address = JStruct[Address, REQUIRED]


@attr.s(auto_attribs=True)
class ManifestRequest:
    """manifest request unified data type."""

    shipment_identifiers: List[str]
    address: Address = JStruct[Address, REQUIRED]

    reference: str = None
    metadata: Dict = {}
    options: Dict = {}


@attr.s(auto_attribs=True)
class Message:
    """Karrio unified Message data type."""

    carrier_name: str
    carrier_id: str
    message: Union[str, Any] = None
    code: str = None
    level: str = None
    details: Dict = None


@attr.s(auto_attribs=True)
class ChargeDetails:
    """Karrio unified charge data type."""

    name: str = None
    amount: float = None
    currency: str = None


@attr.s(auto_attribs=True)
class AddressValidationDetails:
    """Karrio unified address validation details data type."""

    carrier_name: str
    carrier_id: str
    success: bool
    complete_address: Address = None


@attr.s(auto_attribs=True)
class TrackingEvent:
    """Karrio unified tracking event data type."""

    date: str
    description: str
    code: str = None
    time: str = None
    location: str = None

    # Geolocation
    latitude: float = None
    longitude: float = None


@attr.s(auto_attribs=True)
class RateDetails:
    """Karrio unified rate (quote) details data type."""

    carrier_name: str
    carrier_id: str
    service: str
    currency: str = None
    total_charge: float = 0.0
    extra_charges: List[ChargeDetails] = JList[ChargeDetails]
    estimated_delivery: str = None
    transit_days: int = None
    meta: dict = None
    id: str = None


@attr.s(auto_attribs=True)
class TrackingInfo:
    """Karrio unified tracking details data type."""

    carrier_tracking_link: str = None
    customer_name: str = None
    expected_delivery: str = None
    note: str = None
    order_date: str = None
    order_id: str = None
    package_weight: str = None
    package_weight_unit: str = None
    shipment_package_count: str = None
    shipment_pickup_date: str = None
    shipment_delivery_date: str = None
    shipment_service: str = None
    shipment_origin_country: str = None
    shipment_origin_postal_code: str = None
    shipment_destination_country: str = None
    shipment_destination_postal_code: str = None
    shipping_date: str = None
    signed_by: str = None
    source: str = None


@attr.s(auto_attribs=True)
class Images:
    """Karrio unified tracker images data type."""

    delivery_image: str = None
    signature_image: str = None


@attr.s(auto_attribs=True)
class TrackingDetails:
    """Karrio unified tracking details data type."""

    carrier_name: str
    carrier_id: str
    tracking_number: str
    events: List[TrackingEvent] = JList[TrackingEvent, REQUIRED]
    images: Images = JStruct[Images]
    estimated_delivery: str = None
    info: TrackingInfo = None
    delivered: bool = None
    status: str = None
    meta: dict = None


@attr.s(auto_attribs=True)
class Documents:
    """Karrio unified shipment documents details data type."""

    label: str

    invoice: str = None
    zpl_label: str = None
    pdf_label: str = None


@attr.s(auto_attribs=True)
class ShipmentDetails:
    """Karrio unified shipment details data type."""

    carrier_name: str
    carrier_id: str
    tracking_number: str
    shipment_identifier: str
    docs: Documents = JStruct[Documents, REQUIRED]
    selected_rate: RateDetails = JStruct[RateDetails]
    label_type: str = None
    meta: dict = None
    id: str = None


@attr.s(auto_attribs=True)
class PickupDetails:
    """Karrio unified pickup details data type."""

    carrier_name: str
    carrier_id: str
    confirmation_number: str
    pickup_date: str = None
    pickup_charge: ChargeDetails = JStruct[ChargeDetails]
    ready_time: str = None
    closing_time: str = None
    meta: dict = None
    id: str = None


@attr.s(auto_attribs=True)
class ManifestDocument:
    """Karrio unified manifest document details data type."""

    manifest: str = None


@attr.s(auto_attribs=True)
class ManifestDetails:
    """Karrio unified manifest details data type."""

    carrier_name: str
    carrier_id: str
    doc: ManifestDocument = JStruct[ManifestDocument]
    meta: dict = None
    id: str = None


@attr.s(auto_attribs=True)
class ConfirmationDetails:
    """Karrio unified binary operation confirmation data type."""

    carrier_name: str
    carrier_id: str
    success: bool
    operation: str


@attr.s(auto_attribs=True)
class ServiceZone:
    """Karrio unified service zone."""

    id: str = None
    label: str = None
    rate: float = None

    # Weight restrictions
    min_weight: float = None
    max_weight: float = None

    # Estimated delivery
    transit_days: int = None
    transit_time: float = None

    # Geolocation
    radius: float = None
    latitude: float = None
    longitude: float = None

    # Location
    cities: List[str] = []
    postal_codes: List[str] = []
    country_codes: List[str] = []


@attr.s(auto_attribs=True)
class ServiceLevel:
    """Karrio unified service level data type."""

    service_name: str
    service_code: str
    carrier_service_code: str = None
    description: str = ""
    active: bool = True
    id: str = None

    # Rate definitions
    currency: str = None
    zones: List[ServiceZone] = JList[ServiceZone]

    # Weight restrictions
    min_weight: float = None
    max_weight: float = None
    weight_unit: str = None

    # Size restrictions
    max_width: float = None
    max_height: float = None
    max_length: float = None
    dimension_unit: str = None

    # Destination supports
    domicile: bool = None
    international: bool = None

    # Estimated delivery
    transit_days: int = None
    transit_time: float = None

    metadata: Dict = {}


@attr.s(auto_attribs=True)
class LabelTemplate:
    """Karrio unified label template data type."""

    slug: str
    template: str
    template_type: str = "SVG"  # ZPL, SVG
    width: int = 4
    height: int = 6

    id: str = None


@attr.s(auto_attribs=True)
class ServiceLabel:
    """Karrio unified service label data type."""

    label: str
    label_type: str
    service_name: str
    service_code: str
    tracking_number: str


@attr.s(auto_attribs=True)
class DocumentFile:
    """shipment document unified data type."""

    doc_file: str  #  base64 encoded string
    doc_name: str
    doc_type: str = None
    doc_format: str = None


@attr.s(auto_attribs=True)
class DocumentUploadRequest:
    """shipment document upload request unified data type."""

    document_files: List[DocumentFile] = JList[DocumentFile, REQUIRED]
    tracking_number: str = None
    shipment_date: str = None
    reference: str = None
    options: Dict = {}


@attr.s(auto_attribs=True)
class DocumentDetails:
    """Karrio unified uploaded document id info data type."""

    doc_id: str
    file_name: str


@attr.s(auto_attribs=True)
class DocumentUploadDetails:
    """Karrio unified shipment document upload details data type."""

    carrier_name: str
    carrier_id: str
    documents: List[DocumentDetails] = JList[DocumentDetails]
    meta: dict = None
    id: str = None
