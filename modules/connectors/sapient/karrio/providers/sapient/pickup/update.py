import karrio.schemas.sapient.pickup_request as sapient
import karrio.schemas.sapient.pickup_response as pickup

import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.sapient.error as error
import karrio.providers.sapient.utils as provider_utils
import karrio.providers.sapient.units as provider_units


def parse_pickup_update_response(
    _response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response = _response.deserialize()

    messages = error.parse_error_response(response, settings, _response.ctx)
    pickup = lib.identity(
        _extract_details(response, settings)
        if "confirmation_number" in response
        else None
    )

    return pickup, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
    ctx: dict = None,
) -> models.PickupDetails:
    details = lib.to_object(pickup.PickupResponseType, data)

    return models.PickupDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        confirmation_number=details.CollectionOrderId,
        pickup_date=lib.fdate(details.CollectionDate),
        meta=dict(
            sapient_shipment_id=ctx.get("shipmentId"),
            sapient_carrier=ctx.get("carrier"),
        ),
    )


def pickup_update_request(
    payload: models.PickupUpdateRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    options = lib.units.Options(
        payload.options,
        option_type=lib.units.create_enum(
            "PickupOptions",
            # fmt: off
            {
                "sapient_carrier": lib.OptionEnum("sapient_carrier"),
                "sapient_shipment_id": lib.OptionEnum("shipment_id"),
                "sapient_slot_reservation_id": lib.OptionEnum("SlotReservationId"),
                "sapient_bring_my_label": lib.OptionEnum("BringMyLabel", bool),
            },
            # fmt: on
        ),
    )

    # map data to convert karrio model to sapient specific type
    request = sapient.PickupRequestType(
        SlotDate=payload.pickup_date,
        SlotReservationId=options.sapient_slot_reservation_id.state,
        BringMyLabel=lib.identity(
            options.sapient_bring_my_label.state
            if options.sapient_bring_my_label.state is not None
            else False
        ),
    )

    return lib.Serializable(
        request,
        lib.to_dict,
        dict(
            shipmentId=options.sapient_shipment_id.state,
            carrier=options.sapient_carrier.state or settings.carrier_code,
        ),
    )
