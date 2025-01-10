import karrio.core.units as units
import karrio.lib as lib


class PackagingType(lib.StrEnum):
    """ Carrier specific packaging type """
    PACKAGE = "Pallet"

    """ Unified Packaging type mapping """
    pallet = PACKAGE


class ShippingService(lib.Enum):
    """ Carrier specific services """
    morneau_standard_service = "Groupe Morneau Standard Service"


class ShippingOption(lib.Enum):
    """ Carrier specific options """
    # morneau_option = lib.OptionEnum("code")

    """ Unified Option type mapping """
    # insurance = morneau_coverage  #  maps unified karrio option to carrier specific

    pass


def shipping_options_initializer(
    options: dict,
    package_options: units.ShippingOptions = None,
) -> units.ShippingOptions:
    """
    Apply default values to the given options.
    """

    if package_options is not None:
        options.update(package_options.content)

    def items_filter(key: str) -> bool:
        return key in ShippingOption  # type: ignore

    return units.ShippingOptions(options, ShippingOption, items_filter=items_filter)


class TrackingStatus(lib.Enum):
    on_hold = ["on_hold"]
    delivered = ["delivered"]
    in_transit = ["in_transit"]
    delivery_failed = ["delivery_failed"]
    delivery_delayed = ["delivery_delayed"]
    out_for_delivery = ["out_for_delivery"]
    ready_for_pickup = ["ready_for_pickup"]


class ServiceType(lib.Enum):
    """ Carrier specific service types """
    tracking_service = ["tracking_service"]
    shipping_service = ["shipping_service"]
    rates_service = ["rates_service"]


class CommoditiesType(lib.Enum):
    """ Carrier specific Commodities types """
    rendezvous = ["RENDEZVOUS"]
    pcamlivr = ["PCAMLIVR"]
    home = ["HOME"]
