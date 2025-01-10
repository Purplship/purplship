import typing
import urllib.error

import karrio.core.models as models
import karrio.lib as lib
import karrio.providers.morneau.utils as provider_utils
from karrio.core.utils import DP
from karrio.schemas.morneau.error import ErrorType
from karrio.schemas.morneau.error_cancel_shipment import ErrorCancelShipmentType
from karrio.schemas.morneau.error_tracking import ErrorTrackingType


def parse_error_response(
    response: dict,
    settings: provider_utils.Settings,
    **kwargs,
) -> typing.List[models.Message]:
    if isinstance(response.get("Message", None), str):
        errors_model = [DP.to_object(ErrorCancelShipmentType, response)]
    elif response.get("GenericDetail", None):
        errors_model = [DP.to_object(ErrorType, response)]
    else:
        errors_model = [DP.to_object(ErrorTrackingType, response)]

    errors = (errors_model
              if response.get("Message", None) or response.get("GenericDetail", None) is not None
              else [])

    is_GenericDetail = True if response.get("Message", "") or response.get("GenericDetail", "") else False

    messages = []
    for error in errors:
        # Determine the code
        if response.get("GenericDetail", None):
            code = error.GenericDetail.QuoteNumber
            message = error.FailedValidation
        elif isinstance(response.get("Message", None), dict):
            code = error.Message.Code
            message = error.Message.ErrorMessage
        else:
            code = "402"
            message = error.Message

        # Create the message model
        message_model = models.Message(
            carrier_id=settings.carrier_id,
            carrier_name=settings.carrier_name,
            code=code,
            message=message,
            details={**kwargs},
        )

        messages.append(message_model)

    return messages


def parse_http_response(response: urllib.error.HTTPError) -> dict:
    try:
        return lib.decode(response.read())
    except Exception:
        pass

    return lib.to_json(
        {
            "error-code": response.code,
            "message": response.reason,
        }
    )
