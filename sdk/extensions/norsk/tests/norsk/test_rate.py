
import unittest
from unittest.mock import patch, ANY
from .fixture import gateway

import karrio
import karrio.lib as lib
import karrio.core.models as models


class TestNorskGlobalRating(unittest.TestCase):
    def setUp(self):
        self.maxDiff = None
        self.RateRequest = models.RateRequest(**RatePayload)

    def test_create_rate_request(self):
        request = gateway.mapper.create_rate_request(self.RateRequest)

        self.assertEqual(request.serialize(), RateRequest)

    def test_get_rate(self):
        with patch("karrio.mappers.norsk.proxy.lib.request") as mock:
            mock.return_value = "<a></a>"
            karrio.Rating.fetch(self.RateRequest).from_(gateway)

            self.assertEqual(
                mock.call_args[1]["url"],
                f"{gateway.settings.server_url}",
            )

    def test_parse_rate_response(self):
        with patch("karrio.mappers.norsk.proxy.lib.request") as mock:
            mock.return_value = RateResponse
            parsed_response = karrio.Rating.fetch(self.RateRequest).from_(gateway).parse()

            self.assertListEqual(lib.to_dict(parsed_response), ParsedRateResponse)


if __name__ == "__main__":
    unittest.main()


RatePayload = {}

ParsedRateResponse = []


RateRequest = """<a></a>
"""

RateResponse = """<a></a>
"""
