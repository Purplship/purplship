from attr import s
from typing import Optional, List
from jstruct import JStruct, JList


@s(auto_attribs=True)
class NumberType:
    number: Optional[str] = None
    extension: Optional[int] = None


@s(auto_attribs=True)
class BrokerType:
    usecarrier: Optional[bool] = None
    name: Optional[str] = None
    accountnumber: Optional[str] = None
    phonenumber: Optional[NumberType] = JStruct[NumberType]
    faxnumber: Optional[NumberType] = JStruct[NumberType]
    emailaddress: Optional[str] = None
    usmcanumber: Optional[str] = None
    fdanumber: Optional[str] = None


@s(auto_attribs=True)
class TotalCostType:
    currency: Optional[str] = None
    value: Optional[int] = None


@s(auto_attribs=True)
class WeightType:
    unit: Optional[str] = None
    value: Optional[float] = None


@s(auto_attribs=True)
class ProductType:
    productname: Optional[str] = None
    weight: Optional[WeightType] = JStruct[WeightType]
    hscode: Optional[str] = None
    countryoforigin: Optional[str] = None
    numunits: Optional[int] = None
    unitprice: Optional[TotalCostType] = JStruct[TotalCostType]
    description: Optional[str] = None


@s(auto_attribs=True)
class AddressType:
    addressline1: Optional[str] = None
    addressline2: Optional[str] = None
    unitnumber: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    postalcode: Optional[str] = None


@s(auto_attribs=True)
class TaxRecipientType:
    type: Optional[str] = None
    shippertaxidentifier: Optional[str] = None
    receivertaxidentifier: Optional[str] = None
    thirdpartytaxidentifier: Optional[str] = None
    othertaxidentifier: Optional[str] = None
    name: Optional[str] = None
    address: Optional[AddressType] = JStruct[AddressType]
    phonenumber: Optional[NumberType] = JStruct[NumberType]
    reasonforexport: Optional[str] = None
    additionalremarks: Optional[str] = None
    comments: Optional[str] = None


@s(auto_attribs=True)
class CustomsInvoiceDetailsType:
    taxrecipient: Optional[TaxRecipientType] = JStruct[TaxRecipientType]
    products: List[ProductType] = JList[ProductType]


@s(auto_attribs=True)
class CustomsInvoiceType:
    source: Optional[str] = None
    broker: Optional[BrokerType] = JStruct[BrokerType]
    details: Optional[CustomsInvoiceDetailsType] = JStruct[CustomsInvoiceDetailsType]


@s(auto_attribs=True)
class ReadyType:
    hour: Optional[int] = None
    minute: Optional[int] = None


@s(auto_attribs=True)
class DestinationType:
    name: Optional[str] = None
    address: Optional[AddressType] = JStruct[AddressType]
    residential: Optional[bool] = None
    tailgaterequired: Optional[bool] = None
    instructions: Optional[str] = None
    contactname: Optional[str] = None
    phonenumber: Optional[NumberType] = JStruct[NumberType]
    emailaddresses: List[str] = []
    receivesemailupdates: Optional[bool] = None
    readyat: Optional[ReadyType] = JStruct[ReadyType]
    readyuntil: Optional[ReadyType] = JStruct[ReadyType]
    signaturerequirement: Optional[str] = None


@s(auto_attribs=True)
class DateType:
    year: Optional[int] = None
    month: Optional[int] = None
    day: Optional[int] = None


@s(auto_attribs=True)
class InsuranceType:
    type: Optional[str] = None
    totalcost: Optional[TotalCostType] = JStruct[TotalCostType]


@s(auto_attribs=True)
class DangerousGoodsDetailsType:
    packaginggroup: Optional[str] = None
    goodsclass: Optional[str] = None
    description: Optional[str] = None
    unitednationsnumber: Optional[str] = None
    emergencycontactname: Optional[str] = None
    emergencycontactphonenumber: Optional[NumberType] = JStruct[NumberType]


