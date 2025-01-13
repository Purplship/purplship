import karrio.schemas.fedex.rating_request as fedex
import karrio.schemas.fedex.rating_responses as rating
import typing
import datetime
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.fedex.error as error
import karrio.providers.fedex.utils as provider_utils
import karrio.providers.fedex.units as provider_units


def parse_rate_response(
    _response: lib.Deserializable[dict],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    response = _response.deserialize()
    messages = error.parse_error_response(response, settings)
    rates = [
        _extract_details(rate, settings, ctx=_response.ctx)
        for rate in (response.get("output", {}).get("rateReplyDetails") or [])
    ]

    return rates, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
    ctx: dict = {},
) -> models.RateDetails:
    # fmt: off
    rate = lib.to_object(rating.RateReplyDetailType, data)
    service = provider_units.ShippingService.map(rate.serviceType)
    details: rating.RatedShipmentDetailType = lib.identity(
        next((_ for _ in rate.ratedShipmentDetails if _.rateType == "PREFERRED_CURRENCY"), None) or
        next((_ for _ in rate.ratedShipmentDetails if _.rateType == "ACCOUNT"), None) or
        rate.ratedShipmentDetails[0]
    )
    charges = [
        ("Base Charge", lib.to_money(details.totalBaseCharge)),
        ("Discounts", lib.to_money(details.totalDiscounts)),
        *[(_.type, lib.to_money(_.amount)) for _ in details.shipmentRateDetail.taxes or []],
        *[(_.description, lib.to_money(_.amount)) for _ in details.shipmentRateDetail.surCharges or []],
    ]
    total_charge = lib.to_money(
        details.totalNetChargeWithDutiesAndTaxes
        or details.totalNetCharge
    )
    estimated_delivery = lib.to_date(getattr(rate.operationalDetail, "commitDate", None), "%Y-%m-%dT%H:%M:%S")
    shipping_date = lib.to_date(ctx.get("shipment_date") or datetime.datetime.now())
    transit_day_list = lib.identity(
        (shipping_date + datetime.timedelta(x + 1) for x in range((estimated_delivery.date() - shipping_date.date()).days))
        if estimated_delivery is not None
        else None
    )
    transit_days = lib.identity(
        sum(1 for day in transit_day_list if day.weekday() < 5)
        if transit_day_list is not None
        else None
    )
    # fmt: on

    return models.RateDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        service=service.name_or_key,
        total_charge=total_charge,
        currency=details.currency,
        transit_days=transit_days,
        estimated_delivery=lib.fdate(estimated_delivery),
        extra_charges=[
            models.ChargeDetails(
                name=name,
                amount=amount,
                currency=details.currency,
            )
            for name, amount in charges
            if amount is not None
        ],
        meta=dict(
            service_name=service.name or rate.serviceName,
            transit_time=getattr(rate.operationalDetail, "transitTime", None),
        ),
    )


