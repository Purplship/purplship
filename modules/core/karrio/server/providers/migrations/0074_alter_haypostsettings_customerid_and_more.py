# Generated by Django 4.2.11 on 2024-06-11 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("providers", "0073_remove_haypostsettings_account_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="haypostsettings",
            name="customerId",
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name="haypostsettings",
            name="customerType",
            field=models.CharField(default=1, max_length=50),
        ),
    ]