
from karrio.core.metadata import Metadata

from karrio.mappers.freightcomv2.mapper import Mapper
from karrio.mappers.freightcomv2.proxy import Proxy
from karrio.mappers.freightcomv2.settings import Settings
import karrio.providers.freightcomv2.units as units


METADATA = Metadata(
    id="freightcomv2",
    label="freightcom v2",
    # Integrations
    Mapper=Mapper,
    Proxy=Proxy,
    Settings=Settings,
    # Data Units
    is_hub=False
)
