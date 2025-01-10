from attr import s
from typing import Optional


@s(auto_attribs=True)
class CreateShipmentResponseType:
    id: Optional[str] = None
    previouslycreated: Optional[bool] = None
