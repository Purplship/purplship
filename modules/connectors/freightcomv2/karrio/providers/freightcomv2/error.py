
import typing
import karrio.lib as lib
import karrio.core.models as models
import karrio.providers.freightcomv2.utils as provider_utils


def parse_error_response(
    response: dict,
    settings: provider_utils.Settings,
    **kwargs,
) -> typing.List[models.Message]:
    errors = []  # compute the carrier error object list

    return [
        models.Message(
            carrier_id=settings.carrier_id,
            carrier_name=settings.carrier_name,
            code="",
            message="",
            details={**kwargs},
        )
        for error in errors
    ]
