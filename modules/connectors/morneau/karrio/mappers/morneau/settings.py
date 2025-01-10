"""Karrio Groupe Morneau client settings."""

import attr
import jstruct
import karrio.lib as lib
from karrio.providers.morneau.utils import Settings as BaseSettings


@attr.s(auto_attribs=True)
class Settings(BaseSettings):
    """Groupe Morneau connection settings."""

    username: str
    password: str
    caller_id: str
    billed_id: int
    division: str = "Morneau"
    carrier_id: str = "morneau"
    account_country_code: str = None
    cache: lib.Cache = jstruct.JStruct[lib.Cache, False, dict(default=lib.Cache())]
    test_mode: bool = False
    metadata: dict = {}
    id: str = None
    config: dict = {}
