import typing

import karrio.core.models as models
import karrio.lib as lib
import karrio.providers.morneau.error as error
import karrio.providers.morneau.utils as provider_utils
import karrio.schemas.morneau.trackers_response as morneau_schema


def parse_tracking_response(
    _response: lib.Deserializable[typing.List[typing.Tuple[str, dict]]],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.TrackingDetails], typing.List[models.Message]]:
    responses = _response.deserialize()

    messages = sum(
        [
            error.parse_error_response(response, settings, tracking_number=_)
            for _, response in responses
            if response.get("Message", {}).get("HttpStatusCode", None) == 400
        ],
        start=[],
    )

    tracking_details = [_extract_details(details, settings) for _, details in responses if
                        details.get("Message", {}).get("HttpStatusCode", None) != 400]

    return tracking_details, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.TrackingDetails:
    # Deserialize the response into TrackersResponseType
    # data.pop('tracking_number', None)

    tracking_response = morneau_schema.TrackersResponseType(**data)
    order_tracking = tracking_response.OrderTracking

    if not order_tracking:
        return models.TrackingDetails(carrier_id=settings.carrier_id,
                                      carrier_name=settings.carrier_name, tracking_number="", events=[],
                                      estimated_delivery="", delivered=False)

    events = [
        models.TrackingEvent(
            date=lib.fdate(event.DateTime.split('T')[0]),
            description=event.Status,
            code=event.StatusCode,
            time=lib.ftime(event.DateTime.split('T')[1]),
            location=event.Zone,
        )
        for event in order_tracking.History
    ]

    return models.TrackingDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        tracking_number=order_tracking.BillId,
        events=events,
        estimated_delivery="not available",
        delivered=order_tracking.TripCompleted,
    )


def tracking_request(
    payload: models.TrackingRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    request = payload.tracking_numbers

    return lib.Serializable(request)
