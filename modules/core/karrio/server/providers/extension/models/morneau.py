from django.db import models
from karrio.server.providers.models.carrier import Carrier


class MorneauSettings(Carrier):
    CARRIER_NAME = "morneau"

    class Meta:
        db_table = "morneau-settings"
        verbose_name = "Morneau Settings"
        verbose_name_plural = "Morneau Settings"

    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    billed_id = models.IntegerField()
    caller_id = models.CharField(max_length=200)
    division = models.CharField(max_length=100, default="Morneau")

    @property
    def carrier_name(self) -> str:
        return self.CARRIER_NAME


SETTINGS = MorneauSettings
