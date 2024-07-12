# Generated by Django 4.2.11 on 2024-06-11 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("providers", "0074_alter_haypostsettings_customerid_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="haypostsettings",
            name="customerId",
        ),
        migrations.RemoveField(
            model_name="haypostsettings",
            name="customerType",
        ),
        migrations.AddField(
            model_name="haypostsettings",
            name="customer_id",
            field=models.CharField(default=-1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="haypostsettings",
            name="customer_type",
            field=models.CharField(default=1, max_length=100),
        ),
        migrations.AlterField(
            model_name="haypostsettings",
            name="password",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="haypostsettings",
            name="username",
            field=models.CharField(max_length=100),
        ),
    ]