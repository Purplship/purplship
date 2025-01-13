import karrio.schemas.fedex.shipping_request as fedex
import karrio.schemas.fedex.shipping_responses as shipping
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
    response = _response.deserialize()

    messages = provider_error.parse_error_response(response, settings)
    shipment = lib.identity(
        _extract_details(
            response["output"]["transactionShipments"][0],
            settings,
            ctx=_response.ctx,
        )
        if response.get("errors") is None
        and response.get("output") is not None
        and response.get("output").get("transactionShipments") is not None
        else None
    )

    return shipment, messages


def _extract_details(
    data: dict,
    settings: provider_utils.Settings,
    ctx: dict = {},
) -> models.ShipmentDetails:
    # fmt: off
    shipment = lib.to_object(shipping.TransactionShipmentType, data)
    service = provider_units.ShippingService.map(shipment.serviceType)
    pieceDocuments: typing.List[shipping.PackageDocuments] = sum(
        [_.packageDocuments for _ in shipment.pieceResponses],
        start=[],
    )

    tracking_number = shipment.masterTrackingNumber
    invoices = [_ for _ in shipment.shipmentDocuments if "INVOICE" in _.contentType]
    labels = [_ for _ in pieceDocuments if "LABEL" in _.contentType]

    invoice_type = invoices[0].docType if len(invoices) > 0 else "PDF"
    invoice = lib.identity(
        lib.bundle_base64(
            [_.encodedLabel or lib.request(url=_.url, decoder=lib.encode_base64) for _ in invoices],
            invoice_type,
        )
        if len(invoices) > 0
        else None
    )

    label_type = labels[0].docType if len(labels) > 0 else "PDF"
    label = lib.identity(
        lib.bundle_base64(
            [_.encodedLabel or lib.request(url=_.url, decoder=lib.encode_base64) for _ in labels],
            label_type,
        )
        if len(labels) > 0
        else None
    )
    # fmt: on

    return models.ShipmentDetails(
        carrier_id=settings.carrier_id,
        carrier_name=settings.carrier_name,
        tracking_number=tracking_number,
        shipment_identifier=tracking_number,
        label_type=label_type,
        docs=models.Documents(label=label, invoice=invoice),
        meta=dict(
            service_name=service.name_or_key,
            carrier_tracking_link=settings.tracking_url.format(tracking_number),
            trackingIdType=shipment.pieceResponses[0].trackingIdType,
            serviceCategory=shipment.pieceResponses[0].serviceCategory,
            fedex_carrier_code=lib.failsafe(
                lambda: shipment.completedShipmentDetail.carrierCode
            ),
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
        initializer=provider_units.shipping_options_initializer,
    )
    packages = lib.to_packages(
        payload.parcels,
        required=["weight"],
        options=options,
        presets=provider_units.PackagePresets,
        shipping_options_initializer=provider_units.shipping_options_initializer,
    )

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
    label_type, label_format = lib.identity(
        provider_units.LabelType.map(payload.label_type or "PDF_4x6").value
    )
    return_address = lib.to_address(payload.return_address)
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
            third_party=customs.duty_billing_address or billing_address or shipper,
        ).get(customs.duty.paid_by)
    )
    package_options = lambda _options: [
        option
        for _, option in _options.items()
        if option.state is not False and option.code in provider_units.PACKAGE_OPTIONS
    ]
    shipment_options = lambda _options: [
        option
        for _, option in _options.items()
        if option.state is not False and option.code in provider_units.SHIPMENT_OPTIONS
    ]
    hub_id = lib.identity(
        lib.text(options.fedex_smart_post_hub_id.state)
        or lib.text(settings.connection_config.smart_post_hub_id.state)
    )
    request_types = lib.identity(
        settings.connection_config.rate_request_types.state
        if any(settings.connection_config.rate_request_types.state or [])
        else ["LIST", "ACCOUNT", *([] if "currency" not in options else ["PREFERRED"])]
    )

    requests = fedex.ShippingRequestType(
        mergeLabelDocOption=None,
        requestedShipment=fedex.RequestedShipmentType(
            shipDatestamp=lib.fdate(shipment_date, "%Y-%m-%d"),
            totalDeclaredValue=lib.identity(
                fedex.TotalDeclaredValueType(
                    amount=lib.to_money(options.declared_value.state),
                    currency=options.currency.state or default_currency,
                )
                if options.declared_value.state
                else None
            ),
            shipper=fedex.ShipperType(
                address=fedex.AddressType(
                    streetLines=shipper.address_lines,
                    city=shipper.city,
                    stateOrProvinceCode=provider_utils.state_code(shipper),
                    postalCode=shipper.postal_code,
                    countryCode=shipper.country_code,
                    residential=shipper.residential,
                ),
                contact=fedex.ResponsiblePartyContactType(
                    personName=lib.text(shipper.contact, max=35),
                    emailAddress=shipper.email,
                    phoneNumber=(shipper.phone_number or "000-000-0000"),
                    phoneExtension=None,
                    companyName=lib.text(shipper.company_name, max=35),
                    faxNumber=None,
                ),
                tins=lib.identity(
                    fedex.TinType(number=shipper.tax_id) if shipper.has_tax_info else []
                ),
                deliveryInstructions=None,
            ),
            soldTo=None,
            recipients=[
                fedex.ShipperType(
                    address=fedex.AddressType(
                        streetLines=recipient.address_lines,
                        city=recipient.city,
                        stateOrProvinceCode=provider_utils.state_code(recipient),
                        postalCode=recipient.postal_code,
                        countryCode=recipient.country_code,
                        residential=recipient.residential,
                    ),
                    contact=fedex.ResponsiblePartyContactType(
                        personName=lib.text(recipient.person_name, max=35),
                        emailAddress=recipient.email,
                        phoneNumber=(
                            recipient.phone_number
                            or shipper.phone_number
                            or "000-000-0000"
                        ),
                        phoneExtension=None,
                        companyName=lib.text(recipient.company_name, max=35),
                        faxNumber=None,
                    ),
                    tins=(
                        fedex.TinType(number=recipient.tax_id)
                        if recipient.has_tax_info
                        else []
                    ),
                    deliveryInstructions=None,
                )
            ],
            recipientLocationNumber=None,
            pickupType="DROPOFF_AT_FEDEX_LOCATION",
            serviceType=service,
            packagingType=lib.identity(
                provider_units.PackagingType.map(
                    packages.package_type or "your_packaging"
                ).value
            ),
            totalWeight=packages.weight.LB,
            origin=lib.identity(
                fedex.OriginType(
                    address=fedex.AddressType(
                        streetLines=return_address.address_lines,
                        city=return_address.city,
                        stateOrProvinceCode=provider_utils.state_code(return_address),
                        postalCode=return_address.postal_code,
                        countryCode=return_address.country_code,
                        residential=return_address.residential,
                    ),
                    contact=fedex.ResponsiblePartyContactType(
                        personName=lib.text(return_address.contact, max=35),
                        emailAddress=return_address.email,
                        phoneNumber=return_address.phone_number,
                        phoneExtension=None,
                        companyName=lib.text(return_address.company_name, max=35),
                        faxNumber=None,
                    ),
                )
                if payload.return_address is not None
                else None
            ),
            shippingChargesPayment=fedex.ShippingChargesPaymentType(
                paymentType=provider_units.PaymentType.map(
                    payment.paid_by
                ).value_or_key,
                payor=fedex.PayorType(
                    responsibleParty=fedex.ResponsiblePartyType(
                        address=lib.identity(
                            fedex.AddressType(
                                streetLines=billing_address.address_lines,
                                city=billing_address.city,
                                stateOrProvinceCode=provider_utils.state_code(
                                    billing_address
                                ),
                                postalCode=billing_address.postal_code,
                                countryCode=billing_address.country_code,
                                residential=billing_address.residential,
                            )
                            if billing_address.address is not None
                            else None
                        ),
                        contact=lib.identity(
                            fedex.ResponsiblePartyContactType(
                                personName=lib.text(billing_address.contact, max=35),
                                emailAddress=billing_address.email,
                                phoneNumber=billing_address.phone_number,
                                phoneExtension=None,
                                companyName=lib.text(
                                    billing_address.company_name, max=35
                                ),
                                faxNumber=None,
                            )
                            if billing_address.address is not None
                            else None
                        ),
                        accountNumber=lib.identity(
                            fedex.AccountNumberType(value=payment.account_number)
                            if payment.paid_by != "sender" and payment.account_number
                            else None
                        ),
                        tins=lib.identity(
                            fedex.TinType(number=billing_address.tax_id)
                            if billing_address.has_tax_info
                            else []
                        ),
                    )
                ),
            ),
            shipmentSpecialServices=lib.identity(
                fedex.ShipmentSpecialServicesType(
                    specialServiceTypes=lib.identity(
                        [option.code for option in shipment_options(packages.options)]
                        if shipment_options(packages.options)
                        else None
                    ),
                    etdDetail=lib.identity(
                        fedex.EtdDetailType(
                            attributes=lib.identity(
                                None
                                if options.doc_files.state
                                or options.doc_references.state
                                else ["POST_SHIPMENT_UPLOAD_REQUESTED"]
                            ),
                            attachedDocuments=lib.identity(
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
                                else []
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
                    shipmentCODDetail=lib.identity(
                        fedex.ShipmentCODDetailType(
                            addTransportationChargesDetail=None,
                            codRecipient=None,
                            remitToName=None,
                            codCollectionType="CASH",
                            financialInstitutionContactAndAddress=None,
                            codCollectionAmount=fedex.TotalDeclaredValueType(
                                amount=lib.to_money(options.cash_on_delivery.state),
                                currency=lib.identity(
                                    options.currency.state or default_currency
                                ),
                            ),
                            returnReferenceIndicatorType=None,
                            shipmentCodAmount=None,
                        )
                        if options.cash_on_delivery.state
                        else None
                    ),
                    shipmentDryIceDetail=None,
                    internationalControlledExportDetail=None,
                    homeDeliveryPremiumDetail=None,
                )
                if any(shipment_options(packages.options))
                else None
            ),
            emailNotificationDetail=lib.identity(
                fedex.RequestedShipmentEmailNotificationDetailType(
                    aggregationType="PER_SHIPMENT",
                    emailNotificationRecipients=[
                        fedex.EmailNotificationRecipientType(
                            name=recipient.person_name,
                            emailNotificationRecipientType="RECIPIENT",
                            emailAddress=lib.identity(
                                options.email_notification_to.state or recipient.email
                            ),
                            notificationFormatType="HTML",
                            notificationType="EMAIL",
                            notificationEventType=[
                                "ON_DELIVERY",
                                "ON_EXCEPTION",
                                "ON_SHIPMENT",
                            ],
                        )
                    ],
                    personalMessage=None,
                )
                if options.email_notification.state
                or any([options.email_notification_to.state, recipient.email])
                else None
            ),
            expressFreightDetail=None,
            variableHandlingChargeDetail=None,
            customsClearanceDetail=lib.identity(
                fedex.CustomsClearanceDetailType(
                    regulatoryControls=None,
                    brokers=[],
                    commercialInvoice=fedex.CommercialInvoiceType(
                        originatorName=lib.text(
                            shipper.company_name or shipper.contact, max=35
                        ),
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
                        paymentType=provider_units.PaymentType.map(
                            customs.duty.paid_by
                        ).value,
                        payor=lib.identity(
                            fedex.PayorType(
                                responsibleParty=fedex.ResponsiblePartyType(
                                    address=lib.identity(
                                        fedex.AddressType(
                                            streetLines=duty_billing_address.address_lines,
                                            city=duty_billing_address.city,
                                            stateOrProvinceCode=provider_utils.state_code(
                                                duty_billing_address
                                            ),
                                            postalCode=duty_billing_address.postal_code,
                                            countryCode=duty_billing_address.country_code,
                                            residential=duty_billing_address.residential,
                                        )
                                        if duty_billing_address.address
                                        and customs.duty.account_number
                                        else None
                                    ),
                                    contact=lib.identity(
                                        fedex.ResponsiblePartyContactType(
                                            personName=lib.text(
                                                duty_billing_address.contact, max=35
                                            ),
                                            emailAddress=duty_billing_address.email,
                                            phoneNumber=duty_billing_address.phone_number,
                                            phoneExtension=None,
                                            companyName=lib.text(
                                                duty_billing_address.company_name,
                                                max=35,
                                            ),
                                            faxNumber=None,
                                        )
                                        if duty_billing_address.address
                                        and customs.duty.account_number
                                        else None
                                    ),
                                    accountNumber=lib.identity(
                                        fedex.AccountNumberType(
                                            value=payment.account_number
                                        )
                                        if customs.duty.paid_by != "sender"
                                        and customs.duty.account_number
                                        else None
                                    ),
                                    tins=lib.identity(
                                        fedex.TinType(
                                            number=duty_billing_address.tax_id,
                                            tinType="FEDERAL",
                                        )
                                        if duty_billing_address.has_tax_info
                                        else []
                                    ),
                                )
                            )
                            if duty_billing_address.address
                            else None
                        ),
                    ),
                    commodities=[
                        fedex.CommodityType(
                            unitPrice=lib.identity(
                                fedex.TotalDeclaredValueType(
                                    amount=lib.to_money(item.value_amount),
                                    currency=(
                                        item.value_currency
                                        or packages.options.currency.state
                                        or default_currency
                                    ),
                                )
                                if item.value_amount
                                else None
                            ),
                            additionalMeasures=[],
                            numberOfPieces=item.quantity,
                            quantity=item.quantity,
                            quantityUnits="PCS",
                            customsValue=fedex.CustomsValueType(
                                amount=lib.identity(
                                    lib.to_money(
                                        item.value_amount or 1.0 * item.quantity
                                    )
                                ),
                                currency=lib.identity(
                                    item.value_currency
                                    or packages.options.currency.state
                                    or default_currency
                                ),
                            ),
                            countryOfManufacture=(
                                item.origin_country or shipper.country_code
                            ),
                            cIMarksAndNumbers=None,
                            harmonizedCode=item.hs_code,
                            description=lib.text(
                                item.description or item.title or "N/A", max=35
                            ),
                            name=lib.text(item.title, max=35),
                            weight=fedex.WeightType(
                                units=weight_unit.value,
                                value=item.weight,
                            ),
                            exportLicenseNumber=None,
                            exportLicenseExpirationDate=None,
                            partNumber=item.sku,
                            purpose=None,
                            usmcaDetail=None,
                        )
                        for item in customs.commodities
                    ],
                    isDocumentOnly=packages.is_document,
                    recipientCustomsId=None,
                    customsOption=None,
                    importerOfRecord=None,
                    generatedDocumentLocale=None,
                    exportDetail=None,
                    totalCustomsValue=lib.identity(
                        fedex.TotalDeclaredValueType(
                            amount=lib.to_money(packages.options.declared_value.state),
                            currency=lib.identity(
                                packages.options.currency.state or default_currency
                            ),
                        )
                        if lib.to_money(packages.options.declared_value.state)
                        is not None
                        else None
                    ),
                    partiesToTransactionAreRelated=None,
                    declarationStatementDetail=None,
                    insuranceCharge=fedex.TotalDeclaredValueType(
                        amount=packages.options.insurance.state or 0.0,
                        currency=lib.identity(
                            packages.options.currency.state or default_currency
                        ),
                    ),
                )
                if payload.customs is not None
                else None
            ),
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
                if hub_id and service == "SMART_POST"
                else None
            ),
            blockInsightVisibility=False,
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
            shippingDocumentSpecification=lib.identity(
                fedex.ShippingDocumentSpecificationType(
                    generalAgencyAgreementDetail=None,
                    returnInstructionsDetail=None,
                    op900Detail=None,
                    usmcaCertificationOfOriginDetail=None,
                    usmcaCommercialInvoiceCertificationOfOriginDetail=None,
                    shippingDocumentTypes=["COMMERCIAL_INVOICE"],
                    certificateOfOrigin=None,
                    commercialInvoiceDetail=fedex.CertificateOfOriginType(
                        customerImageUsages=[],
                        documentFormat=fedex.DocumentFormatType(
                            provideInstructions=None,
                            optionsRequested=None,
                            stockType="PAPER_LETTER",
                            dispositions=[],
                            locale=None,
                            docType="PDF",
                        ),
                    ),
                )
                if (
                    customs.commercial_invoice is True
                    and not packages.options.fedex_electronic_trade_documents.state
                )
                else None
            ),
            rateRequestType=request_types,
            preferredCurrency=packages.options.currency.state,
            totalPackageCount=len(packages),
            masterTrackingId=None,
            requestedPackageLineItems=[
                fedex.RequestedPackageLineItemType(
                    sequenceNumber=None,
                    subPackagingType="OTHER",
                    customerReferences=[],
                    declaredValue=fedex.TotalDeclaredValueType(
                        amount=lib.identity(
                            lib.to_money(package.total_value)
                            or lib.to_money(packages.options.declared_value.state)
                            or 1.0
                        ),
                        currency=lib.identity(
                            packages.options.currency.state or default_currency
                        ),
                    ),
                    weight=fedex.WeightType(
                        units=package.weight.unit,
                        value=package.weight.value,
                    ),
                    dimensions=lib.identity(
                        fedex.DimensionsType(
                            length=package.length.value,
                            width=package.width.value,
                            height=package.height.value,
                            units=dim_unit.value,
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
                    groupPackageCount=1,
                    itemDescriptionForClearance=None,
                    contentRecord=[],
                    itemDescription=package.parcel.description,
                    variableHandlingChargeDetail=None,
                    packageSpecialServices=fedex.PackageSpecialServicesType(
                        specialServiceTypes=[
                            option.code for option in package_options(package.options)
                        ],
                        priorityAlertDetail=None,
                        signatureOptionType=lib.identity(
                            provider_units.SignatureOptionType.map(
                                package.options.fedex_signature_option.state
                            ).value
                            or "SERVICE_DEFAULT"
                        ),
                        signatureOptionDetail=None,
                        alcoholDetail=None,
                        dangerousGoodsDetail=None,
                        packageCODDetail=None,
                        pieceCountVerificationBoxCount=None,
                        batteryDetails=[],
                        dryIceWeight=None,
                    ),
                    trackingNumber=None,
                )
                for package in packages
            ],
        ),
        labelResponseOptions="LABEL",
        accountNumber=fedex.AccountNumberType(value=settings.account_number),
        shipAction="CONFIRM",
        processingOptionType=None,
        oneLabelAtATime=False,
    )

    return lib.Serializable(
        requests,
        lib.to_dict,
        dict(
            shipment_date=shipment_date,
            label_type=label_type,
            label_format=label_format,
        ),
    )
