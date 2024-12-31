
"""Karrio Norsk Global client settings."""

import attr
import karrio.providers.norsk.utils as provider_utils


@attr.s(auto_attribs=True)
class Settings(provider_utils.Settings):
    """Norsk Global connection settings."""

    # required carrier specific properties

    # generic properties
    id: str = None
    test_mode: bool = False
    carrier_id: str = "norsk"
    account_country_code: str = None
    metadata: dict = {}
