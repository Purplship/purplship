
import typing
import karrio.lib as lib
import karrio.core.models as models
import karrio.providers.dxe.error as error
import karrio.providers.dxe.utils as provider_utils
import karrio.providers.dxe.units as provider_units


def parse_shipment_cancel_response(
    response: dict,
    settings: provider_utils.Settings,
) -> typing.Tuple[models.ConfirmationDetails, typing.List[models.Message]]:
    response_messages = []  # extract carrier response errors and messages
    messages = error.parse_error_response(response_messages, settings)
    success = True  # compute shipment cancel success state

    confirmation = (
        models.ConfirmationDetails(
            carrier_id=settings.carrier_id,
            carrier_name=settings.carrier_name,
            operation="Cancel Shipment",
            success=success,
        ) if success else None
    )

    return confirmation, messages


def shipment_cancel_request(
    payload: models.ShipmentCancelRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:

    request = None  # map data to convert karrio model to dxe specific type

    return lib.Serializable(request)
