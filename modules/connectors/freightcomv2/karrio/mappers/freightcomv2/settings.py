
"""Karrio freightcom v2 client settings."""

import attr
import karrio.providers.freightcomv2.utils as provider_utils


@attr.s(auto_attribs=True)
class Settings(provider_utils.Settings):
    """freightcom v2 connection settings."""

    # required carrier specific properties
    apiKey: str

    # generic properties
    id: str = None
    test_mode: bool = False
    carrier_id: str = "freightcomv2"
    account_country_code: str = None
    metadata: dict = {}
    config: dict = {}
