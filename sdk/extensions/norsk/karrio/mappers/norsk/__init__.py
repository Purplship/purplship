
from karrio.core.metadata import Metadata

from karrio.mappers.norsk.mapper import Mapper
from karrio.mappers.norsk.proxy import Proxy
from karrio.mappers.norsk.settings import Settings
import karrio.providers.norsk.units as units


METADATA = Metadata(
    id="norsk",
    label="Norsk Global",
    # Integrations
    Mapper=Mapper,
    Proxy=Proxy,
    Settings=Settings,
    # Data Units
    is_hub=False
)
