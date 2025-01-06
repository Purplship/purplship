import strawberry
import typing
import logging
import datetime
from strawberry.types import Info
from rest_framework import exceptions
from django.utils.http import urlsafe_base64_decode
from django.contrib.contenttypes.models import ContentType
from django_email_verification import confirm as email_verification
from django_otp.plugins.otp_email import models as otp
from django.utils.translation import gettext_lazy as _
from django.db import transaction

from karrio.server.core.utils import ConfirmationToken, send_email
from karrio.server.user.serializers import TokenSerializer
from karrio.server.conf import settings
from karrio.server.serializers import (
    save_many_to_many_data,
    process_dictionaries_mutations,
)
import karrio.server.providers.serializers as providers_serializers
import karrio.server.manager.serializers as manager_serializers
import karrio.server.graph.schemas.base.inputs as inputs
import karrio.server.graph.schemas.base.types as types
import karrio.server.graph.serializers as serializers
import karrio.server.providers.models as providers
import karrio.server.manager.models as manager
import karrio.server.core.gateway as gateway
import karrio.server.graph.models as graph
import karrio.server.graph.forms as forms
import karrio.server.graph.utils as utils
import karrio.server.user.models as auth
import karrio.server.iam.models as iam
import karrio.lib as lib

logger = logging.getLogger(__name__)


@strawberry.type
class UserUpdateMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(info: Info, **input: inputs.UpdateUserInput) -> "UserUpdateMutation":
        instance = types.User.objects.get(id=info.context.request.user.id)

        serializer = serializers.UserModelSerializer(
            instance,
            partial=True,
            data=input,
            context=info.context.request,
        )

        serializer.is_valid(raise_exception=True)

        return UserUpdateMutation(user=serializer.save())  # type:ignore


