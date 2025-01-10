
import karrio.core as core
import karrio.lib as lib
import karrio.providers.morneau.units as units


class Settings(core.Settings):
    """freightcom v2 connection settings."""
    # username: str  # carrier specific api credential key
    apiKey: str = "mNlJ5Vwj5jn70YURDbksWyNdbrh08u24HnY0tJOn0Tz9wZdiCvfjktWDRXhFQtzb"
    @property
    def carrier_name(self):
        return "freightcomv2"
        
    @property
    def server_url(self):
        return (
            "https://customer-external-api.ssd-test.freightcom.com"
            if self.test_mode
            else "https://external-api.freightcom.com"
        )

    # @property
    # def connection_config(self) -> lib.units.Options:
    #     from karrio.providers.freightcomv2.units import ConnectionConfig
    #     return lib.to_connection_config(
    #         self.config or {},
    #         option_type=ConnectionConfig,
    #     )
