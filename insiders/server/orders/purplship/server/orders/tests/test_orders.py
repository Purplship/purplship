import json
from typing import Tuple
from unittest.mock import ANY, patch
from django.http.response import HttpResponse
from django.urls import reverse
from rest_framework import status
from purplship.core.models import (
    RateDetails,
    ChargeDetails,
)
from purplship.server.core.tests import APITestCase
import purplship.server.orders.models as models


class TestOrderFixture(APITestCase):
    def setUp(self) -> None:
        super().setUp()

        self.carrier.test = False
        self.carrier.save()

    def create_order(self) -> Tuple[HttpResponse, dict]:
        url = reverse("purplship.server.orders:order-list")
        data = ORDER_DATA

        response = self.client.post(url, data)
        response_data = json.loads(response.content)

        return response, response_data


class TestOrders(TestOrderFixture):
    def test_create_order(self):
        response, response_data = self.create_order()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertDictEqual(response_data, ORDER_RESPONSE)


class TestOrderDetails(TestOrderFixture):
    def test_retrieve_order(self):
        _, data = self.create_order()
        url = reverse(
            "purplship.server.orders:order-detail", kwargs=dict(pk=data["id"])
        )
        response = self.client.get(url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response_data, ORDER_RESPONSE)

    def test_cancel_order(self):
        _, order = self.create_order()
        url = reverse(
            "purplship.server.orders:order-detail", kwargs=dict(pk=order["id"])
        )
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(models.Order.objects.get(pk=order["id"]).status == "cancelled")

    def test_cannot_cancel_fulfilled_order(self):
        _, data = self.create_order()
        order = models.Order.objects.get(pk=data["id"])
        order.status = "fulfilled"
        order.save()

        url = reverse(
            "purplship.server.orders:order-detail", kwargs=dict(pk=data["id"])
        )
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    def test_cannot_cancel_delivered_order(self):
        _, data = self.create_order()
        order = models.Order.objects.get(pk=data["id"])
        order.status = "delivered"
        order.save()

        url = reverse(
            "purplship.server.orders:order-detail", kwargs=dict(pk=data["id"])
        )
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)


class TestOrderShipments(TestOrderFixture):
    def test_add_shipment(self):
        _, order = self.create_order()

        url = reverse(
            "purplship.server.orders:order-shipments", kwargs=dict(pk=order["id"])
        )
        data = SHIPMENT_DATA
        data["parcels"][0]["items"][0]["parent_id"] = order["line_items"][0]["id"]

        with patch("purplship.server.core.gateway.identity") as mock:
            mock.return_value = RETURNED_RATES_VALUE
            response = self.client.post(url, data)
            response_data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertDictEqual(response_data, ORDER_SHIPMENTS_RESPONSE)

    def test_fulfilled_order_when_all_items_are_shipped(self):
        _, order = self.create_order()

        url = reverse(
            "purplship.server.orders:order-shipments", kwargs=dict(pk=order["id"])
        )
        data = {
            **SHIPMENT_DATA,
            "parcels": [
                {
                    **SHIPMENT_DATA["parcels"][0],
                    "items": [
                        {
                            **SHIPMENT_DATA["parcels"][0]["items"][0],
                            "parent_id": order["line_items"][0]["id"],
                        },
                        {
                            "parent_id": order["line_items"][1]["id"],
                            "weight": 1.7,
                            "weight_unit": "KG",
                            "description": "Red Leather Coat",
                            "quantity": 1,
                            "sku": None,
                            "value_amount": 129.99,
                            "value_currency": "USD",
                            "references": {"id": 1071823172},
                        },
                    ],
                }
            ],
        }

        with patch("purplship.server.core.gateway.identity") as mock:
            mock.return_value = RETURNED_RATES_VALUE
            response = self.client.post(url, data)
            response_data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertDictEqual(response_data, FULFILLED_ORDER_RESPONSE)

    def test_add_unrelated_shipment(self):
        _, order = self.create_order()

        url = reverse(
            "purplship.server.orders:order-shipments", kwargs=dict(pk=order["id"])
        )
        data = SHIPMENT_DATA
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_reject_add_shipment_on_fulfilled_order(self):
        _, data = self.create_order()
        order = models.Order.objects.get(pk=data["id"])
        order.status = "fulfilled"
        order.save()

        url = reverse(
            "purplship.server.orders:order-shipments", kwargs=dict(pk=order.id)
        )
        response = self.client.post(url, SHIPMENT_DATA)

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)


