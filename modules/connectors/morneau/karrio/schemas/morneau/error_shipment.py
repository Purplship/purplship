from attr import s
from typing import List, Optional
from jstruct import JStruct


@s(auto_attribs=True)
class ModelStateType:
    loadTender: List[str] = []


@s(auto_attribs=True)
class ErrorShipmentType:
    Message: Optional[str] = None
    ModelState: Optional[ModelStateType] = JStruct[ModelStateType]
