from attr import s
from typing import Optional


@s(auto_attribs=True)
class ErrorCancelShipmentType:
    Message: Optional[str] = None
