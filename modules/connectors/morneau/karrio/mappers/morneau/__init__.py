
from karrio.core.metadata import Metadata

from karrio.mappers.morneau.mapper import Mapper
from karrio.mappers.morneau.proxy import Proxy
from karrio.mappers.morneau.settings import Settings
import karrio.providers.morneau.units as units


METADATA = Metadata(
    id="morneau",
    label="Groupe Morneau",
    # Integrations
    Mapper=Mapper,
    Proxy=Proxy,
    Settings=Settings,
    # Data Units
    is_hub=False
)
