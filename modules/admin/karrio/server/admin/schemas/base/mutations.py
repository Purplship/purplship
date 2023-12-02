import typing
import logging
import strawberry
from constance import config
from django.conf import settings
from strawberry.types import Info
import django.db.models as models
import django.db.transaction as transaction

import karrio.server.conf as conf
import karrio.server.core.utils as core
import karrio.server.graph.utils as utils
import karrio.server.admin.utils as admin
import karrio.server.admin.forms as forms
import karrio.server.pricing.models as pricing
import karrio.server.providers.models as providers
import karrio.server.admin.schemas.base.types as types
import karrio.server.admin.schemas.base.inputs as inputs
import karrio.server.graph.schemas.base.mutations as base

logger = logging.getLogger(__name__)


@strawberry.type
class CreateUserMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @admin.superuser_required
    @transaction.atomic
    def mutate(
        info: Info,
        organization_id: typing.Optional[str] = strawberry.UNSET,
        **input: inputs.CreateUserMutationInput,
    ) -> "CreateUserMutation":
        try:
            if settings.MULTI_ORGANIZATIONS:
                import karrio.server.orgs.models as orgs

                org_id = organization_id or info.context.request.org.id
                orgs.OrganizationInvitation.objects.create(
                    organization_id=org_id,
                    invitee_identifier=input["email"],
                    invited_by_id=info.context.request.user.id,
                )

            form = forms.CreateUserForm(input)
            user = form.save()

            return CreateUserMutation(user=user)  # type:ignore
        except Exception as e:
            logger.exception(e)
            raise e


@strawberry.type
class UpdateUserMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @admin.superuser_required
    def mutate(
        info: Info,
        email: str,
        **input: inputs.UpdateUserMutationInput,
    ) -> "UpdateUserMutation":
        instance = types.User.objects.filter(
            models.Q(email=email)
            & (
                models.Q(orgs_organization__users__id=info.context.request.user.id)
                if settings.MULTI_ORGANIZATIONS
                else models.Q()
            )
        ).first()

        if not instance:
            return UpdateUserMutation(user=None)  # type:ignore

        for k, v in input.items():
            setattr(instance, k, v)

        instance.save()

        return UpdateUserMutation(user=instance)  # type:ignore


@strawberry.type
class DeleteUserMutation(base.DeleteMutation):
    id: int = strawberry.UNSET


@strawberry.type
class InstanceConfigMutation(utils.BaseMutation):
    configs: typing.Optional[types.InstanceConfigType] = None

    @staticmethod
    @utils.authentication_required
    @admin.staff_required
    def mutate(
        info: Info,
        **input: inputs.InstanceConfigMutationInput,
    ) -> "InstanceConfigMutation":
        for k, v in input.items():
            setattr(config, k, v)
        return InstanceConfigMutation(config=types.InstanceConfigType.resolve(info))


@strawberry.type
class CreateConnectionMutation(utils.BaseMutation):
    connection: typing.Optional[types.SystemCarrierConnectionType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    @admin.staff_required
    def mutate(info: Info, **input) -> "CreateConnectionMutation":
        data = input.copy()

        serializer = base.serializers.ConnectionModelSerializer(
            data=data,
            context=info.context.request,
        )

        serializer.is_valid(raise_exception=True)
        connection = serializer.save()

        connection.is_system = True
        connection.save()

        return CreateConnectionMutation(  # type:ignore
            connection=types.base.ConnectionType.parse(
                providers.Carrier.objects.get(pk=connection.pk),
                types.SystemCarrierSettings,
            )
        )


@strawberry.type
class UpdateConnectionMutation(utils.BaseMutation):
    connection: typing.Optional[types.SystemCarrierConnectionType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    @admin.staff_required
    def mutate(info: Info, **input) -> "UpdateConnectionMutation":
        try:
            data = input.copy()
            settings_data = typing.cast(dict, next(iter(data.values()), {}))
            id = settings_data.get("id")
            instance = providers.Carrier.objects.get(id=id)

            serializer = base.serializers.PartialConnectionModelSerializer(
                instance,
                data=data,
                partial=True,
                context=info.context.request,
            )
            serializer.is_valid(raise_exception=True)

            if "services" in settings_data:
                base.save_many_to_many_data(
                    "services",
                    base.serializers.ServiceLevelModelSerializer,
                    instance.settings,
                    payload=settings_data,
                    context=info.context.request,
                )

            connection = serializer.save()

            return UpdateConnectionMutation(  # type:ignore
                connection=types.base.ConnectionType.parse(
                    connection, types.SystemCarrierSettings
                )
            )
        except Exception as e:
            logger.exception(e)
            raise e


@strawberry.type
class CreateSurchargeMutation(utils.BaseMutation):
    surcharge: typing.Optional[types.SurchargeType] = None

    @staticmethod
    @utils.authentication_required
    @admin.staff_required
    def mutate(
        info: Info,
        **input: inputs.CreateSurchargeMutationInput,
    ) -> "CreateConnectionMutation":
        carrier_accounts = input.pop("carrier_accounts", [])
        instance = pricing.Surcharge(**input)

        instance.save()

        if any(carrier_accounts):
            instance.carrier_accounts.set(carrier_accounts)

        return UpdateSurchargeMutation(
            surcharge=pricing.Surcharge.objects.get(id=instance.id)
        )  # type:ignore


@strawberry.type
class UpdateSurchargeMutation(utils.BaseMutation):
    surcharge: typing.Optional[types.SurchargeType] = None

    @staticmethod
    @utils.authentication_required
    @admin.staff_required
    @transaction.atomic
    def mutate(
        info: Info,
        id: str,
        **input: inputs.UpdateSurchargeMutationInput,
    ) -> "UpdateSurchargeMutation":
        instance = pricing.Surcharge.objects.get(id=id)
        carrier_accounts = input.pop("carrier_accounts", [])

        for k, v in input.items():
            setattr(instance, k, v)

        if any(carrier_accounts):
            instance.carrier_accounts.set(carrier_accounts)

        instance.save()

        return UpdateSurchargeMutation(
            surcharge=pricing.Surcharge.objects.get(id=id)
        )  # type:ignore
