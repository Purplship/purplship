from attr import s
from typing import Optional, Any, List
from jstruct import JStruct, JList


@s(auto_attribs=True)
class MessageType:
    Code: Optional[str] = None
    Message: Optional[str] = None
    HttpStatusCode: Optional[int] = None
    ErrorMessage: Any = None


@s(auto_attribs=True)
class CallerType:
    Name: Optional[str] = None
    Street: Optional[str] = None
    City: Optional[str] = None
    Province: Optional[str] = None
    PostalCode: Optional[str] = None


@s(auto_attribs=True)
class HistoryType:
    DateTime: Optional[str] = None
    Status: Optional[str] = None
    Zone: Optional[str] = None
    ZoneId: Optional[str] = None
    StatusCode: Optional[str] = None
    Ordinal: Optional[int] = None
    IsTerminal: Optional[bool] = None
    TerminalAddress: Optional[str] = None
    StatusReasonCode: Any = None
    StatusDescription: Any = None
    DeliveryTerminalZone: Any = None
    IsFinalDeliveryStatus: Optional[bool] = None


@s(auto_attribs=True)
class HistoryTerminalType:
    Sequence: Optional[int] = None
    Zone: Optional[str] = None
    ZoneId: Optional[str] = None
    TerminalAddress: Optional[str] = None
    IsTermSwitch: Optional[bool] = None


@s(auto_attribs=True)
class VehicleCoordinatesType:
    VehicleCode: Optional[str] = None
    Longitude: Optional[str] = None
    Latitude: Optional[str] = None


@s(auto_attribs=True)
class OrderTrackingType:
    BillId: Optional[str] = None
    CreatedBy: Optional[str] = None
    CreatedOn: Optional[str] = None
    Caller: Optional[CallerType] = JStruct[CallerType]
    Shipper: Optional[CallerType] = JStruct[CallerType]
    Receiver: Optional[CallerType] = JStruct[CallerType]
    History: List[HistoryType] = JList[HistoryType]
    HistoryTerminals: List[HistoryTerminalType] = JList[HistoryTerminalType]
    VehicleCoordinates: Optional[VehicleCoordinatesType] = JStruct[VehicleCoordinatesType]
    HasDangerousMaterials: Optional[str] = None
    TripCompleted: Optional[bool] = None


@s(auto_attribs=True)
class TrackersResponseType:
    OrderTracking: Optional[OrderTrackingType] = JStruct[OrderTrackingType]
    Message: Optional[MessageType] = JStruct[MessageType]
