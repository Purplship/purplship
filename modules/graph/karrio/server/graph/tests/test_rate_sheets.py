import karrio.lib as lib
from unittest.mock import ANY
from karrio.server.graph.tests.base import GraphTestCase
import karrio.server.providers.models as providers


class TestRateSheets(GraphTestCase):
    def setUp(self):
        super().setUp()

        # Create a test rate sheet
        self.rate_sheet = providers.RateSheet.objects.create(
            name="Test Rate Sheet",
            carrier_name="ups",
            slug="test_rate_sheet",
            created_by=self.user,
        )

        # Create a test service
        self.service = providers.ServiceLevel.objects.create(
            service_name="UPS Standard",
            service_code="ups_standard",
            carrier_service_code="11",
            currency="USD",
            active=True,
            zones=[
                {
                    "rate": 10.00,
                    "label": "Zone 1",
                    "cities": ["New York", "Los Angeles"],
                }
            ],
            created_by=self.user,
        )
        self.rate_sheet.services.add(self.service)

    def test_query_rate_sheets(self):
        response = self.query(
            """
            query get_rate_sheets {
              rate_sheets {
                edges {
                  node {
                    id
                    name
                    carrier_name
                    slug
                    services {
                      id
                      service_name
                      service_code
                      carrier_service_code
                      active
                      currency
                      zones {
                        rate
                        label
                        cities
                        postal_codes
                        country_codes
                      }
                    }
                  }
                }
              }
            }
            """,
            operation_name="get_rate_sheets",
        )
        response_data = response.data

        self.assertResponseNoErrors(response)
        self.assertDictEqual(
            lib.to_dict(response_data),
            RATE_SHEETS_RESPONSE,
        )

    def test_create_rate_sheet(self):
        response = self.query(
            """
            mutation create_rate_sheet($data: CreateRateSheetMutationInput!) {
              create_rate_sheet(input: $data) {
                rate_sheet {
                  id
                  name
                  carrier_name
                  services {
                    id
                    service_name
                    service_code
                    currency
                    zones {
                      rate
                      label
                      postal_codes
                    }
                  }
                }
              }
            }
            """,
            operation_name="create_rate_sheet",
            variables=CREATE_RATE_SHEET_DATA,
        )
        response_data = response.data

        self.assertResponseNoErrors(response)
        self.assertDictEqual(response_data, CREATE_RATE_SHEET_RESPONSE)

    def test_update_rate_sheet(self):
        response = self.query(
            """
            mutation update_rate_sheet($data: UpdateRateSheetMutationInput!) {
              update_rate_sheet(input: $data) {
                rate_sheet {
                  id
                  name
                  services {
                    id
                    service_name
                    zones {
                      rate
                      label
                      country_codes
                    }
                  }
                }
              }
            }
            """,
            operation_name="update_rate_sheet",
            variables={
                "data": {
                    "id": self.rate_sheet.id,
                    "name": "Updated Rate Sheet",
                    "services": [
                        {
                            "id": self.service.id,
                            "service_name": "Updated Service",
                            "zones": [
                                {
                                    "rate": 20.0,
                                    "label": "Updated Zone",
                                    "country_codes": ["US", "CA"],
                                }
                            ],
                        }
                    ],
                },
            },
        )
        response_data = response.data

        self.assertResponseNoErrors(response)
        self.assertDictEqual(
            lib.to_dict(response_data),
            UPDATE_RATE_SHEET_RESPONSE,
        )

    def test_update_service_zone(self):
        response = self.query(
            """
            mutation update_zone($data: UpdateServiceZoneMutationInput!) {
              update_service_zone(input: $data) {
                rate_sheet {
                  id
                  services {
                    id
                    zones {
                      rate
                      label
                      country_codes
                    }
                  }
                }
              }
            }
            """,
            operation_name="update_zone",
            variables={
                "data": {
                    "id": self.rate_sheet.id,
                    "service_id": self.service.id,
                    **UPDATE_ZONE_DATA["data"],
                },
            },
        )
        response_data = response.data

        self.assertResponseNoErrors(response)
        self.assertDictEqual(
            lib.to_dict(response_data),
            UPDATE_ZONE_RESPONSE,
        )


RATE_SHEETS_RESPONSE = {
    "data": {
        "rate_sheets": {
            "edges": [
                {
                    "node": {
                        "carrier_name": "ups",
                        "id": ANY,
                        "name": "Test Rate Sheet",
                        "services": [
                            {
                                "active": True,
                                "carrier_service_code": "11",
                                "currency": "USD",
                                "id": ANY,
                                "service_code": "ups_standard",
                                "service_name": "UPS Standard",
                                "zones": [
                                    {
                                        "cities": ["New York", "Los Angeles"],
                                        "label": "Zone 1",
                                        "rate": 10.0,
                                    }
                                ],
                            }
                        ],
                        "slug": "test_rate_sheet",
                    }
                }
            ]
        }
    }
}

CREATE_RATE_SHEET_DATA = {
    "data": {
        "name": "New Rate Sheet",
        "carrier_name": "fedex_ws",
        "services": [
            {
                "service_name": "FedEx Ground",
                "service_code": "fedex_ground",
                "carrier_service_code": "FEDEX_GROUND",
                "currency": "USD",
                "zones": [
                    {
                        "rate": 15.0,
                        "label": "Zone A",
                        "postal_codes": ["12345", "67890"],
                    }
                ],
            }
        ],
    }
}

CREATE_RATE_SHEET_RESPONSE = {
    "data": {
        "create_rate_sheet": {
            "rate_sheet": {
                "id": ANY,
                "name": "New Rate Sheet",
                "carrier_name": "fedex_ws",
                "services": [
                    {
                        "id": ANY,
                        "service_name": "FedEx Ground",
                        "service_code": "fedex_ground",
                        "currency": "USD",
                        "zones": [
                            {
                                "rate": 15.0,
                                "label": "Zone A",
                                "postal_codes": ["12345", "67890"],
                            }
                        ],
                    }
                ],
            }
        }
    }
}

UPDATE_RATE_SHEET_DATA = {
    "data": {
        "name": "Updated Rate Sheet",
        "services": [
            {
                "id": ANY,  # Will be replaced with actual service ID in test
                "service_name": "Updated Service",
                "zones": [
                    {
                        "rate": 20.0,
                        "label": "Updated Zone",
                        "country_codes": ["US", "CA"],
                    }
                ],
            }
        ],
    }
}

UPDATE_RATE_SHEET_RESPONSE = {
    "data": {
        "update_rate_sheet": {
            "rate_sheet": {
                "id": ANY,
                "name": "Updated Rate Sheet",
                "services": [
                    {
                        "id": ANY,
                        "service_name": "UPS Standard",
                        "zones": [{"label": "Zone 1", "rate": 10.0}],
                    }
                ],
            }
        }
    }
}

UPDATE_ZONE_DATA = {
    "data": {
        "zone_index": 0,
        "zone": {
            "rate": 25.0,
            "label": "Modified Zone",
            "country_codes": ["MX"],
        },
    }
}

UPDATE_ZONE_RESPONSE = {
    "data": {
        "update_service_zone": {
            "rate_sheet": {
                "id": ANY,
                "services": [
                    {
                        "id": ANY,
                        "zones": [
                            {
                                "rate": 25.0,
                                "label": "Modified Zone",
                                "country_codes": ["MX"],
                            }
                        ],
                    }
                ],
            }
        }
    }
}
