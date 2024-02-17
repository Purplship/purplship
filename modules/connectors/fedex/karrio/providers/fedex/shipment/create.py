import karrio.schemas.fedex.shipping_request as fedex
import karrio.schemas.fedex.shipping_response as shipping
import typing
import datetime
import karrio.lib as lib
import karrio.core.units as units
import karrio.core.models as models
import karrio.providers.fedex.error as provider_error
import karrio.providers.fedex.utils as provider_utils
import karrio.providers.fedex.units as provider_units


def parse_shipment_response(
    _response: lib.Deserializable[typing.List[dict]],
    settings: provider_utils.Settings,
) -> typing.Tuple[typing.List[models.RateDetails], typing.List[models.Message]]:
    responses = _response.deserialize()

    shipment = lib.to_multi_piece_shipment(
        [
            (
                f"{_}",
                (
                    _extract_details(response, settings, ctx=_response.ctx)
                    if response.get("errors") is None
                    else None
                ),
            )
            for _, response in enumerate(responses, start=1)
        ]
    )
    messages: typing.List[models.Message] = sum(
        [
            provider_error.parse_error_response(list(response), settings)
            for response in responses
        ],
        start=[],
    )

    return shipment, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
    ctx: dict = {},
) -> models.ShipmentDetails:
    # fmt: off
    shipment = lib.to_object(shipping.TransactionShipmentType, data)
    service = provider_units.ShippingService.map(shipment.serviceType).value_or_key
    tracking_number = shipment.pieceResponses[0].trackingNumber
    invoices = [_ for _ in shipment.pieceResponses[0].packageDocuments if "INVOICE" in _.contentType]
    labels = [_ for _ in shipment.pieceResponses[0].packageDocuments if "LABEL" in _.contentType]

    invoice_type = invoices[0].docType if len(invoices) > 0 else "PDF"
    invoice = lib.bundle_base64([_.encodedLabel for _ in invoices], invoice_type)

    label_type = labels[0].docType if len(labels) > 0 else "PDF"
    label = lib.bundle_base64([_.encodedLabel for _ in labels], label_type)
    # fmt: on

    return models.ShipmentDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        tracking_number=tracking_number,
        shipment_identifier=tracking_number,
        label_type=label_type,
        docs=models.Documents(label=label, invoice=invoice),
        meta=dict(
            carrier_tracking_link=settings.tracking_url.format(tracking_number),
            service_name=service.name_or_key,
            trackingIdType=shipment.pieceResponses[0].trackingIdType,
            serviceCategory=shipment.pieceResponses[0].serviceCategory,
        ),
    )