def rate_request(
    payload: models.RateRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    shipper = lib.to_address(payload.shipper)
    recipient = lib.to_address(payload.recipient)
    service = lib.to_services(payload.services, provider_units.ShippingService).first
    options = lib.to_shipping_options(
        payload.options,
        initializer=provider_units.shipping_options_initializer,
    )
    packages = lib.to_packages(
        payload.parcels,
        required=["weight"],
        options=options,
        presets=provider_units.PackagePresets,
        shipping_options_initializer=provider_units.shipping_options_initializer,
    )

    is_intl = shipper.country_code != recipient.country_code
    default_currency = lib.identity(
        options.currency.state
        or settings.default_currency
        or units.CountryCurrency.map(payload.shipper.country_code).value
        or "USD"
    )
    weight_unit, dim_unit = lib.identity(
        provider_units.COUNTRY_PREFERED_UNITS.get(payload.shipper.country_code)
        or packages.compatible_units
    )
    payment = payload.payment or models.Payment(
        paid_by="sender", account_number=settings.account_number
    )
    request_types = lib.identity(
        settings.connection_config.rate_request_types.state
        if any(settings.connection_config.rate_request_types.state or [])
        else ["LIST", "ACCOUNT", "PREFERRED"]
    )
    shipment_date = lib.to_date(options.shipment_date.state or datetime.datetime.now())
    hub_id = lib.identity(
        lib.text(options.fedex_smart_post_hub_id.state)
        or lib.text(settings.connection_config.smart_post_hub_id.state)
    )
    rate_options = lambda _options: [
        option
        for _, option in _options.items()
        if option.state is not False and option.code in provider_units.RATING_OPTIONS
    ]
    shipment_options = lambda _options: [
        option
        for _, option in _options.items()
        if option.state is not False and option.code in provider_units.SHIPMENT_OPTIONS
    ]

    customs = lib.to_customs_info(
        payload.customs,
        shipper=payload.shipper,
        recipient=payload.recipient,
        weight_unit=weight_unit.value,
    )
    commodities = lib.identity(
        (customs.commodities if any(customs.commodities) else packages.items)
        if any(packages.items) or any(customs.commodities)
        else units.Products(
            [
                models.Commodity(
                    sku="0000",
                    quantity=1,
                    weight=packages.weight.value,
                    weight_unit=packages.weight_unit,
                    value_amount=options.declared_value.state or 1.0,
                    value_currency=default_currency,
                )
            ]
        )
    )

    request = fedex.RatingRequestType(
        accountNumber=fedex.RatingRequestAccountNumberType(
            value=settings.account_number,
        ),
        rateRequestControlParameters=fedex.RateRequestControlParametersType(
            returnTransitTimes=True,
            servicesNeededOnRateFailure=True,
            variableOptions=lib.identity(
                ",".join([option.code for option in rate_options(options)])
                if any(rate_options(options))
                else None
            ),
            rateSortOrder=(options.fedex_rate_sort_order.state or "COMMITASCENDING"),
        ),
        requestedShipment=fedex.RequestedShipmentType(
            shipper=fedex.ShipperClassType(
                address=fedex.ResponsiblePartyAddressType(
                    streetLines=shipper.address_lines,
                    city=shipper.city,
                    stateOrProvinceCode=provider_utils.state_code(shipper),
                    postalCode=shipper.postal_code,
                    countryCode=shipper.country_code,
                    residential=shipper.residential,
                )
            ),
            recipient=fedex.ShipperClassType(
                address=fedex.ResponsiblePartyAddressType(
                    streetLines=recipient.address_lines,
                    city=recipient.city,
                    stateOrProvinceCode=provider_utils.state_code(recipient),
                    postalCode=recipient.postal_code,
                    countryCode=recipient.country_code,
                    residential=recipient.residential,
                )
            ),
            serviceType=getattr(service, "value", None),
            emailNotificationDetail=None,
            preferredCurrency=default_currency,
            rateRequestType=request_types,
            shipDateStamp=lib.fdate(shipment_date, "%Y-%m-%d"),
            pickupType="DROPOFF_AT_FEDEX_LOCATION",
            requestedPackageLineItems=[
                fedex.RequestedPackageLineItemType(
                    subPackagingType=lib.identity(
                        provider_units.SubPackageType.map(package.packaging_type).value
                        or "OTHER"
                    ),
                    groupPackageCount=1,
                    contentRecord=[],
                    declaredValue=package.options.declared_value.state,
                    weight=fedex.WeightType(
                        units=package.weight.unit,
                        value=package.weight.value,
                    ),
                    dimensions=(
                        fedex.DimensionsType(
                            length=package.length.map(
                                provider_units.MeasurementOptions
                            ).value,
                            width=package.width.map(
                                provider_units.MeasurementOptions
                            ).value,
                            height=package.height.map(
                                provider_units.MeasurementOptions
                            ).value,
                            units=package.dimension_unit.value,
                        )
                        if (
                            # only set dimensions if the packaging type is set to your_packaging
                            package.has_dimensions
                            and provider_units.PackagingType.map(
                                package.packaging_type or "your_packaging"
                            ).value
                            == provider_units.PackagingType.your_packaging.value
                        )
                        else None
                    ),
                    variableHandlingChargeDetail=None,
                    packageSpecialServices=None,
                )
                for package in packages
            ],
            documentShipment=packages.is_document,
            variableHandlingChargeDetail=None,
            packagingType=provider_units.PackagingType.map(
                packages.package_type or "your_packaging"
            ).value,
            totalWeight=packages.weight.LB,
            shipmentSpecialServices=lib.identity(
                fedex.ShipmentSpecialServicesType(
                    returnShipmentDetail=None,
                    deliveryOnInvoiceAcceptanceDetail=None,
                    internationalTrafficInArmsRegulationsDetail=None,
                    pendingShipmentDetail=None,
                    holdAtLocationDetail=None,
                    shipmentCODDetail=None,
                    shipmentDryIceDetail=None,
                    internationalControlledExportDetail=None,
                    homeDeliveryPremiumDetail=None,
                    specialServiceTypes=(
                        [option.code for option in shipment_options(options)]
                        if any(shipment_options(options))
                        else []
                    ),
                )
                if any(shipment_options(options))
                else None
            ),
            customsClearanceDetail=lib.identity(
                fedex.CustomsClearanceDetailType(
                    brokers=[],
                    commercialInvoice=None,
                    freightOnValue=None,
                    dutiesPayment=fedex.DutiesPaymentType(
                        payor=fedex.PayorType(
                            responsibleParty=fedex.ResponsiblePartyType(
                                address=None,
                                contact=None,
                                accountNumber=fedex.RatingRequestAccountNumberType(
                                    value=settings.account_number,
                                ),
                            ),
                        ),
                        paymentType=provider_units.PaymentType.map("sender").value,
                    ),
                    commodities=[
                        fedex.CommodityType(
                            description=lib.text(
                                item.description or item.title or "N/A", max=35
                            ),
                            weight=fedex.WeightType(
                                units=packages.weight_unit,
                                value=item.weight,
                            ),
                            unitPrice=lib.identity(
                                fedex.FixedValueType(
                                    amount=lib.to_money(item.value_amount),
                                    currency=(item.value_currency or default_currency),
                                )
                                if item.value_amount
                                else None
                            ),
                            customsValue=fedex.FixedValueType(
                                amount=lib.identity(
                                    lib.to_money(
                                        item.value_amount or 1.0 * item.quantity
                                    )
                                ),
                                currency=lib.identity(
                                    item.value_currency or default_currency
                                ),
                            ),
                            quantity=item.quantity,
                            numberOfPieces=item.quantity,
                            quantityUnits="PCS",
                            harmonizedCode=item.hs_code,
                            name=item.title,
                            partNumber=item.sku,
                        )
                        for item in commodities
                    ],
                )
                if is_intl
                else None
            ),
            groupShipment=None,
            serviceTypeDetail=None,
            smartPostInfoDetail=lib.identity(
                fedex.SmartPostInfoDetailType(
                    ancillaryEndorsement=None,
                    hubId=hub_id,
                    indicia=(
                        lib.text(options.fedex_smart_post_allowed_indicia.state)
                        or "PARCEL_SELECT"
                    ),
                    specialServices=None,
                )
                if hub_id is not None
                else None
            ),
            expressFreightDetail=None,
            groundShipment=None,
        ),
        carrierCodes=options.fedex_carrier_codes.state,
    )

    return lib.Serializable(
        request,
        lib.to_dict,
        dict(shipment_date=shipment_date),
    )
