
"""Karrio DX Express client settings."""

import attr
import karrio.providers.dxe.utils as provider_utils


@attr.s(auto_attribs=True)
class Settings(provider_utils.Settings):
    """DX Express connection settings."""

    # required carrier specific properties

    # generic properties
    id: str = None
    test_mode: bool = False
    carrier_id: str = "dxe"
    account_country_code: str = None
    metadata: dict = {}
