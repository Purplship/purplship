
"""Karrio freightcom v2 client proxy."""

import karrio.lib as lib
import karrio.api.proxy as proxy
import karrio.mappers.freightcomv2.settings as provider_settings


class Proxy(proxy.Proxy):
    settings: provider_settings.Settings

    def get_rates(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/rate",
            data=request.serialize(),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                #"X-API-VERSION": "1",
                "Authorization": f"{self.settings.apiKey}"
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def create_shipment(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/shipment",
            data=request.serialize(),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                #"X-API-VERSION": "1",
                "Authorization": f"{self.settings.apiKey}"
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def cancel_shipment(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/shipment/{request.serialize()['shipment_id']}",
            data=request.serialize(),
            trace=self.trace_as("json"),
            method="DELETE",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                #"X-API-VERSION": "1",
                "Authorization": f"{self.settings.apiKey}"
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def get_tracking(self, request: lib.Serializable) -> lib.Deserializable[str]:
        payload = request.serialize()
        response = lib.request(
            url=f"{self.settings.server_url}/shipment/{payload['shipment_id']}/tracking-events",
            data=request.serialize(),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                #"X-API-VERSION": "1",
                "Authorization": f"{self.settings.apiKey}"
            },
        )

        return lib.Deserializable(response, lib.to_dict)
