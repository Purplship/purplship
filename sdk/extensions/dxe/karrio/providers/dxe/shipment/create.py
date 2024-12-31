
import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.dxe.error as error
import karrio.providers.dxe.utils as provider_utils
import karrio.providers.dxe.units as provider_units


def parse_shipment_response(
    response: dict,
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response_messages = []  # extract carrier response errors
    response_shipment = None  # extract carrier response shipment

    messages = error.parse_error_response(response_messages, settings)
    shipment = _extract_details(response_shipment, settings)

    return shipment, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.ShipmentDetails:
    shipment = None  # parse carrier shipment type from "data"
    label = ""  # extract and process the shipment label to a valid base64 text
    # invoice = ""  # extract and process the shipment invoice to a valid base64 text if applies

    return models.ShipmentDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        tracking_number="",  # extract tracking number from shipment
        shipment_identifier="",  # extract shipment identifier from shipment
        label_type="PDF",  # extract shipment label file format
        docs=models.Documents(
            label=label,  # pass label base64 text
            # invoice=invoice,  # pass invoice base64 text if applies
        ),
        meta=dict(
            # any relevent meta
        ),
    )


def shipment_request(
    payload: models.ShipmentRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    packages = lib.to_packages(payload.parcels)  # preprocess the request parcels
    service = provider_units.ShippingService.map(payload.service).value_or_key  # preprocess the request services
    options = lib.to_shipping_options(
        payload.options,
        package_options=packages.options,
        option_type=provider_units.ShippingOption,
    )   # preprocess the request options

    request = None  # map data to convert karrio model to dxe specific type

    return lib.Serializable(request)