ORDER_DATA = {
    "order_id": "1073459962",
    "source": "shopify",
    "shipping_address": {
        "postal_code": "E1C4Z8",
        "city": "Moncton",
        "person_name": "John Doe",
        "company_name": "A corp.",
        "country_code": "CA",
        "phone_number": "+1 514-000-0000",
        "state_code": "NB",
        "address_line1": "125 Church St",
    },
    "line_items": [
        {
            "weight": 1.7,
            "weight_unit": "KG",
            "description": "Red Leather Coat",
            "quantity": 1,
            "sku": None,
            "value_amount": 129.99,
            "value_currency": "USD",
            "references": {"id": 1071823172},
        },
        {
            "weight": 0.75,
            "weight_unit": "KG",
            "description": "Blue Suede Shoes",
            "quantity": 1,
            "sku": None,
            "value_amount": 85.95,
            "value_currency": "USD",
            "references": {"id": 1071823173},
        },
    ],
}

ORDER_RESPONSE = {
    "id": ANY,
    "order_id": "1073459962",
    "source": "shopify",
    "status": "created",
    "shipping_address": {
        "id": ANY,
        "postal_code": "E1C4Z8",
        "city": "Moncton",
        "federal_tax_id": None,
        "state_tax_id": None,
        "person_name": "John Doe",
        "company_name": "A corp.",
        "country_code": "CA",
        "email": None,
        "phone_number": "+1 514-000-0000",
        "state_code": "NB",
        "suburb": None,
        "residential": False,
        "address_line1": "125 Church St",
        "address_line2": None,
        "validate_location": False,
        "validation": None,
    },
    "line_items": [
        {
            "id": ANY,
            "weight": 0.75,
            "weight_unit": "KG",
            "description": "Blue Suede Shoes",
            "quantity": 1,
            "sku": None,
            "value_amount": 85.95,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823173},
        },
        {
            "id": ANY,
            "weight": 1.7,
            "weight_unit": "KG",
            "description": "Red Leather Coat",
            "quantity": 1,
            "sku": None,
            "value_amount": 129.99,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823172},
        },
    ],
    "options": {},
    "shipments": [],
    "test_mode": False,
    "created_at": ANY,
}

RETURNED_RATES_VALUE = (
    [
        RateDetails(
            carrier_id="canadapost",
            carrier_name="canadapost",
            currency="CAD",
            transit_days=2,
            service="canadapost_priority",
            discount=-9.04,
            base_charge=101.83,
            total_charge=106.71,
            duties_and_taxes=13.92,
            extra_charges=[
                ChargeDetails(amount=2.7, currency="CAD", name="Fuel surcharge"),
                ChargeDetails(amount=-11.74, currency="CAD", name="SMB Savings"),
            ],
        )
    ],
    [],
)

SHIPMENT_DATA = {
    "shipper": {
        "postal_code": "V6M2V9",
        "city": "Vancouver",
        "person_name": "Jane Doe",
        "company_name": "B corp.",
        "country_code": "CA",
        "phone_number": "+1 514-000-0000",
        "state_code": "BC",
        "residential": True,
        "address_line1": "5840 Oak St",
    },
    "parcels": [
        {
            "weight": 2,
            "width": 46,
            "height": 38,
            "length": 32,
            "package_preset": "canadapost_corrugated_medium_box",
            "is_document": False,
            "weight_unit": "KG",
            "dimension_unit": "CM",
            "items": [
                {
                    "weight": 0.75,
                    "weight_unit": "KG",
                    "description": "Blue Suede Shoes",
                    "quantity": 1,
                    "value_amount": 85.95,
                    "value_currency": "USD",
                    "references": {"id": 1071823173},
                }
            ],
        }
    ],
    "options": {"currency": "CAD"},
    "carrier_ids": ["canadapost"],
}

