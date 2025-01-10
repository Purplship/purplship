"""Karrio Groupe Morneau client proxy."""
import typing

import karrio.api.proxy as proxy
import karrio.lib as lib
import karrio.mappers.morneau.settings as provider_settings


class Proxy(proxy.Proxy):
    settings: provider_settings.Settings

    def get_rates(self, request: lib.Serializable) -> lib.Deserializable[str]:
        # Send request for quotation
        response = lib.request(
            url=f"{self.settings.rates_server_url}/quotes/add",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Authorization": f"Bearer {self.settings.rating_jwt_token}",
                "Content-Type": "application/json",
            },
        )
        print(self.settings.rating_jwt_token)
        print(response)
        return lib.Deserializable(response, lib.to_dict)

    def create_shipment(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/LoadTender/{self.settings.caller_id}",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-API-VERSION": "1",
                "Authorization": f"Bearer {self.settings.shipment_jwt_token}"
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def cancel_shipment(self, request: lib.Serializable) -> lib.Deserializable[str]:
        payload = request.serialize()
        response = lib.request(
            url=f"{self.settings.server_url}/LoadTender/{self.settings.caller_id}/{payload['reference']}/cancel",
            method="GET",
            headers={
                "Accept": "application/json",
                "X-API-VERSION": "1",
                "Authorization": f"Bearer {self.settings.shipment_jwt_token}"
            },
            # on_error=provider_error.parse_http_response,

        )

        return lib.Deserializable(response if any(response) else "{}", lib.to_dict)

    def get_tracking(self, request: lib.Serializable) -> lib.Deserializable[str]:
        def _get_tracking(reference: str):
            return reference, lib.request(
                url=f"{self.settings.tracking_url}/api/v1/tracking/en/MORNEAU/{reference}",
                trace=self.trace_as("json"),
                method="GET",
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-API-VERSION": "1",
                    "Authorization": f"Bearer {self.settings.tracking_jwt_token}"
                },
            )

        responses: typing.List[typing.Tuple[str, str]] = lib.run_concurently(
            _get_tracking, request.serialize()
        )

        return lib.Deserializable(
            responses,
            lambda res: [
                (num, lib.to_dict(track))
                for num, track in res
                if any(track.strip())
            ],
        )
