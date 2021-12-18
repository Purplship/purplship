"""Purplship Generic client settings."""

from typing import List
import attr
from jstruct.types import JList, REQUIRED
from purplship.core.models import ServiceLevel, LabelTemplate
from purplship.universal.mappers import RatingMixinSettings, ShippingMixinSettings
from purplship.providers.generic.units import DEFAULT_SERVICES
from purplship.providers.generic.utils import Settings as BaseSettings


@attr.s(auto_attribs=True)
class Settings(BaseSettings, RatingMixinSettings, ShippingMixinSettings):
    """Generic connection settings."""

    account_number: str = None

    id: str = None
    test: bool = False
    carrier_id: str = "generic"
    account_country_code: str = None

    services: List[ServiceLevel] = JList[ServiceLevel, not REQUIRED, dict(default=DEFAULT_SERVICES)]  # type: ignore
    templates: List[LabelTemplate] = JList[LabelTemplate]
