from attr import s
from typing import Optional
from jstruct import JStruct


@s(auto_attribs=True)
class MessageType:
    Code: Optional[str] = None
    HttpStatusCode: Optional[int] = None
    ErrorMessage: Optional[str] = None


@s(auto_attribs=True)
class ErrorTrackingType:
    Message: Optional[MessageType] = JStruct[MessageType]
