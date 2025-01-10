from attr import s
from typing import Optional, List
from jstruct import JList, JStruct


@s(auto_attribs=True)
class DimensionType:
    Piece: Optional[int] = None
    Length: Optional[int] = None
    Width: Optional[int] = None
    Height: Optional[int] = None


@s(auto_attribs=True)
class QuoteType:
    StartZone: Optional[str] = None
    EndZone: Optional[str] = None
    UserName: Optional[str] = None
    NbPallet: Optional[int] = None
    Weight: Optional[int] = None
    WeightUnit: Optional[str] = None
    Commodities: List[str] = []
    Dimensions: List[DimensionType] = JList[DimensionType]


@s(auto_attribs=True)
class RateRequestType:
    BillToCodeId: Optional[int] = None
    Division: Optional[str] = None
    Quote: Optional[QuoteType] = JStruct[QuoteType]