ORDER_SHIPMENTS_RESPONSE = {
    "id": ANY,
    "order_id": "1073459962",
    "source": "shopify",
    "status": "partially_fulfilled",
    "shipping_address": {
        "id": ANY,
        "postal_code": "E1C4Z8",
        "city": "Moncton",
        "federal_tax_id": None,
        "state_tax_id": None,
        "person_name": "John Doe",
        "company_name": "A corp.",
        "country_code": "CA",
        "email": None,
        "phone_number": "+1 514-000-0000",
        "state_code": "NB",
        "suburb": None,
        "residential": False,
        "address_line1": "125 Church St",
        "address_line2": None,
        "validate_location": False,
        "validation": None,
    },
    "line_items": [
        {
            "id": ANY,
            "weight": 0.75,
            "weight_unit": "KG",
            "description": "Blue Suede Shoes",
            "quantity": 1,
            "sku": None,
            "value_amount": 85.95,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823173},
        },
        {
            "id": ANY,
            "weight": 1.7,
            "weight_unit": "KG",
            "description": "Red Leather Coat",
            "quantity": 1,
            "sku": None,
            "value_amount": 129.99,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823172},
        },
    ],
    "options": {},
    "shipments": [
        {
            "id": ANY,
            "status": "created",
            "carrier_name": None,
            "carrier_id": None,
            "label": None,
            "tracking_number": None,
            "shipment_identifier": None,
            "selected_rate": None,
            "selected_rate_id": None,
            "rates": [
                {
                    "id": ANY,
                    "carrier_name": "canadapost",
                    "carrier_id": "canadapost",
                    "currency": "CAD",
                    "service": "canadapost_priority",
                    "discount": -9.04,
                    "base_charge": 101.83,
                    "total_charge": 106.71,
                    "duties_and_taxes": 13.92,
                    "transit_days": 2,
                    "extra_charges": [
                        {"name": "Fuel surcharge", "amount": 2.7, "currency": "CAD"},
                        {"name": "SMB Savings", "amount": -11.74, "currency": "CAD"},
                    ],
                    "meta": {
                        "service_name": "CANADAPOST PRIORITY",
                        "rate_provider": "canadapost",
                    },
                    "carrier_ref": ANY,
                    "test_mode": False,
                }
            ],
            "tracking_url": None,
            "service": None,
            "shipper": {
                "id": ANY,
                "postal_code": "V6M2V9",
                "city": "Vancouver",
                "federal_tax_id": None,
                "state_tax_id": None,
                "person_name": "Jane Doe",
                "company_name": "B corp.",
                "country_code": "CA",
                "email": None,
                "phone_number": "+1 514-000-0000",
                "state_code": "BC",
                "suburb": None,
                "residential": True,
                "address_line1": "5840 Oak St",
                "address_line2": None,
                "validate_location": False,
                "validation": None,
            },
            "recipient": {
                "id": ANY,
                "postal_code": "E1C4Z8",
                "city": "Moncton",
                "federal_tax_id": None,
                "state_tax_id": None,
                "person_name": "John Doe",
                "company_name": "A corp.",
                "country_code": "CA",
                "email": None,
                "phone_number": "+1 514-000-0000",
                "state_code": "NB",
                "suburb": None,
                "residential": False,
                "address_line1": "125 Church St",
                "address_line2": None,
                "validate_location": False,
                "validation": None,
            },
            "parcels": [
                {
                    "id": ANY,
                    "weight": 2.0,
                    "width": 46.0,
                    "height": 38.0,
                    "length": 32.0,
                    "packaging_type": None,
                    "package_preset": "canadapost_corrugated_medium_box",
                    "description": None,
                    "content": None,
                    "is_document": False,
                    "weight_unit": "KG",
                    "dimension_unit": "CM",
                    "items": [
                        {
                            "id": ANY,
                            "weight": 0.75,
                            "weight_unit": "KG",
                            "description": "Blue Suede Shoes",
                            "quantity": 1,
                            "sku": None,
                            "value_amount": 85.95,
                            "value_currency": "USD",
                            "origin_country": None,
                            "parent_id": ANY,
                            "references": {"id": 1071823173},
                        }
                    ],
                }
            ],
            "services": [],
            "options": {"currency": "CAD"},
            "payment": {"paid_by": "sender", "currency": None, "account_number": None},
            "customs": None,
            "reference": None,
            "label_type": "PDF",
            "carrier_ids": ["canadapost"],
            "tracker_id": None,
            "created_at": ANY,
            "test_mode": False,
            "meta": {},
            "messages": [],
        }
    ],
    "test_mode": False,
    "created_at": ANY,
}

