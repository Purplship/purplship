from typing import List, Tuple

import easypost_lib.shipment_request as easypost
from easypost_lib.shipments_response import Shipment
from karrio.core.utils import Serializable, DP
from karrio.core.models import (
    Documents,
    Payment,
    ShipmentRequest,
    ShipmentDetails,
    Message,
)
from karrio.core.units import Packages, Options, Weight
from karrio.providers.easypost.units import (
    Service,
    PackagingType,
    Option,
    LabelType,
    PaymentType,
)
from karrio.providers.easypost.utils import Settings, download_label
from karrio.providers.easypost.error import parse_error_response


def parse_shipment_response(
    response: dict, settings: Settings
) -> Tuple[ShipmentDetails, List[Message]]:
    errors = [parse_error_response(response, settings)] if "error" in response else []
    shipment = _extract_details(response, settings) if "error" not in response else None

    return shipment, errors


def _extract_details(response: dict, settings: Settings) -> ShipmentDetails:
    shipment = DP.to_object(Shipment, response)
    label_type = shipment.postage_label.label_file_type.split("/")[-1]
    label = download_label(shipment.postage_label.label_url)

    return ShipmentDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        shipment_identifier=shipment.id,
        tracking_number=shipment.tracking_code,
        label_type=label_type.upper(),
        docs=Documents(label=label),
        meta=dict(
            rate_provider=shipment.selected_rate.carrier,
            service_name=shipment.selected_rate.service,
            label_url=shipment.postage_label.label_url,
        ),
    )


def shipment_request(payload: ShipmentRequest, _) -> Serializable:
    package = Packages(payload.parcels, package_option_type=Options).single
    service = Service.map(payload.service).value_or_key
    constoms_options = getattr(payload.customs, "options", {})
    payment = payload.payment or Payment()
    payor = payment.address or (
        payload.shipper if payment.paid_by == "sender" else payload.recipient
    )

    options = Options(
        Option.apply_defaults(payload, payor=payor, package_options=package.options),
        Option,
    )

    requests = dict(
        service=service,
        insurance=options.insurance,
        data=easypost.ShipmentRequest(
            shipment=easypost.Shipment(
                reference=payload.reference,
                to_address=easypost.Address(
                    company=payload.recipient.company_name,
                    street1=payload.recipient.address_line1,
                    street2=payload.recipient.address_line2,
                    city=payload.recipient.city,
                    state=payload.recipient.state_code,
                    zip=payload.recipient.postal_code,
                    country=payload.recipient.country_code,
                    residential=payload.recipient.residential,
                    name=payload.recipient.person_name,
                    phone=payload.recipient.phone_number,
                    email=payload.recipient.email,
                    federal_tax_id=payload.recipient.federal_tax_id,
                    state_tax_id=payload.recipient.state_tax_id,
                ),
                from_address=easypost.Address(
                    company=payload.shipper.company_name,
                    street1=payload.shipper.address_line1,
                    street2=payload.shipper.address_line2,
                    city=payload.shipper.city,
                    state=payload.shipper.state_code,
                    zip=payload.shipper.postal_code,
                    country=payload.shipper.country_code,
                    residential=payload.shipper.residential,
                    name=payload.shipper.person_name,
                    phone=payload.shipper.phone_number,
                    email=payload.shipper.email,
                    federal_tax_id=payload.shipper.federal_tax_id,
                    state_tax_id=payload.shipper.state_tax_id,
                ),
                parcel=easypost.Parcel(
                    length=package.length.IN,
                    width=package.width.IN,
                    height=package.height.IN,
                    weight=package.weight.OZ,
                    predefined_package=PackagingType.map(package.packaging_type).value,
                ),
                options={
                    getattr(option, "key", code): getattr(option, "value", option)
                    for code, option in options
                    if code in Option
                },
                customs_info=(
                    easypost.CustomsInfo(
                        contents_explanation=payload.customs.content_description,
                        contents_type=payload.customs.content_type,
                        customs_certify=payload.customs.certify,
                        customs_signer=payload.customs.signer,
                        eel_pfc=constoms_options.get("eel_pfc"),
                        non_delivery_option=constoms_options.get("non_delivery_option"),
                        restriction_type=constoms_options.get("restriction_type"),
                        declaration=constoms_options.get("declaration"),
                        customs_items=[
                            easypost.CustomsItem(
                                description=item.description,
                                origin_country=item.origin_country,
                                quantity=item.quantity,
                                value=item.value_amount,
                                weight=Weight(item.weight, item.weight_unit).OZ,
                                code=item.sku,
                                manufacturer=None,
                                currency=item.value_currency,
                                eccn=(item.metadata or {}).get("eccn"),
                                printed_commodity_identifier=(item.sku or item.id),
                                hs_tariff_number=(item.metadata or {}).get(
                                    "hs_tariff_number"
                                ),
                            )
                            for item in payload.customs.commodities
                        ],
                    )
                    if payload.customs is not None
                    else None
                ),
            )
        ),
    )

    return Serializable(requests, DP.to_dict)