@strawberry.type
class WorkspaceConfigMutation(utils.BaseMutation):
    workspace_config: typing.Optional[types.WorkspaceConfigType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required(["manage_team"])
    def mutate(
        info: Info, **input: inputs.WorkspaceConfigMutationInput
    ) -> "WorkspaceConfigMutation":
        data = dict(config=input.copy())
        workspace = auth.WorkspaceConfig.access_by(info.context.request).first()

        serializer = serializers.WorkspaceConfigModelSerializer(
            workspace,
            partial=workspace is not None,
            data=process_dictionaries_mutations(["config"], data, workspace),
            context=info.context.request,
        )

        serializer.is_valid(raise_exception=True)

        return WorkspaceConfigMutation(
            workspace_config=serializer.save()
        )  # type:ignore


@strawberry.type
class TokenMutation(utils.BaseMutation):
    token: typing.Optional[types.TokenType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info,
        key: str = None,
        refresh: bool = None,
        password: str = None,
    ) -> "UserUpdateMutation":
        tokens = auth.Token.access_by(info.context.request).filter(key=key)

        if refresh:
            if len(password or "") == 0:
                raise exceptions.ValidationError(
                    {"password": "Password is required to refresh token"}
                )

            if not info.context.request.user.check_password(password):
                raise exceptions.ValidationError({"password": "Invalid password"})

            if any(tokens):
                tokens.delete()

        else:
            return TokenMutation(token=tokens.first())  # type:ignore

        token = (
            TokenSerializer.map(data={}, context=info.context.request).save().instance
        )

        return TokenMutation(token=token)  # type:ignore


@strawberry.type
class CreateAPIKeyMutation(utils.BaseMutation):
    api_key: typing.Optional[types.APIKeyType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required()
    @utils.password_required
    def mutate(
        info: Info, password: str, **input: inputs.CreateAPIKeyMutationInput
    ) -> "CreateAPIKeyMutation":
        context = info.context.request
        data = input.copy()
        permissions = data.pop("permissions", [])
        api_key = TokenSerializer.map(data=data, context=context).save().instance

        if any(permissions):
            _auth_ctx = (
                context.token
                if hasattr(getattr(info.context.request, "token", None), "permissions")
                else context.user
            )
            _ctx_permissions = getattr(_auth_ctx, "permissions", [])
            _invalid_permissions = [_ for _ in permissions if _ not in _ctx_permissions]

            if any(_invalid_permissions):
                raise exceptions.ValidationError({"permissions": "Invalid permissions"})

            _ctx = iam.ContextPermission.objects.create(
                object_pk=api_key.pk,
                content_object=api_key,
                content_type=ContentType.objects.get_for_model(api_key),
            )
            _ctx.groups.set(auth.Group.objects.filter(name__in=permissions))

        return CreateAPIKeyMutation(
            api_key=auth.Token.access_by(context).get(key=api_key.key)
        )  # type:ignore


@strawberry.type
class DeleteAPIKeyMutation(utils.BaseMutation):
    label: typing.Optional[str] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    @utils.password_required
    def mutate(
        info: Info, password: str, **input: inputs.DeleteAPIKeyMutationInput
    ) -> "DeleteAPIKeyMutation":
        api_key = auth.Token.access_by(info.context.request).get(**input)
        label = api_key.label
        api_key.delete()

        return DeleteAPIKeyMutation(label=label)  # type:ignore


@strawberry.type
class RequestEmailChangeMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    @utils.password_required
    def mutate(
        info: Info, email: str, password: str, redirect_url: str
    ) -> "RequestEmailChangeMutation":
        try:
            token = ConfirmationToken.for_data(
                user=info.context.request.user,
                data=dict(new_email=email),
            )

            send_email(
                emails=[email],
                subject="Confirm your new email address",
                email_template="karrio/email_change_email.html",
                text_template="karrio/email_change_email.txt",
                context=dict(
                    token=token,
                    link=redirect_url,
                ),
                expiry=(datetime.datetime.now() + datetime.timedelta(hours=2)),
            )
        except Exception as e:
            logger.exception(e)
            raise e

        return RequestEmailChangeMutation(user=info.context.request.user)  # type:ignore


@strawberry.type
class ConfirmEmailChangeMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(info: Info, token: str) -> "ConfirmEmailChangeMutation":
        validated_token = ConfirmationToken(token)
        user = info.context.request.user

        if user.id != validated_token["user_id"]:
            raise exceptions.ValidationError(
                {"token": "auth.Token is invalid or expired"}
            )

        if user.email == validated_token["new_email"]:
            raise exceptions.APIException("Email is already confirmed")

        user.email = validated_token["new_email"]
        user.save()

        return ConfirmEmailChangeMutation(
            user=types.User.objects.get(id=validated_token["user_id"])
        )  # type:ignore


@strawberry.type
class RegisterUserMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    def mutate(
        info: Info, **input: inputs.RegisterUserMutationInput
    ) -> "RegisterUserMutation":
        if settings.ALLOW_SIGNUP == False:
            raise Exception(
                "Signup is not allowed. "
                "Please contact your administrator to create an account."
            )

        try:
            form = forms.SignUpForm(input)
            user = form.save()

            return RegisterUserMutation(user=user)  # type:ignore
        except Exception as e:
            logger.exception(e)
            raise e


@strawberry.type
class ConfirmEmailMutation(utils.BaseMutation):
    success: bool = False

    @staticmethod
    def mutate(info: Info, token: str) -> "ConfirmEmailMutation":
        try:
            success, _ = email_verification.verify_token(token)

            return ConfirmEmailMutation(success=success)  # type:ignore
        except Exception as e:
            logger.exception(e)
            raise e


@strawberry.type
class ChangePasswordMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info, **input: inputs.ChangePasswordMutationInput
    ) -> "ChangePasswordMutation":
        form = forms.PasswordChangeForm(info.context.request.user, data=input)
        if form.is_valid():
            user = form.save()
            return ChangePasswordMutation(user=user)  # type:ignore
        else:
            raise exceptions.ValidationError(form.errors)


@strawberry.type
class RequestPasswordResetMutation(utils.BaseMutation):
    email: str = strawberry.UNSET
    redirect_url: str = strawberry.UNSET

    @staticmethod
    def mutate(
        info: Info, **input: inputs.RequestPasswordResetMutationInput
    ) -> "RequestPasswordResetMutation":
        form = forms.ResetPasswordRequestForm(data=input)

        if form.is_valid():
            form.save(request=info.context.request)
            return RequestPasswordResetMutation(**form.cleaned_data)  # type:ignore
        else:
            raise exceptions.ValidationError(form.errors)


@strawberry.type
class ConfirmPasswordResetMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    def get_user(uidb64):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = types.User._default_manager.get(pk=uid)
        except (
            TypeError,
            ValueError,
            OverflowError,
            types.User.DoesNotExist,
            exceptions.ValidationError,
        ):
            user = None
        return user

    @staticmethod
    def mutate(
        info: Info, **input: inputs.ConfirmPasswordResetMutationInput
    ) -> "ConfirmPasswordResetMutation":
        uuid = input.get("uid")
        user = ConfirmPasswordResetMutation.get_user(uuid)  # type:ignore
        form = forms.ConfirmPasswordResetForm(user, data=input)

        if form.is_valid():
            return ConfirmPasswordResetMutation(user=form.save())  # type:ignore
        else:
            raise exceptions.ValidationError(form.errors)


@strawberry.type
class EnableMultiFactorMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info, **input: inputs.EnableMultiFactorMutationInput
    ) -> "EnableMultiFactorMutation":
        # Retrieve a default device or create a new one.
        device = otp.EmailDevice.objects.filter(
            user__id=info.context.request.user.id
        ).first()
        if device is None:
            device = otp.EmailDevice.objects.create(
                name="default",
                confirmed=False,
                user=info.context.request.user,
            )

        # Send and email challenge if the device isn't confirmed yet.
        if device.confirmed == False:
            device.generate_challenge()

        return EnableMultiFactorMutation(  # type:ignore
            user=types.User.objects.get(pk=info.context.request.user.id)
        )


