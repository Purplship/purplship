
import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.freightcomv2.error as error
import karrio.providers.freightcomv2.utils as provider_utils
import karrio.providers.freightcomv2.units as provider_units


def parse_tracking_response(
    _response: lib.Deserializable[typing.List[typing.Tuple[str, dict]]],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.TrackingDetails], typing.List[models.Message]]:
    responses = _response.deserialize()

    messages = sum(
        [
            error.parse_error_response(response, settings, tracking_number=_)
            for _, response in responses
        ],
        start=[],
    )
    tracking_details = [_extract_details(details, settings) for _, details in responses]

    return tracking_details, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.TrackingDetails:
    tracking = None  # parse carrier tracking object type

    return models.TrackingDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        tracking_number="",  # extract tracking number from tracking
        events=[
            models.TrackingEvent(
                date=lib.fdate(""), # extract tracking event date
                description="",  # extract tracking event description or code
                code="",  # extract tracking event code
                time=lib.ftime(""), # extract tracking event time
                location="",  # extract tracking event address
            )
            for event in []  # extract tracking events
        ],
        estimated_delivery=lib.fdate(""), # extract tracking estimated date if provided
        delivered=False,  # compute tracking delivered status
    )


def tracking_request(
    payload: models.TrackingRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    request = None  # map data to convert karrio model to freightcomv2 specific type

    return lib.Serializable(request)
