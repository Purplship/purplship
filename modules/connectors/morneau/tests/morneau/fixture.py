import datetime

import karrio
import karrio.lib as lib
import karrio.providers.morneau.units as units

username = "imprimerie.gauvin"
password = "test"
caller_id = "0000005991"
billed_id = 99999
division = "Morneau"
carrier_name = "morneau"

expiry = datetime.datetime.now() + datetime.timedelta(hours=1)

cached_auth = {
    f"{carrier_name}|{units.ServiceType.tracking_service.value}|auth_token": dict(
        token="authorizationCode",
        expiry=expiry.strftime("%Y-%m-%d %H:%M:%S"),
    ),
    f"{carrier_name}|{units.ServiceType.shipping_service.value}|auth_token": dict(
        token="authorizationCode",
        expiry=expiry.strftime("%Y-%m-%d %H:%M:%S"),
    ),
    f"{carrier_name}|{units.ServiceType.rates_service.value}|auth_token": dict(
        token="authorizationCode",
        expiry=expiry.strftime("%Y-%m-%d %H:%M:%S"),
    )

}

gateway = karrio.gateway["morneau"].create(
    dict(
        username=username,
        password=password,
        billed_id=billed_id,
        caller_id=caller_id,
        cache=lib.Cache(**cached_auth)

    )
)
