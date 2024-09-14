"""Karrio Easyship pickup updateAPI implementation."""

import karrio.schemas.easyship.pickup_request as easyship
import karrio.schemas.easyship.pickup_response as pickup

import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.easyship.error as error
import karrio.providers.easyship.utils as provider_utils
import karrio.providers.easyship.units as provider_units


def parse_pickup_update_response(
    _response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response = _response.deserialize()

    messages = error.parse_error_response(response, settings)
    pickup = (
        _extract_details(response, settings)
        if "confirmation_number" in response
        else None
    )

    return pickup, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.PickupDetails:
    details = None  # parse carrier pickup type from "data"

    return models.PickupDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        confirmation_number="",  # extract confirmation number from pickup
        pickup_date=lib.fdate(""),  # extract tracking event date
    )


def pickup_update_request(
    payload: models.PickupUpdateRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:

    # map data to convert karrio model to easyship specific type
    request = easyship.PickupRequestType(
        courierid=None,
        easyshipshipmentids=[],
        selecteddate=None,
        selectedfromtime=None,
        selectedtotime=None,
        timeslotid=None,
    )

    return lib.Serializable(request, lib.to_dict)
