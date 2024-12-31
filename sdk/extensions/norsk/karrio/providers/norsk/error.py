
import typing
import karrio.lib as lib
import karrio.core.models as models
import karrio.providers.norsk.utils as provider_utils


def parse_error_response(
    response: lib.Element,
    settings: provider_utils.Settings,
    **kwargs,
) -> typing.List[models.Message]:
    errors = []  # compute the carrier error object list

    return [
        models.Message(
            carrier_id=settings.carrier_id,
            carrier_name=settings.carrier_name,
            code="",  # set the carrier error code
            message="",  # set the carrier error message
            details={**kwargs},
        )
        for error in errors
    ]
