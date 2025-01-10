import datetime

import jstruct
import karrio.core as core
import karrio.lib as lib
import karrio.providers.morneau.units as units


class Settings(core.Settings):
    """Groupe Morneau connection settings."""

    username: str
    password: str
    caller_id: str
    cache: lib.Cache = jstruct.JStruct[lib.Cache, False, dict(default=lib.Cache())]
    billed_id: int
    division: str = "Morneau"

    @property
    def carrier_name(self):
        return "morneau"

    # Define URLs for different services
    @property
    def rates_server_url(self):
        return "https://cotation.groupemorneau.com/api"

    @property
    def tracking_url(self):
        return "https://dev-shippingapi.groupemorneau.com" if self.test_mode else "https://shippingapi.groupemorneau.com"

    @property
    def server_url(self):
        return "https://dev-tmorposttenderapi.groupemorneau.com" if self.test_mode else "https://tmorposttenderapi.groupemorneau.com"

    @property
    def rating_jwt_token(self):
        return self._retrieve_jwt_token(self.rates_server_url, units.ServiceType.rates_service)

    @property
    def tracking_jwt_token(self):
        return self._retrieve_jwt_token(self.tracking_url, units.ServiceType.tracking_service)

    @property
    def shipment_jwt_token(self):
        return self._retrieve_jwt_token(self.server_url, units.ServiceType.shipping_service)

    def _retrieve_jwt_token(self, url: str, service: units.ServiceType) -> str:
        """Retrieve JWT token from the given URL."""
        cache_key = "auth_token"
        now = datetime.datetime.now()

        # Check if a cached token exists and is still valid
        cached = self.cache.get(cache_key) or {}
        if cached and cached.get('expiry') > now:
            return cached.get('token')

        if service == units.ServiceType.rates_service:

            # Perform the authentication request
            response = lib.request(
                url=f"{url}/auth/login",
                data=f"Username={self.username}&Password={self.password}",
                method="POST",
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

            expires_in_seconds: int = 600

        else:
            # Perform the authentication request
            response = lib.request(
                url=f"{url}/api/auth/Token",
                # this need to be wrapped in lib.json "{"Username": self.username, "Password": self.password}"
                data=lib.to_json({"UserName": self.username, "Password": self.password}),
                method="POST",
                headers={"Content-Type": "application/json"},
            )
            expires_in_seconds: int = 3600

        # Parse the response and extract the token and expiry time
        token_data = lib.to_dict(response)
        token = token_data.get("AccessToken")

        expiry_time = now + datetime.timedelta(seconds=expires_in_seconds)

        # Cache the token and its expiry time
        self.cache.set(cache_key, {"token": token, "expiry": expiry_time})

        return token
