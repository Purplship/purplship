
import typing
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.freightcomv2.error as error
import karrio.providers.freightcomv2.utils as provider_utils
import karrio.providers.freightcomv2.units as provider_units


def parse_rate_response(
    _response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response = _response.deserialize()
    messages = error.parse_error_response(response, settings)
    rates = [_extract_details(rate, settings) for rate in response]
    return rates, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.RateDetails:
    rate = None  # parse carrier rate type

    # Extract necessary details from the rate response
    total_charge = data.get("TotalCharges", 0.0)
    currency = "CAD"  # Assuming currency is CAD, update as needed
    service = data.get("Standard", "Regular")  # Update with actual service key, if available
    transit_days = 0  # Transit days key unknown, update if available in response

    print("total_charge", total_charge)
    print("currency", currency)
    print("service", service)
    print("transit_days", transit_days)

    rate_details = models.RateDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        service=service,
        total_charge=total_charge,
        currency=currency,
        transit_days=transit_days,

    )
    print(rate_details)
    return rate_details



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
    )   # preprocess the request options

    request = None  # map data to convert karrio model to freightcomv2 specific type

    return lib.Serializable(request)