FULFILLED_ORDER_RESPONSE = {
    "id": ANY,
    "order_id": "1073459962",
    "source": "shopify",
    "status": "fulfilled",
    "shipping_address": {
        "id": ANY,
        "postal_code": "E1C4Z8",
        "city": "Moncton",
        "federal_tax_id": None,
        "state_tax_id": None,
        "person_name": "John Doe",
        "company_name": "A corp.",
        "country_code": "CA",
        "email": None,
        "phone_number": "+1 514-000-0000",
        "state_code": "NB",
        "suburb": None,
        "residential": False,
        "address_line1": "125 Church St",
        "address_line2": None,
        "validate_location": False,
        "validation": None,
    },
    "line_items": [
        {
            "id": ANY,
            "weight": 0.75,
            "weight_unit": "KG",
            "description": "Blue Suede Shoes",
            "quantity": 1,
            "sku": None,
            "value_amount": 85.95,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823173},
        },
        {
            "id": ANY,
            "weight": 1.7,
            "weight_unit": "KG",
            "description": "Red Leather Coat",
            "quantity": 1,
            "sku": None,
            "value_amount": 129.99,
            "value_currency": "USD",
            "origin_country": None,
            "parent_id": None,
            "references": {"id": 1071823172},
        },
    ],
    "options": {},
    "shipments": [
        {
            "id": ANY,
            "status": "created",
            "carrier_name": None,
            "carrier_id": None,
            "label": None,
            "tracking_number": None,
            "shipment_identifier": None,
            "selected_rate": None,
            "selected_rate_id": None,
            "rates": [
                {
                    "id": ANY,
                    "carrier_name": "canadapost",
                    "carrier_id": "canadapost",
                    "currency": "CAD",
                    "service": "canadapost_priority",
                    "discount": -9.04,
                    "base_charge": 101.83,
                    "total_charge": 106.71,
                    "duties_and_taxes": 13.92,
                    "transit_days": 2,
                    "extra_charges": [
                        {"name": "Fuel surcharge", "amount": 2.7, "currency": "CAD"},
                        {"name": "SMB Savings", "amount": -11.74, "currency": "CAD"},
                    ],
                    "meta": {
                        "service_name": "CANADAPOST PRIORITY",
                        "rate_provider": "canadapost",
                    },
                    "carrier_ref": ANY,
                    "test_mode": False,
                }
            ],
            "tracking_url": None,
            "service": None,
            "shipper": {
                "id": ANY,
                "postal_code": "V6M2V9",
                "city": "Vancouver",
                "federal_tax_id": None,
                "state_tax_id": None,
                "person_name": "Jane Doe",
                "company_name": "B corp.",
                "country_code": "CA",
                "email": None,
                "phone_number": "+1 514-000-0000",
                "state_code": "BC",
                "suburb": None,
                "residential": True,
                "address_line1": "5840 Oak St",
                "address_line2": None,
                "validate_location": False,
                "validation": None,
            },
            "recipient": {
                "id": ANY,
                "postal_code": "E1C4Z8",
                "city": "Moncton",
                "federal_tax_id": None,
                "state_tax_id": None,
                "person_name": "John Doe",
                "company_name": "A corp.",
                "country_code": "CA",
                "email": None,
                "phone_number": "+1 514-000-0000",
                "state_code": "NB",
                "suburb": None,
                "residential": False,
                "address_line1": "125 Church St",
                "address_line2": None,
                "validate_location": False,
                "validation": None,
            },
            "parcels": [
                {
                    "id": ANY,
                    "weight": 2.0,
                    "width": 46.0,
                    "height": 38.0,
                    "length": 32.0,
                    "packaging_type": None,
                    "package_preset": "canadapost_corrugated_medium_box",
                    "description": None,
                    "content": None,
                    "is_document": False,
                    "weight_unit": "KG",
                    "dimension_unit": "CM",
                    "items": [
                        {
                            "id": ANY,
                            "weight": 1.7,
                            "weight_unit": "KG",
                            "description": "Red Leather Coat",
                            "quantity": 1,
                            "sku": None,
                            "value_amount": 129.99,
                            "value_currency": "USD",
                            "origin_country": None,
                            "parent_id": ANY,
                            "references": {"id": 1071823172},
                        },
                        {
                            "id": ANY,
                            "weight": 0.75,
                            "weight_unit": "KG",
                            "description": "Blue Suede Shoes",
                            "quantity": 1,
                            "sku": None,
                            "value_amount": 85.95,
                            "value_currency": "USD",
                            "origin_country": None,
                            "parent_id": ANY,
                            "references": {"id": 1071823173},
                        },
                    ],
                }
            ],
            "services": [],
            "options": {"currency": "CAD"},
            "payment": {"paid_by": "sender", "currency": None, "account_number": None},
            "customs": None,
            "reference": None,
            "label_type": "PDF",
            "carrier_ids": ["canadapost"],
            "tracker_id": None,
            "created_at": ANY,
            "test_mode": False,
            "meta": {},
            "messages": [],
        }
    ],
    "test_mode": False,
    "created_at": ANY,
}
