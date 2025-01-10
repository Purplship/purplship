from attr import s
from typing import Optional, Any, List
from jstruct import JStruct, JList


@s(auto_attribs=True)
class ReferenceType:
    Type: Optional[str] = None
    Value: Optional[int] = None


@s(auto_attribs=True)
class ShipmentIdentifierType:
    Type: Optional[str] = None
    Number: Optional[str] = None


@s(auto_attribs=True)
class AddressType:
    Address1: Optional[str] = None
    Address2: Optional[str] = None
    PostalCode: Optional[str] = None
    City: Optional[str] = None
    ProvinceCode: Optional[str] = None


@s(auto_attribs=True)
class EmergencyContactType:
    FaxNumber: Optional[int] = None
    CellPhoneNumber: Optional[int] = None
    PhoneNumber: Optional[int] = None
    PhoneNumberExtension: Optional[int] = None
    ContactName: Optional[str] = None
    Email: Optional[str] = None


@s(auto_attribs=True)
class ThirdPartyInvoiceeType:
    Name: Optional[str] = None
    Address: Optional[AddressType] = JStruct[AddressType]
    EmergencyContact: Optional[EmergencyContactType] = JStruct[EmergencyContactType]
    IsInvoicee: Optional[bool] = None


@s(auto_attribs=True)
class ExpectedArrivalTimeSlotType:
    Between: Optional[str] = None
    And: Optional[str] = None


@s(auto_attribs=True)
class LoadType:
    Company: Optional[ThirdPartyInvoiceeType] = JStruct[ThirdPartyInvoiceeType]
    ExpectedArrivalTimeSlot: Optional[ExpectedArrivalTimeSlotType] = JStruct[ExpectedArrivalTimeSlotType]
    Commodities: List[Any] = []


@s(auto_attribs=True)
class CommodityType:
    Code: Optional[str] = None


@s(auto_attribs=True)
class FloorPalletsType:
    Quantity: Optional[int] = None


@s(auto_attribs=True)
class WeightType:
    Quantity: Optional[int] = None
    Unit: Optional[str] = None


@s(auto_attribs=True)
class FreightType:
    Description: Optional[str] = None
    ClassCode: Optional[str] = None
    Weight: Optional[WeightType] = JStruct[WeightType]
    Unit: Optional[str] = None
    Quantity: Optional[int] = None
    PurchaseOrderNumbers: List[str] = []


@s(auto_attribs=True)
class UnloadType:
    Number: Optional[int] = None
    Company: Optional[ThirdPartyInvoiceeType] = JStruct[ThirdPartyInvoiceeType]
    ExpectedArrivalTimeSlot: Optional[ExpectedArrivalTimeSlotType] = JStruct[ExpectedArrivalTimeSlotType]
    Commodities: List[CommodityType] = JList[CommodityType]
    SpecialInstructions: Optional[str] = None
    FloorPallets: Optional[FloorPalletsType] = JStruct[FloorPalletsType]
    Freight: List[FreightType] = JList[FreightType]


@s(auto_attribs=True)
class StopsType:
    Loads: List[LoadType] = JList[LoadType]
    Unloads: List[UnloadType] = JList[UnloadType]


@s(auto_attribs=True)
class ShipmentPurchaseRequestType:
    ServiceLevel: Optional[str] = None
    Stops: Optional[StopsType] = JStruct[StopsType]
    Notes: Optional[str] = None
    ShipmentIdentifier: Optional[ShipmentIdentifierType] = JStruct[ShipmentIdentifierType]
    References: List[ReferenceType] = JList[ReferenceType]
    ThirdPartyInvoicee: Optional[ThirdPartyInvoiceeType] = JStruct[ThirdPartyInvoiceeType]
