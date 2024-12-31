
import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.norsk.error as error
import karrio.providers.norsk.utils as provider_utils
import karrio.providers.norsk.units as provider_units


def parse_rate_response(
    response: lib.Element,
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response_messages = []  # extract carrier response errors
    response_rates = []  # extract carrier response rates

    messages = error.parse_error_response(response_messages, settings)
    rates = [_extract_details(rate, settings) for rate in response_rates]

    return rates, messages


def _extract_details(
    data: lib.Element,
    settings: provider_utils.Settings,
) -> models.RateDetails:
    rate = None  # parse carrier rate type

    return models.RateDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        service="",  # extract service from rate
        total_charge=0.0,  # extract the rate total rate cost
        currency="",  # extract the rate pricing currency
        transit_days=0,  # extract the rate transit days
        meta=dict(
            service_name="",  # extract the rate service human readable name
        ),
    )


def rate_request(
    payload: models.RateRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    packages = lib.to_packages(payload.parcels)  # preprocess the request parcels
    services = lib.to_services(payload.services, provider_units.ShippingService)  # preprocess the request services
    options = lib.to_shipping_options(
        payload.options,
        package_options=packages.options,
        option_type=provider_units.ShippingOption,
    )   # preprocess the request options

    request = None  # map data to convert karrio model to norsk specific type

    return lib.Serializable(request)
