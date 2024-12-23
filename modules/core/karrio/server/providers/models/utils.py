import django.db.models as models
import django.core.cache as caching

import karrio.lib as lib


def has_rate_sheet(carrier_name: str):
    def decorator(model: models.Model):
        # Add a rate sheet relation to the model
        model.add_to_class(
            "rate_sheet",
            models.ForeignKey(
                "RateSheet",
                null=True,
                blank=True,
                on_delete=models.SET_NULL,
            ),
        )

        # Add a service list property to the model
        setattr(
            model,
            "service_list",
            property(
                lambda self: (
                    self.services
                    if self.rate_sheet is None and hasattr(self, "services")
                    else self.rate_sheet.services.all()
                )
            ),
        )

        # Add a default services property to the model
        # skip if it already exists (overridden)
        if not hasattr(model, "default_services"):
            setattr(
                model,
                "default_services",
                property(
                    lambda self: lib.to_dict(
                        getattr(
                            getattr(
                                __import__(
                                    f"karrio.mappers.{carrier_name}", fromlist=["units"]
                                ),
                                "units",
                                None,
                            ),
                            "DEFAULT_SERVICES",
                            [],
                        )
                    )
                ),
            )

        return model

    return decorator
