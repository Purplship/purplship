
import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.norsk.error as error
import karrio.providers.norsk.utils as provider_utils
import karrio.providers.norsk.units as provider_units


def parse_tracking_response(
    responses: typing.List[typing.Tuple[str, lib.Element]],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.TrackingDetails], typing.List[models.Message]]:
    response_messages = []  # extract carrier response errors
    response_details = []  # extract carrier response tracking details

    messages = error.parse_error_response(response_messages, settings)
    tracking_details = [_extract_details(details, settings) for details in response_details]

    return tracking_details, messages


def _extract_details(
    data: lib.Element,
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
    request = None  # map data to convert karrio model to norsk specific type

    return lib.Serializable(request)
