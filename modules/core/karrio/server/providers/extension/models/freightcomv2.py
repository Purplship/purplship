from django.db import models
from karrio.server.providers.models.carrier import Carrier


class Freightcomv2Settings(Carrier):
    CARRIER_NAME = 'freightcomv2'

    class Meta:
        db_table = "freightcomv2-settings"
        verbose_name = 'Freightcomv2 Settings'
        verbose_name_plural = 'Freightcomv2 Settings'

    apiKey = models.CharField(max_length=200)

    @property
    def carrier_name(self) -> str:
        return self.CARRIER_NAME


SETTINGS = Freightcomv2Settings
