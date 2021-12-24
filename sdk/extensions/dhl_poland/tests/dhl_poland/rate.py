import unittest
from unittest.mock import patch
import purplship
from purplship.core.utils import DP
from purplship.core.models import RateRequest
from tests.dhl_poland.fixture import gateway


class TestDHLPolandRating(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        self.RateRequest = RateRequest(**rate_request_data)

    def test_parse_rate_response(self):
        parsed_response = (
            purplship.Rating.fetch(self.RateRequest).from_(gateway).parse()
        )

        self.assertListEqual(DP.to_dict(parsed_response), ParsedRateResponse)


if __name__ == "__main__":
    unittest.main()


rate_request_data = {
    "shipper": {"postal_code": "00909", "country_code": "PL"},
    "recipient": {"postal_code": "00001", "country_code": "PL"},
    "parcels": [
        {
            "height": 3.0,
            "length": 5.0,
            "width": 3.0,
            "weight": 4.0,
            "dimension_unit": "IN",
            "weight_unit": "LB",
        }
    ],
    "services": [],
}


ParsedRateResponse = [
    [
        {
            "base_charge": 0.0,
            "carrier_id": "dhl_poland",
            "carrier_name": "dhl_poland",
            "currency": "USD",
            "meta": {"service_name": "DHL Poland Premium"},
            "service": "dhl_poland_premium",
            "total_charge": 0.0,
        },
        {
            "base_charge": 0.0,
            "carrier_id": "dhl_poland",
            "carrier_name": "dhl_poland",
            "currency": "USD",
            "meta": {"service_name": "DHL Poland Polska"},
            "service": "dhl_poland_polska",
            "total_charge": 0.0,
        },
        {
            "base_charge": 0.0,
            "carrier_id": "dhl_poland",
            "carrier_name": "dhl_poland",
            "currency": "USD",
            "meta": {"service_name": "DHL Poland 09"},
            "service": "dhl_poland_09",
            "total_charge": 0.0,
        },
        {
            "base_charge": 0.0,
            "carrier_id": "dhl_poland",
            "carrier_name": "dhl_poland",
            "currency": "USD",
            "meta": {"service_name": "DHL Poland 12"},
            "service": "dhl_poland_12",
            "total_charge": 0.0,
        },
    ],
    [],
]
