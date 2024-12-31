
from karrio.core.metadata import Metadata

from karrio.mappers.dxe.mapper import Mapper
from karrio.mappers.dxe.proxy import Proxy
from karrio.mappers.dxe.settings import Settings
import karrio.providers.dxe.units as units


METADATA = Metadata(
    id="dxe",
    label="DX Express",
    # Integrations
    Mapper=Mapper,
    Proxy=Proxy,
    Settings=Settings,
    # Data Units
    is_hub=False
)
