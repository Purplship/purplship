import typing

import karrio.core.models as models
import karrio.lib as lib
import karrio.providers.morneau.error as error
import karrio.providers.morneau.utils as provider_utils


def parse_shipment_cancel_response(
    response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[models.ConfirmationDetails, typing.List[models.Message]]:
    response_messages: list = []  # extract carrier response errors and messages
    messages = error.parse_error_response({}, settings)
    success = len(messages) == 0

    confirmation = (
        models.ConfirmationDetails(
            carrier_id=settings.carrier_id,
            carrier_name=settings.carrier_name,
            operation="Cancel Shipment",
            success=success,
        ) if success else None
    )

    return confirmation, messages


def shipment_cancel_request(payload: models.ShipmentCancelRequest, _) -> lib.Serializable:
    request = dict(reference=payload.shipment_identifier)
    return lib.Serializable(request)