@strawberry.type
class ConfirmMultiFactorMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info, **input: inputs.ConfirmMultiFactorMutationInput
    ) -> "ConfirmMultiFactorMutation":
        token = input.get("token")
        # Retrieve a default device or create a new one.
        device = otp.EmailDevice.objects.filter(
            user__id=info.context.request.user.id
        ).first()

        if device is None:
            raise exceptions.APIException(
                _("You need to enable Two factor auth first."), code="2fa_disabled"
            )

        # check if token is valid
        if device.verify_token(token) is False:
            raise exceptions.ValidationError(
                {"otp_token": _("Invalid or Expired OTP token")}, code="otp_invalid"
            )

        device.confirmed = True
        device.save()

        return ConfirmMultiFactorMutation(  # type:ignore
            user=types.User.objects.get(pk=info.context.request.user.id)
        )


@strawberry.type
class DisableMultiFactorMutation(utils.BaseMutation):
    user: typing.Optional[types.UserType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info, **input: inputs.DisableMultiFactorMutationInput
    ) -> "DisableMultiFactorMutation":
        # Retrieve a default device or create a new one.
        device = otp.EmailDevice.objects.filter(
            user__id=info.context.request.user.id
        ).first()
        if device is not None:
            device.delete()

        return DisableMultiFactorMutation(  # type:ignore
            user=types.User.objects.get(pk=info.context.request.user.id)
        )


@strawberry.type
class MetadataMutation(utils.BaseMutation):
    id: str = strawberry.UNSET
    metadata: utils.JSON = strawberry.UNSET

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info,
        id: str,
        object_type: utils.MetadataObjectTypeEnum,
        added_values: dict = {},
        discarded_keys: list = [],
    ) -> "MetadataMutation":
        object_model = utils.MetadataObjectType[object_type].value
        instance = object_model.access_by(info.context.request).get(id=id)
        instance.metadata = {
            key: value
            for key, value in (instance.metadata or {}).items()
            if key not in discarded_keys
        }
        instance.metadata.update(added_values)
        instance.save(update_fields=["metadata"])

        return MetadataMutation(id=id, metadata=instance.metadata)  # type:ignore


@strawberry.type
class DeleteMutation(utils.BaseMutation):
    id: str = strawberry.UNSET

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required()
    def mutate(
        info: Info,
        model,
        validator: typing.Callable = None,
        **input: inputs.DeleteMutationInput,
    ) -> "DeleteMutation":
        id = input.get("id")
        queryset = (
            model.access_by(info.context.request)
            if hasattr(model, "access_by")
            else model.objects
        )
        instance = queryset.get(id=id)

        if validator:
            validator(instance, context=info.context)

        shipment = getattr(instance, "shipment", None)
        instance.delete(keep_parents=True)

        if shipment is not None:
            manager_serializers.reset_related_shipment_rates(shipment)

        return DeleteMutation(id=id)  # type:ignore


