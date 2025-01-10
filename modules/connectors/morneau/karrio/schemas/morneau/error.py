from attr import s
from typing import Optional, Any
from jstruct import JStruct


@s(auto_attribs=True)
class GenericDetailType:
    QuoteNumber: Optional[str] = None


@s(auto_attribs=True)
class ErrorType:
    GenericDetail: Optional[GenericDetailType] = JStruct[GenericDetailType]
    FailedValidation: Any = None
