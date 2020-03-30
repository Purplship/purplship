"""PurplShip Settings base class definition"""

import attr
from abc import ABC


@attr.s(auto_attribs=True)
class Settings(ABC):
    """ 
    Unified API carrier Connection settings (Interface)
    """

    carrier_name: str
    id: str = None
    test: bool = False

    @property
    def server_url(self):
        return None
