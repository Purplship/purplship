from attr import s
from typing import Optional, List
from jstruct import JStruct, JList


@s(auto_attribs=True)
class WhereType:
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None


@s(auto_attribs=True)
class EventType:
    type: Optional[str] = None
    when: Optional[str] = None
    where: Optional[WhereType] = JStruct[WhereType]
    message: Optional[str] = None


@s(auto_attribs=True)
class TrackingResponseType:
    events: List[EventType] = JList[EventType]
