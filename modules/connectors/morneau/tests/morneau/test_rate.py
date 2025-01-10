import unittest
from unittest.mock import patch

import karrio
import karrio.core.models as models
import karrio.lib as lib

from .fixture import gateway


class TestGroupeMorneauRating(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        self.RateRequest = models.RateRequest(**RatePayload)

    def test_create_rate_request(self):
        request = gateway.mapper.create_rate_request(self.RateRequest)

        self.assertEqual(request.serialize(), RateRequest)

    def test_get_rate(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = "{}"
            karrio.Rating.fetch(self.RateRequest).from_(gateway)

            self.assertEqual(
                mock.call_args[1]["url"],
                f"{gateway.settings.rates_server_url}/quotes/add"
            )

    def test_parse_rate_response(self):
        with patch("karrio.mappers.morneau.proxy.lib.request") as mock:
            mock.return_value = RateResponse
            parsed_response = karrio.Rating.fetch(self.RateRequest).from_(gateway).parse()

            self.assertListEqual(lib.to_dict(parsed_response), ParsedRateResponse)


if __name__ == "__main__":
    unittest.main()

RatePayload = {
    "reference": "order #1111",
    "recipient": {
        "company_name": "EasyPost",
        "address_line1": "417 Montgomery Street",
        "address_line2": "5th Floor",
        "city": "San Francisco",
        "state_code": "CA",
        "postal_code": "H1L4M3",
        "phone_number": "415-528-7555",
    },
    "shipper": {
        "person_name": "George Costanza",
        "company_name": "Vandelay Industries",
        "address_line1": "1 E 161st St.",
        "city": "Bronx",
        "state_code": "NY",
        "postal_code": "J8Z1V8",
    },
    "parcels": [{"length": 21.0, "width": 40.0, "height": 26.0, "weight": 110.0, "weight_unit": "LB",
                 "items": [{"title": "RENDEZVOUS"}, {"title": "PCAMLIVR"}, {"title": "HOME"}]
                 }],

}

ParsedRateResponse = [
    [
        {
            "carrier_id": "morneau",
            "carrier_name": "morneau",
            "service": "Regular",
            "total_charge": 225.47,
            "transit_days": 0,
            "currency": "CAD",
        },

    ],
    [],
]

RateRequest = {
    "BillToCodeId": 99999,
    "Division": "Morneau",
    "Quote": {
        "StartZone": "J8Z 1V8",
        "EndZone": "H1L 4M3",
        "UserName": "imprimerie.gauvin",
        "NbPallet": 1,
        "Weight": 110.0,
        "WeightUnit": "LB",
        "Commodities": [
            "RENDEZVOUS",
            "PCAMLIVR",
            "HOME"
        ],
        "Dimensions": [
            {
                "Piece": 1,
                "Length": 21.0,
                "Width": 40.0,
                "Height": 26.0
            }
        ]
    }
}

RateResponse = """{
    "DetailLineId": 12941636,
    "QuoteNumber": "Q830323",
    "ValidFrom": "2023-12-13T00:00:00-05:00",
    "ValidTo": "2024-01-13T00:00:00-05:00",
    "Charges": 72.8,
    "XCharges": 123.3,
    "ProtectedCharges": 0.0,
    "Tps": 9.81,
    "Tvq": 19.56,
    "TotalCharges": 225.47,
    "IsSucessfull": true,
    "AccessorialCharges": {
        "Charges": [
            {
                "Id": "SC",
                "Amount": 23.3,
                "Description": "SURC. CARB./FUEL SURC.      "
            },
            {
                "Id": "RENDEZVOUS",
                "Amount": 50.0,
                "Description": "RENDEZ-VOUS / APPOINTMENT"
            },
            {
                "Id": "HOME",
                "Amount": 50.0,
                "Description": "MAISON PRIVEE / RESIDENTIAL P/U OR DELIV"
            }
        ],
        "TotalAmount": 123.3
    },
    "EndZone": "H1L 4M3",
    "EndCity": null,
    "StartZone": "J8Z 1V8",
    "StartCity": null,
    "NbPallet": 1,
    "NbPalletPlancher": 0,
    "NbPieces": 0,
    "PiecesUnit": 0,
    "WeightUnit": 0,
    "RawWeightUnit": "0",
    "RawPiecesUnit": "PCS",
    "Weight": 110.0,
    "BillToCode": "0000005461",
    "UserName": "IMPRIMERIE.GAUVIN",
    "Commodities": [
        "DESC",
        "RENDEZVOUS",
        "PCAMLIVR",
        "HOME"
    ],
    "Dimensions": []
}
"""
