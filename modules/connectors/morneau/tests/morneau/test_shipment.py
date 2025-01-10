import unittest
from unittest.mock import patch

import karrio
import karrio.core.models as models
import karrio.lib as lib

from .fixture import gateway


class TestGroupeMorneauShipping(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        self.ShipmentRequest = models.ShipmentRequest(**ShipmentPayload)
        self.ShipmentCancelRequest = models.ShipmentCancelRequest(**ShipmentCancelPayload)

    def test_create_shipment_request(self):
        request = gateway.mapper.create_shipment_request(self.ShipmentRequest)

        self.assertEqual(request.serialize(), ShipmentRequest)

    def test_create_cancel_shipment_request(self):
        request = gateway.mapper.create_cancel_shipment_request(
            self.ShipmentCancelRequest
        )

        self.assertEqual(request.serialize(), ShipmentCancelRequest)

    def test_create_shipment(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = "{}"
            karrio.Shipment.create(self.ShipmentRequest).from_(gateway)

            self.assertEqual(
                mock.call_args[1]["url"],
                f"{gateway.settings.server_url}/LoadTender/0000005991",
            )

    def test_cancel_shipment(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = "{}"
            karrio.Shipment.cancel(self.ShipmentCancelRequest).from_(gateway)

            self.assertEqual(
                mock.call_args[1]["url"],
                f"{gateway.settings.server_url}/LoadTender/0000005991/794947717776/cancel",
            )

    def test_parse_shipment_response(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = ShipmentResponse
            parsed_response = (
                karrio.Shipment.create(self.ShipmentRequest).from_(gateway).parse()
            )
            self.assertListEqual(lib.to_dict(parsed_response), ParsedShipmentResponse)

    def test_parse_cancel_shipment_response(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = ShipmentCancelResponse
            parsed_response = (
                karrio.Shipment.cancel(self.ShipmentCancelRequest).from_(gateway).parse()
            )

            self.assertListEqual(
                lib.to_dict(parsed_response), ParsedCancelShipmentResponse
            )


if __name__ == "__main__":
    unittest.main()

ShipmentPayload = {
    "service": "Regular",
    "reference": "order #1111",
    "recipient": {
        "person_name": "Morris Moss",
        "company_name": "Morneau",
        "address_line1": "417 Montgomery Street",
        "address_line2": "",
        "city": "San Francisco",
        "state_code": "CA",
        "postal_code": "H1L 4M3",
        "phone_number": "415-528-7555",
        "email": "recipient@gmail.com"
    },
    "shipper": {
        "person_name": "George Costanza",
        "company_name": "Vandelay Industries",
        "address_line1": "1 E 161st St.",
        "address_line2": "",
        "city": "Bronx",
        "state_code": "NY",
        "postal_code": "J8Z 1V8",
        "phone_number": "415-528-7556",
        "email": "shipper@gmail.com"
    },
    "parcels": [{"length": 21.0, "width": 40.0, "height": 26.0, "weight": 110.0, "weight_unit": "LB",
                 "packaging_type": "Pallets", "description": "FAK",
                 "items": [{"title": "RENDEZVOUS"}, {"title": "PCAMLIVR"}, {"title": "HOME"}]
                 }],

}

ShipmentCancelPayload = {
    "shipment_identifier": "794947717776",
}

ParsedShipmentResponse = [
    {
        "carrier_id": "morneau",
        "carrier_name": "morneau",
        'docs': {},
        "label_type": "PDF",
        "meta": {
            "is_accepted": True,
            "status": "New"
        },
        "tracking_number": "A10480018",
        "shipment_identifier": "00108366"
    },
    [],
]

ParsedCancelShipmentResponse = [
    {
        "carrier_id": "morneau",
        "carrier_name": "morneau",
        "operation": "Cancel Shipment",
        "success": True,
    },
    [],
]

ShipmentRequest = {
    "ServiceLevel": "Regular",
    "Stops": {
        "Loads": [
            {
                "Company": {
                    "Name": "Vandelay Industries",
                    "Address": {
                        "Address1": "1 E 161st St.",
                        "Address2": "",
                        "City": "Bronx",
                        "ProvinceCode": "NY",
                        "PostalCode": "J8Z 1V8"
                    },
                    "EmergencyContact": {
                        "FaxNumber": "",
                        "CellPhoneNumber": "",
                        "PhoneNumber": "415-528-7556",
                        "PhoneNumberExtension": "",
                        "ContactName": "George Costanza",
                        "Email": "shipper@gmail.com"
                    },
                    "IsInvoicee": False
                },
                "ExpectedArrivalTimeSlot": {
                },
                "Commodities": []
            }
        ],
        "Unloads": [
            {
                "Number": 1,
                "Company": {
                    "Name": "Morneau",
                    "Address": {
                        "Address1": "417 Montgomery Street",
                        "Address2": "",
                        "PostalCode": "H1L 4M3",
                        "City": "San Francisco",
                        "ProvinceCode": "CA"
                    },
                    "EmergencyContact": {
                        "FaxNumber": "",
                        "CellPhoneNumber": "",
                        "PhoneNumber": "415-528-7555",
                        "PhoneNumberExtension": "",
                        "ContactName": "Morris Moss",
                        "Email": "recipient@gmail.com"

                    },
                    "IsInvoicee": False
                },
                "ExpectedArrivalTimeSlot": {
                },
                "Commodities": [
                    {
                        "Code": "RENDEZVOUS"
                    },
                    {
                        "Code": "PCAMLIVR"
                    },
                    {
                        "Code": "HOME"
                    }
                ],
                "SpecialInstructions": "",
                "FloorPallets": {},

                "Freight": [
                    {
                        "Description": "FAK",
                        "ClassCode": "",
                        "Weight": {
                            "Quantity": 110.0,
                            "Unit": "Pound"
                        },
                        "Unit": "Pallets",
                        "Quantity": 1,
                        "PurchaseOrderNumbers": []
                    }
                ]
            }
        ]
    },
    "Notes": "",
    "ShipmentIdentifier": {
        "Type": "ProBill",
        "Number": "order #1111"
    },
    "References": [
        {
            "Type": "ProBill",
            "Value": "order #1111"
        }
    ],
    "ThirdPartyInvoicee": {},
    "EmergencyContact": {},
    "IsInvoicee": True
}

ShipmentCancelRequest = {'reference': '794947717776'}

ShipmentResponse = """{
  "ShipmentIdentifier": "00108366",
  "LoadTenderConfirmations": [
    {
      "FreightBillNumber": "A10480018",
      "IsAccepted": true,
      "Status": "New",
      "PurchaseOrderNumbers": [],
      "References": [
        {
          "Type": "Consignee",
          "Value": "226675"
        },
        {
          "Type": "Shipper",
          "Value": "284955"
        }
      ]
    }
  ]
}
"""

ShipmentCancelResponse = """{}
"""
