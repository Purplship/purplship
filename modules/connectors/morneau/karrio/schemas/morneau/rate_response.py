from attr import s
from typing import Optional, List, Any
from jstruct import JList, JStruct


@s(auto_attribs=True)
class ChargeType:
    Id: Optional[str] = None
    Amount: Optional[float] = None
    Description: Optional[str] = None


@s(auto_attribs=True)
class AccessorialChargesType:
    Charges: List[ChargeType] = JList[ChargeType]
    TotalAmount: Optional[float] = None


@s(auto_attribs=True)
class RateResponseType:
    DetailLineId: Optional[int] = None
    QuoteNumber: Optional[str] = None
    ValidFrom: Optional[str] = None
    ValidTo: Optional[str] = None
    Charges: Optional[float] = None
    XCharges: Optional[float] = None
    ProtectedCharges: Optional[float] = None
    Tps: Optional[float] = None
    Tvq: Optional[float] = None
    TotalCharges: Optional[float] = None
    IsSucessfull: Optional[bool] = None
    AccessorialCharges: Optional[AccessorialChargesType] = JStruct[AccessorialChargesType]
    EndZone: Optional[str] = None
    EndCity: Any = None
    StartZone: Optional[str] = None
    StartCity: Any = None
    NbPallet: Optional[int] = None
    NbPalletPlancher: Optional[int] = None
    NbPieces: Optional[int] = None
    PiecesUnit: Optional[int] = None
    WeightUnit: Optional[int] = None
    RawWeightUnit: Optional[int] = None
    RawPiecesUnit: Optional[str] = None
    Weight: Optional[float] = None
    BillToCode: Optional[str] = None
    UserName: Optional[str] = None
    Commodities: List[str] = []
    Dimensions: List[Any] = []
