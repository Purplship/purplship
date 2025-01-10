import unittest
from unittest.mock import patch

import karrio
import karrio.core.models as models
import karrio.lib as lib

from .fixture import gateway


class TestGroupeMorneauTracking(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        self.TrackingRequest = models.TrackingRequest(**TrackingPayload)

    def test_create_tracking_request(self):
        request = gateway.mapper.create_tracking_request(self.TrackingRequest)
        self.assertEqual(request.serialize(), TrackingRequest)

    def test_get_tracking(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = "{}"
            karrio.Tracking.fetch(self.TrackingRequest).from_(gateway)

            self.assertEqual(
                mock.call_args[1]["url"],
                f"{gateway.settings.tracking_url}/api/v1/tracking/en/MORNEAU/89108749065090",
            )

    def test_parse_tracking_response(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = TrackingResponse
            parsed_response = (
                karrio.Tracking.fetch(self.TrackingRequest).from_(gateway).parse()
            )

            self.assertListEqual(
                lib.to_dict(parsed_response), ParsedTrackingResponse
            )

    def test_parse_error_response(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = ErrorResponse
            parsed_response = (
                karrio.Tracking.fetch(self.TrackingRequest).from_(gateway).parse()
            )

            self.assertListEqual(
                lib.to_dict(parsed_response), ParsedErrorResponse
            )


if __name__ == "__main__":
    unittest.main()

TrackingPayload = {
    "tracking_numbers": ["89108749065090"],
}

ParsedTrackingResponse = [
    [
        {
            "carrier_id": "morneau",
            "carrier_name": "morneau",
            "tracking_number": "89108749065090",
            "events": [
                {
                    "date": "2021-03-09",
                    "description": "PICK UP DISPONIBLE / AVAILABLE",
                    "code": "AVAIL",
                    "location": "SEPT ILES, QC",
                    "time": "13:11",
                },
                {
                    "date": "2021-07-09",
                    "description": "RAMASSE / PICKED UP",
                    "code": "PICKD",
                    "location": "TERMINAL SEPT ILES",
                    "time": "08:48",
                },
            ],
            "estimated_delivery": "not available",
            "delivered": False,
        }
    ],
    [],
]

ParsedErrorResponse = [
    [],
    [
        {
            "carrier_id": "morneau",
            "carrier_name": "morneau",
            "code": "OrderTracking_BadRequest",
            "details": {"tracking_number": "89108749065090"},
            "message": "failed",
        }
    ],
]

TrackingRequest = ["89108749065090"]

TrackingResponse = """ {
      "OrderTracking": {
        "BillId": "89108749065090",
        "CreatedBy": "YLEMAY",
        "CreatedOn": "2024-01-08T12:41:34.766218-05:00",
        "Caller": {
          "Name": "Caller company name",
          "Street": "1 AVENUE DES CANADIENS DE MONTREAL",
          "City": "MONTREAL",
          "Province": "QC",
          "PostalCode": "G1Q 1Q9"
        },
        "Shipper": {
          "Name": "Shipper company name",
          "Street": "1 CHEMIN DE LA POINTE NOIRE",
          "City": "SEPT ILES",
          "Province": "QC",
          "PostalCode": "G1Q 1Q9"
        },
        "Receiver": {
          "Name": "Receiver company name",
          "Street": "1 ALLOY COURT",
          "City": "NORTH YORK",
          "Province": "ON",
          "PostalCode": "G1Q 1Q9"
        },
        "History": [
          {
            "DateTime": "2021-03-09T13:11:36",
            "Status": "PICK UP DISPONIBLE / AVAILABLE",
            "Zone": "SEPT ILES, QC",
            "ZoneId": "G1Q 1Q9",
            "StatusCode": "AVAIL",
            "Ordinal": 1,
            "IsTerminal": false,
            "TerminalAddress": "",
            "StatusReasonCode": null,
            "StatusDescription": null,
            "DeliveryTerminalZone": null,
            "IsFinalDeliveryStatus": false
          },
          {
            "DateTime": "2021-07-09T08:48:49",
            "Status": "RAMASSE / PICKED UP",
            "Zone": "TERMINAL SEPT ILES",
            "ZoneId": "TERMSEPTIL",
            "StatusCode": "PICKD",
            "Ordinal": 3,
            "IsTerminal": true,
            "TerminalAddress": "1913 GAGNON,SEPT ILES,QC,G4R 1A1",
            "StatusReasonCode": null,
            "StatusDescription": null,
            "DeliveryTerminalZone": null,
            "IsFinalDeliveryStatus": false
          }
        ],
        "HistoryTerminals": [
          {
            "Sequence": 2,
            "Zone": "TERMSEPTIL",
            "ZoneId": "TERMSEPTIL",
            "TerminalAddress": "1913 GAGNON,SEPT ILES,QC,G4R 1A1",
            "IsTermSwitch": false
          },
          {
            "Sequence": 3,
            "Zone": "TERMINAL MONTREAL",
            "ZoneId": "TERMMTL",
            "TerminalAddress": "9601 BOUL DES SCIENCES,ANJOU,QC,H1J 0A6",
            "IsTermSwitch": true
          },
          {
            "Sequence": 4,
            "Zone": "TERMMTL",
            "ZoneId": "TERMMTL",
            "TerminalAddress": "9601 BOUL DES SCIENCES,ANJOU,QC,H1J 0A6",
            "IsTermSwitch": false
          },
          {
            "Sequence": 5,
            "Zone": "TERMTORONT",
            "ZoneId": "TERMTORONT",
            "TerminalAddress": "1115 BOULEVARD CARDIFF,MISSIISSAUGA,ON,L3S 1L8",
            "IsTermSwitch": false
          }
        ],
        "VehicleCoordinates": {
          "VehicleCode": "T724",
          "Longitude": "-73.556214968363449",
          "Latitude": "45.624939982096357"
        },
        "HasDangerousMaterials": "False",
        "TripCompleted": false
      },
      "Message": {
        "Code": "TrackingSuccess",
        "Message": "Tracage de la facture no A9292396",
        "HttpStatusCode": 200,
        "ErrorMessage": null
      }
    }
"""

ErrorResponse = """{
"Message": {
"Code": "OrderTracking_BadRequest",
"HttpStatusCode": 400,
"ErrorMessage": "failed"
}
}
"""
