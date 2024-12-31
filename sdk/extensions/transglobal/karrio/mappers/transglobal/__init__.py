
from karrio.core.metadata import Metadata

from karrio.mappers.transglobal.mapper import Mapper
from karrio.mappers.transglobal.proxy import Proxy
from karrio.mappers.transglobal.settings import Settings
import karrio.providers.transglobal.units as units


METADATA = Metadata(
    id="transglobal",
    label="Transglobal Express",
    # Integrations
    Mapper=Mapper,
    Proxy=Proxy,
    Settings=Settings,
    # Data Units
    is_hub=False
)
