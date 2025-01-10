from attr import s
from typing import Optional


@s(auto_attribs=True)
class RateResponseType:
    requestid: Optional[str] = None
