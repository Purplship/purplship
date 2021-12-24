import logging

from django.urls import path
from purplship.server import serializers
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.request import Request
from drf_yasg.utils import swagger_auto_schema

from purplship.server.serializers import SerializerDecorator, PaginatedResult
from purplship.server.core.views.api import GenericAPIView
from purplship.server.core.gateway import Carriers
from purplship.server.core.serializers import (
    CarrierSettings,
    ErrorResponse,
    FlagField,
    FlagsSerializer,
    CARRIERS,
)
from purplship.server.providers.router import router

logger = logging.getLogger(__name__)
ENDPOINT_ID = "&&"  # This endpoint id is used to make operation ids unique make sure not to duplicate
CarriersSettingsList = PaginatedResult("CarrierList", CarrierSettings)


class CarrierFilters(FlagsSerializer):

    carrier_name = serializers.ChoiceField(
        choices=CARRIERS, required=False, help_text="Indicates a carrier (type)"
    )
    test = FlagField(
        required=False,
        allow_null=True,
        default=None,
        help_text="This flag filter out carriers in test or live mode",
    )
    active = FlagField(
        required=False,
        allow_null=True,
        default=None,
        help_text="This flag indicates whether to return active carriers only",
    )
    system_only = FlagField(
        required=False,
        allow_null=True,
        default=False,
        help_text="This flag indicates that only system carriers should be returned",
    )


class CarrierList(GenericAPIView):
    pagination_class = LimitOffsetPagination
    default_limit = 100

    @swagger_auto_schema(
        tags=["Carriers"],
        operation_id=f"{ENDPOINT_ID}list",
        operation_summary="List all carriers",
        responses={200: CarriersSettingsList(), 400: ErrorResponse()},
        query_serializer=CarrierFilters,
        code_examples=[
            {
                "lang": "bash",
                "source": """
                curl --request GET \\
                  --url '/v1/carriers' \\
                  --header 'Authorization: Token <API_KEY>'
                """,
            }
        ],
    )
    def get(self, request: Request):
        """
        Returns the list of configured carriers
        """
        query = SerializerDecorator[CarrierFilters](data=request.query_params).data

        carriers = [
            carrier.data for carrier in Carriers.list(**{**query, "context": request})
        ]
        response = self.paginate_queryset(CarrierSettings(carriers, many=True).data)
        return self.get_paginated_response(response)


router.urls.append(path("carriers", CarrierList.as_view()))
