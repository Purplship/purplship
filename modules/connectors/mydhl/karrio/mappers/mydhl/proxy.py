"""Karrio DHL Express client proxy."""

import karrio.lib as lib
import karrio.api.proxy as proxy
import karrio.mappers.mydhl.settings as provider_settings


class Proxy(proxy.Proxy):
    settings: provider_settings.Settings

    def get_rates(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/rates",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.settings.authorization}",
                "X-API-KEY": self.settings.api_key,
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def create_shipment(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/shipments",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.settings.authorization}",
                "X-API-KEY": self.settings.api_key,
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def get_tracking(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/tracking",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.settings.authorization}",
                "X-API-KEY": self.settings.api_key,
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def schedule_pickup(self, request: lib.Serializable) -> lib.Deserializable[str]:
        response = lib.request(
            url=f"{self.settings.server_url}/pickups",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="POST",
            headers={},
        )

        return lib.Deserializable(response, lib.to_dict)

    def modify_pickup(self, request: lib.Serializable) -> lib.Deserializable[str]:
        confirmation_number = None
        response = lib.request(
            url=f"{self.settings.server_url}/pickups/{confirmation_number}",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="PATCH",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.settings.authorization}",
                "X-API-KEY": self.settings.api_key,
            },
        )

        return lib.Deserializable(response, lib.to_dict)

    def cancel_pickup(self, request: lib.Serializable) -> lib.Deserializable[str]:
        confirmation_number = None
        response = lib.request(
            url=f"{self.settings.server_url}/pickups/{confirmation_number}",
            data=lib.to_json(request.serialize()),
            trace=self.trace_as("json"),
            method="DELETE",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.settings.authorization}",
                "X-API-KEY": self.settings.api_key,
            },
        )

        return lib.Deserializable(response, lib.to_dict)
