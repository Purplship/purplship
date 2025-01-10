import typing

import karrio.core.models as models
import karrio.lib as lib
import karrio.providers.morneau.error as error
import karrio.providers.morneau.utils as provider_utils


def parse_rate_response(
    response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response = response.deserialize()

    # Check for errors in the response
    if "FailedValidation" in response or "GenericDetail" in response:
        messages = [error.ErrorType(response).FailedValidation]  # Adapt based on actual error structure
        return [], messages

    # If response is successful, extract rate details
    rate_details = _extract_details(response, settings)

    print(rate_details)

    return [rate_details], []


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
) -> models.RateDetails:
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


def rate_request(
    payload: models.RateRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    packages = lib.to_packages(payload.parcels)  # preprocess the request parcels
    commodities = payload.parcels

    request_payload = {
        "BillToCodeId": settings.billed_id,
        "Division": settings.division,
        "Quote": {
            "StartZone": payload.shipper.postal_code[:3] + " " + payload.shipper.postal_code[3:],
            "EndZone": payload.recipient.postal_code[:3] + " " + payload.recipient.postal_code[3:],
            "UserName": settings.username,
            "NbPallet": len(packages),  # Assuming one parcel per pallet
            "Weight": float(sum(package.weight.value for package in packages)),
            "WeightUnit": payload.parcels[0].weight_unit,
            # "Commodities": [{
            #     "Piece": 1,
            #     "Length": float(package.length.value),
            #     "Width": float(package.width.value),
            #     "Height": float(package.height.value)
            # } for package in packages],
            "Commodities": ['RENDEZVOUS', 'PCAMLIVR', 'HOME'],
            "Dimensions": [{
                "Piece": 1,
                "Length": float(package.length.value),
                "Width": float(package.width.value),
                "Height": float(package.height.value)
            } for package in packages]
        }
    }

    return lib.Serializable(request_payload, lib.to_dict)