@strawberry.type
class CreateRateSheetMutation(utils.BaseMutation):
    rate_sheet: typing.Optional[types.RateSheetType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(
        info: Info, **input: inputs.CreateRateSheetMutationInput
    ) -> "CreateRateSheetMutation":
        data = input.copy()
        carriers = data.pop("carriers", [])
        slug = f"{input.get('name', '').lower()}_sheet".replace(" ", "").lower()
        serializer = serializers.RateSheetModelSerializer(
            data={**data, "slug": slug},
            context=info.context.request,
        )

        serializer.is_valid(raise_exception=True)
        rate_sheet = serializer.save()

        if "services" in data:
            save_many_to_many_data(
                "services",
                serializers.ServiceLevelModelSerializer,
                rate_sheet,
                payload=data,
                context=info.context.request,
            )

        if any(carriers):
            _carriers = gateway.Carriers.list(
                context=info.context.request,
                carrier_name=rate_sheet.carrier_name,
            ).filter(id__in=carriers)
            for _ in _carriers:
                _.settings.rate_sheet = rate_sheet
                _.settings.save(update_fields=["rate_sheet"])

        return CreateRateSheetMutation(rate_sheet=rate_sheet)


@strawberry.type
class UpdateRateSheetMutation(utils.BaseMutation):
    rate_sheet: typing.Optional[types.RateSheetType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(
        info: Info, **input: inputs.UpdateRateSheetMutationInput
    ) -> "UpdateRateSheetMutation":
        instance = providers.RateSheet.access_by(info.context.request).get(
            id=input["id"]
        )
        serializer = serializers.RateSheetModelSerializer(
            instance,
            data=input,
            context=info.context.request,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        rate_sheet = serializer.save()

        return UpdateRateSheetMutation(
            rate_sheet=providers.RateSheet.objects.get(id=input["id"])
        )


@strawberry.type
class PartialShipmentMutation(utils.BaseMutation):
    shipment: typing.Optional[types.ShipmentType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required(["manage_shipments"])
    def mutate(
        info: Info, **input: inputs.PartialShipmentMutationInput
    ) -> "PartialShipmentMutation":
        try:
            id = input["id"]
            shipment = manager.Shipment.access_by(info.context.request).get(id=id)
            manager_serializers.can_mutate_shipment(
                shipment, update=True, payload=input
            )

            manager_serializers.ShipmentSerializer.map(
                shipment,
                context=info.context.request,
                data=process_dictionaries_mutations(["options"], input, shipment),
            ).save()

            # refetch the shipment to get the updated state with signals processed
            update = manager.Shipment.access_by(info.context.request).get(id=id)

            return PartialShipmentMutation(errors=None, shipment=update)  # type:ignore
        except Exception as e:
            logger.exception(e)
            raise e


@strawberry.type
class ChangeShipmentStatusMutation(utils.BaseMutation):
    shipment: typing.Optional[types.ShipmentType] = None

    @staticmethod
    @utils.authentication_required
    @utils.authorization_required(["manage_shipments"])
    def mutate(
        info: Info, **input: inputs.ChangeShipmentStatusMutationInput
    ) -> "ChangeShipmentStatusMutation":
        shipment = manager.Shipment.access_by(info.context.request).get(id=input["id"])

        if shipment.status in [
            utils.ShipmentStatusEnum.draft.name,
            utils.ShipmentStatusEnum.cancelled.name,
        ]:
            raise exceptions.ValidationError(
                _(f"{shipment.status} shipment cannot be changed to {input['status']}"),
                code="invalid_operation",
            )

        if getattr(shipment, "tracker", None) is not None:
            raise exceptions.ValidationError(
                _(f"this shipment is tracked automatically by API"),
                code="invalid_operation",
            )

        shipment.status = input["status"]
        shipment.save(update_fields=["status"])

        return ChangeShipmentStatusMutation(shipment=shipment)  # type:ignore


def create_template_mutation(name: str, template_type: str) -> typing.Type:
    _type: typing.Any = dict(
        address=types.AddressTemplateType,
        customs=types.CustomsTemplateType,
        parcel=types.ParcelTemplateType,
    ).get(template_type)

    @strawberry.type
    class _Mutation(utils.BaseMutation):
        template: typing.Optional[_type] = None

        @staticmethod
        @utils.authentication_required
        @utils.authorization_required()
        @transaction.atomic
        def mutate(info: Info, **input) -> name:  # type:ignore
            data = input.copy()
            instance = (
                graph.Template.access_by(info.context.request).get(id=input["id"])
                if "id" in input
                else None
            )
            customs_data = data.get("customs", {})

            if "commodities" in customs_data and instance is not None:
                save_many_to_many_data(
                    "commodities",
                    serializers.CommodityModelSerializer,
                    getattr(instance, "customs", None),
                    payload=customs_data,
                    context=info.context.request,
                )

            serializer = serializers.TemplateModelSerializer(
                instance,
                data=data,
                context=info.context.request,
                partial=(instance is not None),
            )

            serializer.is_valid(raise_exception=True)
            template = serializer.save()

            return _Mutation(template=template)  # type:ignore

    return strawberry.type(type(name, (_Mutation,), {}))


CreateAddressTemplateMutation = create_template_mutation(
    "CreateAddressTemplateMutation", "address"
)
UpdateAddressTemplateMutation = create_template_mutation(
    "UpdateAddressTemplateMutation",
    "address",
)
CreateCustomsTemplateMutation = create_template_mutation(
    "CreateCustomsTemplateMutation", "customs"
)
UpdateCustomsTemplateMutation = create_template_mutation(
    "UpdateCustomsTemplateMutation", "customs"
)
CreateParcelTemplateMutation = create_template_mutation(
    "CreateParcelTemplateMutation", "parcel"
)
UpdateParcelTemplateMutation = create_template_mutation(
    "UpdateParcelTemplateMutation", "parcel"
)


@strawberry.type
class CreateCarrierConnectionMutation(utils.BaseMutation):
    connection: types.CarrierConnectionType = None

    @staticmethod
    @utils.error_wrapper
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(info: Info, **input) -> "CreateCarrierConnectionMutation":
        data = input.copy()

        connection = lib.identity(
            providers_serializers.CarrierConnectionModelSerializer.map(
                data=providers_serializers.CarrierConnectionData.map(data=data).data,
                context=info.context.request,
            )
            .save()
            .instance
        )

        return CreateCarrierConnectionMutation(  # type:ignore
            connection=connection
        )


@strawberry.type
class UpdateCarrierConnectionMutation(utils.BaseMutation):
    connection: types.CarrierConnectionType = None

    @staticmethod
    @utils.error_wrapper
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(info: Info, **input) -> "UpdateCarrierConnectionMutation":
        data = input.copy()
        id = data.get("id")
        instance = providers.Carrier.access_by(info.context.request).get(id=id)
        connection = lib.identity(
            providers_serializers.CarrierConnectionModelSerializer.map(
                instance,
                data=data,
                context=info.context.request,
            )
            .save()
            .instance
        )

        return UpdateCarrierConnectionMutation(  # type:ignore
            connection=connection
        )


@strawberry.type
class SystemCarrierMutation(utils.BaseMutation):
    carrier: typing.Optional[types.SystemConnectionType] = None

    @staticmethod
    @utils.error_wrapper
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(
        info: Info, **input: inputs.SystemCarrierMutationInput
    ) -> "SystemCarrierMutation":
        pk = input.get("id")
        context = info.context.request
        carrier = providers.Carrier.system_carriers.get(pk=pk)

        if "enable" in input:
            if input.get("enable"):
                if hasattr(carrier, "active_orgs"):
                    carrier.active_orgs.add(info.context.request.org)
                else:
                    carrier.active_users.add(info.context.request.user)
            else:
                if hasattr(carrier, "active_orgs"):
                    carrier.active_orgs.remove(info.context.request.org)
                else:
                    carrier.active_users.remove(info.context.request.user)

        if "config" in input:
            config = providers.Carrier.resolve_config(carrier, is_user_config=True)
            serializers.CarrierConfigModelSerializer.map(
                instance=config,
                context=context,
                data={
                    "carrier": carrier.pk,
                    "config": process_dictionaries_mutations(
                        ["config"], (input["config"] or {}), config
                    ),
                },
            ).save()

        return SystemCarrierMutation(
            carrier=providers.Carrier.system_carriers.get(pk=pk)
        )  # type: ignore


@strawberry.type
class UpdateServiceZoneMutation(utils.BaseMutation):
    rate_sheet: typing.Optional[types.RateSheetType] = None

    @staticmethod
    @transaction.atomic
    @utils.authentication_required
    @utils.authorization_required(["manage_carriers"])
    def mutate(
        info: Info, **input: inputs.UpdateServiceZoneMutationInput
    ) -> "UpdateServiceZoneMutation":
        rate_sheet = providers.RateSheet.access_by(info.context.request).get(
            id=input["id"]
        )
        service = rate_sheet.services.get(id=input["service_id"])

        serializer = serializers.ServiceLevelModelSerializer(
            service,
            context=info.context.request,
        )
        serializer.update_zone(input["zone_index"], input["zone"])

        return UpdateServiceZoneMutation(rate_sheet=rate_sheet)  # type:ignore