def shipment_request(
    payload: models.ShipmentRequest,
    settings: provider_utils.Settings,
) -> lib.Serializable:
    shipper = lib.to_address(payload.shipper)
    recipient = lib.to_address(payload.recipient)
    service = provider_units.ShippingService.map(payload.service).value_or_key
    options = lib.to_shipping_options(
        payload.options,
        option_type=provider_units.ShippingOption,
        initializer=provider_units.shipping_options_initializer,
    )
    packages = lib.to_packages(
        payload.parcels,
        required=["weight"],
        options=payload.options,
        presets=provider_units.PackagePresets,
        package_option_type=provider_units.PackageOption,
        shipping_options_initializer=provider_units.shipping_options_initializer,
    )
    weight_unit, dim_unit = (
        provider_units.COUNTRY_PREFERED_UNITS.get(payload.shipper.country_code)
        or packages.compatible_units
    )
    customs = lib.to_customs_info(
        payload.customs,
        shipper=payload.shipper,
        recipient=payload.recipient,
        weight_unit=weight_unit.value,
    )

    payment = payload.payment or models.Payment(
        paid_by="sender", account_number=settings.account_number
    )
    shipment_date = lib.to_date(options.shipment_date.state or datetime.datetime.now())
    label_type, label_format = provider_units.LabelType.map(
        payload.label_type or "PDF_4x6"
    ).value
    compute_options = lambda _options: [
        option for _, option in _options.items() if _options.state is not False
    ]
    billing_address = lib.to_address(
        payload.billing_address
        or dict(
            sender=payload.shipper,
            recipient=payload.recipient,
            third_party=payload.billing_address,
        )[payment.paid_by]
    )
    duty_billing_address = lib.to_address(
        customs.duty_billing_address
        or dict(
            sender=payload.shipper,
            recipient=payload.recipient,
            third_party=customs.duty_billing_address,
        ).get(customs.duty.paid_by)
    )

    requests = [
        fedex.ShippingRequestType(
            mergeLabelDocOption=None,
            requestedShipment=fedex.RequestedShipmentType(
                shipDatestamp=lib.fdate(shipment_date, "%Y-%m-%d"),
                totalDeclaredValue=fedex.TotalDeclaredValueType(
                    amount=lib.to_money(package.options.declared_value.state),
                    currency=package.options.currency.state,
                ),
                shipper=fedex.ShipperType(
                    accountNumber=settings.account_number,
                    address=fedex.AddressType(
                        streetLines=shipper.address_lines,
                        city=shipper.city,
                        stateOrProvinceCode=shipper.state_code,
                        postalCode=shipper.postal_code,
                        countryCode=shipper.country_code,
                        residential=shipper.residential,
                    ),
                    contact=fedex.ResponsiblePartyContactType(
                        personName=shipper.contact,
                        emailAddress=shipper.email,
                        phoneNumber=shipper.phone_number,
                        phoneExtension=None,
                        companyName=shipper.company_name,
                        faxNumber=None,
                    ),
                    tins=(
                        fedex.TinType(number=shipper.tax_id)
                        if shipper.has_tax_info
                        else None
                    ),
                    deliveryInstructions=None,
                ),
                soldTo=fedex.ShipperType(
                    address=fedex.AddressType(
                        streetLines=recipient.address_lines,
                        city=recipient.city,
                        stateOrProvinceCode=recipient.state_code,
                        postalCode=recipient.postal_code,
                        countryCode=recipient.country_code,
                        residential=recipient.residential,
                    ),
                    contact=fedex.ResponsiblePartyContactType(
                        personName=recipient.contact,
                        emailAddress=recipient.email,
                        phoneNumber=recipient.phone_number,
                        phoneExtension=None,
                        companyName=recipient.company_name,
                        faxNumber=None,
                    ),
                    tins=(
                        fedex.TinType(number=recipient.tax_id)
                        if recipient.has_tax_info
                        else None
                    ),
                    deliveryInstructions=None,
                ),
                recipients=[
                    fedex.ShipperType(
                        address=fedex.AddressType(
                            streetLines=recipient.address_lines,
                            city=recipient.city,
                            stateOrProvinceCode=recipient.state_code,
                            postalCode=recipient.postal_code,
                            countryCode=recipient.country_code,
                            residential=recipient.residential,
                        ),
                        contact=fedex.ResponsiblePartyContactType(
                            personName=recipient.contact,
                            emailAddress=recipient.email,
                            phoneNumber=recipient.phone_number,
                            phoneExtension=None,
                            companyName=recipient.company_name,
                            faxNumber=None,
                        ),
                        tins=(
                            fedex.TinType(number=recipient.tax_id)
                            if recipient.has_tax_info
                            else None
                        ),
                        deliveryInstructions=None,
                    )
                ],
                recipientLocationNumber=None,
                pickupType="DROPOFF_AT_FEDEX_LOCATION",
                serviceType=service,
                packagingType=provider_units.PackagingType.map(
                    packages.package_type or "your_packaging"
                ).value,
                totalWeight=package.weight,
                origin=None,
                shippingChargesPayment=fedex.ShippingChargesPaymentType(
                    paymentType=provider_units.PaymentType.map(
                        payment.paid_by
                    ).value_or_key,
                    payor=(
                        fedex.PayorType(
                            responsibleParty=fedex.ResponsiblePartyType(
                                address=fedex.AddressType(
                                    streetLines=billing_address.address_lines,
                                    city=billing_address.city,
                                    stateOrProvinceCode=billing_address.state_code,
                                    postalCode=billing_address.postal_code,
                                    countryCode=billing_address.country_code,
                                    residential=billing_address.residential,
                                ),
                                contact=fedex.ResponsiblePartyContactType(
                                    personName=billing_address.contact,
                                    emailAddress=billing_address.email,
                                    phoneNumber=billing_address.phone_number,
                                    phoneExtension=None,
                                    companyName=billing_address.company_name,
                                    faxNumber=None,
                                ),
                                accountNumber=payment.account_number,
                                tins=(
                                    fedex.TinType(number=billing_address.tax_id)
                                    if billing_address.has_tax_info
                                    else None
                                ),
                            ),
                        )
                        if billing_address.address is None
                        else None
                    ),
                ),
                shipmentSpecialServices=(
                    fedex.ShipmentSpecialServicesType(
                        specialServiceTypes=(
                            [option.code for option in compute_options(package.options)]
                            if compute_options(package.options)
                            else None
                        ),
                        etdDetail=(
                            fedex.EtdDetailType(
                                attributes=(
                                    None
                                    if package.options.doc_files.state
                                    or package.options.doc_references.state
                                    else ["POST_SHIPMENT_UPLOAD_REQUESTED"]
                                ),
                                attachedDocuments=(
                                    [
                                        fedex.AttachedDocumentType(
                                            documentType=(
                                                provider_units.UploadDocumentType.map(
                                                    doc["doc_name"]
                                                ).value
                                                or "COMMERCIAL_INVOICE"
                                            ),
                                            documentReference=(
                                                payload.reference
                                                or getattr(payload, "id", None),
                                            ),
                                            description=None,
                                            documentId=None,
                                        )
                                        for doc in options.doc_files.state
                                    ]
                                    if (options.doc_files.state or [])
                                    else None
                                ),
                                requestedDocumentTypes=["COMMERCIAL_INVOICE"],
                            )
                            if options.fedex_electronic_trade_documents.state
                            else None
                        ),
                        returnShipmentDetail=None,
                        deliveryOnInvoiceAcceptanceDetail=None,
                        internationalTrafficInArmsRegulationsDetail=None,
                        pendingShipmentDetail=None,
                        holdAtLocationDetail=None,
                        shipmentCODDetail=None,
                        shipmentDryIceDetail=None,
                        internationalControlledExportDetail=None,
                        homeDeliveryPremiumDetail=None,
                    )
                    if any(options.items())
                    else None
                ),
                emailNotificationDetail=None,
                expressFreightDetail=None,
                variableHandlingChargeDetail=None,
                customsClearanceDetail=(
                    fedex.CustomsClearanceDetailType(
                        regulatoryControls=None,
                        brokers=None,
                        commercialInvoice=fedex.CommercialInvoiceType(
                            originatorName=(shipper.company_name or shipper.contact),
                            comments=None,
                            customerReferences=(
                                [
                                    fedex.CustomerReferenceType(
                                        customerReferenceType="INVOICE_NUMBER",
                                        value=customs.invoice,
                                    )
                                ]
                                if customs.invoice is not None
                                else None
                            ),
                            taxesOrMiscellaneousCharge=None,
                            taxesOrMiscellaneousChargeType=None,
                            freightCharge=None,
                            packingCosts=None,
                            handlingCosts=None,
                            declarationStatement=None,
                            termsOfSale=provider_units.Incoterm.map(
                                customs.incoterm or "DDU"
                            ).value,
                            specialInstructions=None,
                            shipmentPurpose=provider_units.PurposeType.map(
                                customs.content_type or "other"
                            ).value,
                            emailNotificationDetail=None,
                        ),
                        freightOnValue=None,
                        dutiesPayment=fedex.DutiesPaymentType(
                            payor=fedex.PayorType(
                                responsibleParty=fedex.ResponsiblePartyType(
                                    address=fedex.AddressType(
                                        streetLines=duty_billing_address.address_lines,
                                        city=duty_billing_address.city,
                                        stateOrProvinceCode=duty_billing_address.state_code,
                                        postalCode=duty_billing_address.postal_code,
                                        countryCode=duty_billing_address.country_code,
                                        residential=duty_billing_address.residential,
                                    ),
                                    contact=fedex.ResponsiblePartyContactType(
                                        personName=duty_billing_address.contact,
                                        emailAddress=duty_billing_address.email,
                                        phoneNumber=duty_billing_address.phone_number,
                                        phoneExtension=None,
                                        companyName=duty_billing_address.company_name,
                                        faxNumber=None,
                                    ),
                                    accountNumber=customs.duty.account_number,
                                    tins=(
                                        fedex.TinType(
                                            number=duty_billing_address.tax_id
                                        )
                                        if duty_billing_address.has_tax_info
                                        else None
                                    ),
                                )
                            ),
                            paymentType=provider_units.PaymentType.map(
                                getattr(customs.duty, "paid_by", None) or "sender"
                            ).value,
                        ),
                        commodities=[
                            fedex.CommodityType(
                                unitPrice=fedex.TotalDeclaredValueType(
                                    amount=lib.to_money(item.value_amount),
                                    currency=(
                                        packages.options.currency.state
                                        or customs.duty.currency
                                    ),
                                ),
                                additionalMeasures=None,
                                numberOfPieces=item.quantity,
                                quantity=item.quantity,
                                quantityUnits="EA",
                                customsValue=None,
                                countryOfManufacture=(
                                    item.origin_country or shipper.country_code
                                ),
                                cIMarksAndNumbers=None,
                                harmonizedCode=item.hs_code,
                                description=lib.text(
                                    item.title or item.description or "N/A", max=35
                                ),
                                name=None,
                                weight=fedex.WeightType(
                                    units=item.weight.unit,
                                    value=item.weight.value,
                                ),
                                exportLicenseNumber=None,
                                exportLicenseExpirationDate=None,
                                partNumber=item.sku,
                                purpose=None,
                                usmcaDetail=None,
                            )
                            for item in customs.commodities
                        ],
                        isDocumentOnly=package.parcel.is_document,
                        recipientCustomsId=None,
                        customsOption=None,
                        importerOfRecord=None,
                        generatedDocumentLocale=None,
                        exportDetail=None,
                        totalCustomsValue=None,
                        partiesToTransactionAreRelated=None,
                        declarationStatementDetail=None,
                        insuranceCharge=None,
                    )
                    if payload.customs is not None
                    else None
                ),
                smartPostInfoDetail=None,
                blockInsightVisibility=None,
                labelSpecification=fedex.LabelSpecificationType(
                    labelFormatType="COMMON2D",
                    labelOrder="SHIPPING_LABEL_FIRST",
                    customerSpecifiedDetail=None,
                    printedLabelOrigin=None,
                    labelStockType=label_format,
                    labelRotation=None,
                    imageType=label_type,
                    labelPrintingOrientation=None,
                    returnedDispositionDetail=None,
                ),
                shippingDocumentSpecification=(
                    fedex.ShippingDocumentSpecificationType(
                        generalAgencyAgreementDetail=None,
                        returnInstructionsDetail=None,
                        op900Detail=None,
                        usmcaCertificationOfOriginDetail=None,
                        usmcaCommercialInvoiceCertificationOfOriginDetail=None,
                        shippingDocumentTypes=["COMMERCIAL_INVOICE"],
                        certificateOfOrigin=None,
                        commercialInvoiceDetail=None,
                    )
                    if (
                        customs.commercial_invoice is True
                        and not options.fedex_electronic_trade_documents.state
                    )
                    else None
                ),
                rateRequestType=None,
                preferredCurrency=package.options.currency,
                totalPackageCount=len(packages),
                masterTrackingId=(
                    fedex.MasterTrackingIDType(
                        formId=None,
                        trackingIdType="[MASTER_ID_TYPE]",
                        uspsApplicationId=None,
                        trackingNumber="[MASTER_TRACKING_ID]",
                    )
                    if package_index > 1
                    else None
                ),
                requestedPackageLineItems=[
                    fedex.RequestedPackageLineItemType(
                        sequenceNumber=package_index,
                        subPackagingType=None,
                        customerReferences=None,
                        declaredValue=None,
                        weight=fedex.WeightType(
                            units=package.weight.unit,
                            value=package.weight.value,
                        ),
                        dimensions=(
                            fedex.DimensionsType(
                                length=package.length,
                                width=package.width,
                                height=package.height,
                                units=package.dimensions.unit,
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
                        groupPackageCount=None,
                        itemDescriptionForClearance=None,
                        contentRecord=None,
                        itemDescription=package.parcel.description,
                        variableHandlingChargeDetail=None,
                        packageSpecialServices=fedex.PackageSpecialServicesType(
                            specialServiceTypes=["SIGNATURE_OPTION"],
                            priorityAlertDetail=None,
                            signatureOptionType=(
                                package.options.fedex_signature_option.state
                                or "SERVICE_DEFAULT"
                            ),
                            signatureOptionDetail=None,
                            alcoholDetail=None,
                            dangerousGoodsDetail=None,
                            packageCODDetail=None,
                            pieceCountVerificationBoxCount=None,
                            batteryDetails=None,
                            dryIceWeight=None,
                        ),
                        trackingNumber=None,
                    )
                ],
            ),
            labelResponseOptions="LABEL",
            accountNumber=fedex.AccountNumberType(value=settings.account_number),
            shipAction="CONFIRM",
            processingOptionType=None,
            oneLabelAtATime=None,
        )
        for package_index, package in typing.cast(
            typing.List[typing.Tuple[int, units.Package]],
            enumerate(packages, 1),
        )
    ]

    return lib.Serializable(
        requests,
        lambda __: [lib.to_dict(_) for _ in __],
        dict(shipment_date=shipment_date),
    )
