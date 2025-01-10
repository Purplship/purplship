from attr import s
from typing import Optional, Any, List
from jstruct import JList


@s(auto_attribs=True)
class ReferenceType:
    Type: Optional[str] = None
    Value: Optional[int] = None


@s(auto_attribs=True)
class LoadTenderConfirmationType:
    FreightBillNumber: Optional[str] = None
    IsAccepted: Optional[bool] = None
    Status: Optional[str] = None
    PurchaseOrderNumbers: List[Any] = []
    References: List[ReferenceType] = JList[ReferenceType]


@s(auto_attribs=True)
class ShipmentPurchaseResponseType:
    ShipmentIdentifier: Optional[str] = None
    LoadTenderConfirmations: List[LoadTenderConfirmationType] = JList[LoadTenderConfirmationType]
