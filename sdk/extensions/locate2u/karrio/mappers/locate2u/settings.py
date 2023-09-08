"""Karrio Locate2u client settings."""

import attr
import jstruct
import karrio.lib as lib
import karrio.providers.locate2u.utils as provider_utils


@attr.s(auto_attribs=True)
class Settings(provider_utils.Settings):
    """Locate2u connection settings."""

    # required carrier specific properties
    client_id: str
    client_secret: str

    # generic properties
    id: str = None
    test_mode: bool = False
    carrier_id: str = "locate2u"
    account_country_code: str = None
    metadata: dict = {}
    cache: lib.Cache = jstruct.JStruct[lib.Cache, False, dict(default=lib.Cache())]