@s(auto_attribs=True)
class CuboidType:
    unit: Optional[str] = None
    l: Optional[int] = None
    w: Optional[int] = None
    h: Optional[int] = None


@s(auto_attribs=True)
class MeasurementsType:
    weight: Optional[WeightType] = JStruct[WeightType]
    cuboid: Optional[CuboidType] = JStruct[CuboidType]


@s(auto_attribs=True)
class PalletType:
    measurements: Optional[MeasurementsType] = JStruct[MeasurementsType]
    description: Optional[str] = None
    freightclass: Optional[str] = None
    nmfc: Optional[str] = None
    contentstype: Optional[str] = None
    numpieces: Optional[int] = None


@s(auto_attribs=True)
class InBondDetailsType:
    type: Optional[str] = None
    name: Optional[str] = None
    address: Optional[str] = None
    contactmethod: Optional[str] = None
    contactemailaddress: Optional[str] = None
    contactphonenumber: Optional[NumberType] = JStruct[NumberType]


@s(auto_attribs=True)
class PalletServiceDetailsType:
    limitedaccessdeliverytype: Optional[str] = None
    limitedaccessdeliveryothername: Optional[str] = None
    inbond: Optional[bool] = None
    inbonddetails: Optional[InBondDetailsType] = JStruct[InBondDetailsType]
    appointmentdelivery: Optional[bool] = None
    protectfromfreeze: Optional[bool] = None
    thresholdpickup: Optional[bool] = None
    thresholddelivery: Optional[bool] = None


@s(auto_attribs=True)
class PackagingPropertiesType:
    pallettype: Optional[str] = None
    hasstackablepallets: Optional[bool] = None
    dangerousgoods: Optional[str] = None
    dangerousgoodsdetails: Optional[DangerousGoodsDetailsType] = JStruct[DangerousGoodsDetailsType]
    pallets: List[PalletType] = JList[PalletType]
    palletservicedetails: Optional[PalletServiceDetailsType] = JStruct[PalletServiceDetailsType]


@s(auto_attribs=True)
class CreateShipmentRequestDetailsType:
    origin: Optional[DestinationType] = JStruct[DestinationType]
    destination: Optional[DestinationType] = JStruct[DestinationType]
    expectedshipdate: Optional[DateType] = JStruct[DateType]
    packagingtype: Optional[str] = None
    packagingproperties: Optional[PackagingPropertiesType] = JStruct[PackagingPropertiesType]
    insurance: Optional[InsuranceType] = JStruct[InsuranceType]
    referencecodes: List[str] = []


@s(auto_attribs=True)
class DispatchDetailsType:
    date: Optional[DateType] = JStruct[DateType]
    readyat: Optional[ReadyType] = JStruct[ReadyType]
    readyuntil: Optional[ReadyType] = JStruct[ReadyType]


@s(auto_attribs=True)
class PickupDetailsType:
    prescheduledpickup: Optional[bool] = None
    date: Optional[DateType] = JStruct[DateType]
    readyat: Optional[ReadyType] = JStruct[ReadyType]
    readyuntil: Optional[ReadyType] = JStruct[ReadyType]
    pickuplocation: Optional[str] = None
    contactname: Optional[str] = None
    contactphonenumber: Optional[NumberType] = JStruct[NumberType]


@s(auto_attribs=True)
class CreateShipmentRequestType:
    uniqueid: Optional[str] = None
    paymentmethodid: Optional[str] = None
    serviceid: Optional[str] = None
    details: Optional[CreateShipmentRequestDetailsType] = JStruct[CreateShipmentRequestDetailsType]
    customsinvoice: Optional[CustomsInvoiceType] = JStruct[CustomsInvoiceType]
    pickupdetails: Optional[PickupDetailsType] = JStruct[PickupDetailsType]
    dispatchdetails: Optional[DispatchDetailsType] = JStruct[DispatchDetailsType]
