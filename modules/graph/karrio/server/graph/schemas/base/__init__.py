import typing
import strawberry
from strawberry.types import Info

import karrio.server.core.models as core
import karrio.server.graph.models as graph
import karrio.server.manager.models as manager
import karrio.server.providers.models as providers
import karrio.server.manager.serializers as manager_serializers
import karrio.server.graph.schemas.base.mutations as mutations
import karrio.server.graph.schemas.base.inputs as inputs
import karrio.server.graph.schemas.base.types as types
import karrio.server.graph.utils as utils

# extra_types = [*types.CarrierSettings.values()]
extra_types = []


@strawberry.type
class Query:
    user: types.UserType = strawberry.field(resolver=types.UserType.resolve)
    token: types.TokenType = strawberry.field(resolver=types.TokenType.resolve)
    api_keys: typing.List[types.APIKeyType] = strawberry.field(
        resolver=types.APIKeyType.resolve_list
    )
    workspace_config: typing.Optional[types.WorkspaceConfigType] = strawberry.field(
        resolver=types.WorkspaceConfigType.resolve
    )
    system_usage: types.SystemUsageType = strawberry.field(
        resolver=types.SystemUsageType.resolve
    )

    user_connections: typing.List[types.CarrierConnectionType] = strawberry.field(
        resolver=types.CarrierConnectionType.resolve_list_legacy
    )
    system_connections: typing.List[types.SystemConnectionType] = strawberry.field(
        resolver=types.SystemConnectionType.resolve_list
    )

    default_templates: types.DefaultTemplatesType = strawberry.field(
        resolver=types.DefaultTemplatesType.resolve
    )
    address_templates: utils.Connection[types.AddressTemplateType] = strawberry.field(
        resolver=types.AddressTemplateType.resolve_list
    )
    customs_templates: utils.Connection[types.CustomsTemplateType] = strawberry.field(
        resolver=types.CustomsTemplateType.resolve_list
    )
    parcel_templates: utils.Connection[types.ParcelTemplateType] = strawberry.field(
        resolver=types.ParcelTemplateType.resolve_list
    )

    log: typing.Optional[types.LogType] = strawberry.field(
        resolver=types.LogType.resolve
    )
    logs: utils.Connection[types.LogType] = strawberry.field(
        resolver=types.LogType.resolve_list
    )

    tracing_record: typing.Optional[types.TracingRecordType] = strawberry.field(
        resolver=types.TracingRecordType.resolve
    )
    tracing_records: utils.Connection[types.TracingRecordType] = strawberry.field(
        resolver=types.TracingRecordType.resolve_list
    )

    shipment: typing.Optional[types.ShipmentType] = strawberry.field(
        resolver=types.ShipmentType.resolve
    )
    shipments: utils.Connection[types.ShipmentType] = strawberry.field(
        resolver=types.ShipmentType.resolve_list
    )

    tracker: typing.Optional[types.TrackerType] = strawberry.field(
        resolver=types.TrackerType.resolve
    )
    trackers: utils.Connection[types.TrackerType] = strawberry.field(
        resolver=types.TrackerType.resolve_list
    )

    rate_sheet: typing.Optional[types.RateSheetType] = strawberry.field(
        resolver=types.RateSheetType.resolve
    )
    rate_sheets: utils.Connection[types.RateSheetType] = strawberry.field(
        resolver=types.RateSheetType.resolve_list
    )

    manifest: typing.Optional[types.ManifestType] = strawberry.field(
        resolver=types.ManifestType.resolve
    )
    manifests: utils.Connection[types.ManifestType] = strawberry.field(
        resolver=types.ManifestType.resolve_list
    )

    carrier_connection: typing.Optional[types.CarrierConnectionType] = strawberry.field(
        resolver=types.CarrierConnectionType.resolve
    )
    carrier_connections: utils.Connection[types.CarrierConnectionType] = (
        strawberry.field(resolver=types.CarrierConnectionType.resolve_list)
    )


@strawberry.type
class Mutation:
    @strawberry.mutation
    def update_user(
        self, info: Info, input: inputs.UpdateUserInput
    ) -> mutations.UserUpdateMutation:
        return mutations.UserUpdateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def register_user(
        self, info: Info, input: inputs.RegisterUserMutationInput
    ) -> mutations.RegisterUserMutation:
        return mutations.RegisterUserMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_workspace_config(
        self, info: Info, input: inputs.WorkspaceConfigMutationInput
    ) -> mutations.WorkspaceConfigMutation:
        return mutations.WorkspaceConfigMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def mutate_token(
        self, info: Info, input: inputs.TokenMutationInput
    ) -> mutations.TokenMutation:
        return mutations.TokenMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def create_api_key(
        self, info: Info, input: inputs.CreateAPIKeyMutationInput
    ) -> mutations.CreateAPIKeyMutation:
        return mutations.CreateAPIKeyMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def delete_api_key(
        self, info: Info, input: inputs.DeleteAPIKeyMutationInput
    ) -> mutations.DeleteAPIKeyMutation:
        return mutations.DeleteAPIKeyMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def request_email_change(
        self, info: Info, input: inputs.RequestEmailChangeMutationInput
    ) -> mutations.RequestEmailChangeMutation:
        return mutations.RequestEmailChangeMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def confirm_email_change(
        self, info: Info, input: inputs.ConfirmEmailChangeMutationInput
    ) -> mutations.ConfirmEmailChangeMutation:
        return mutations.ConfirmEmailChangeMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def confirm_email(
        self, info: Info, input: inputs.ConfirmEmailMutationInput
    ) -> mutations.ConfirmEmailMutation:
        return mutations.ConfirmEmailMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def change_password(
        self, info: Info, input: inputs.ChangePasswordMutationInput
    ) -> mutations.ChangePasswordMutation:
        return mutations.ChangePasswordMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def request_password_reset(
        self, info: Info, input: inputs.RequestPasswordResetMutationInput
    ) -> mutations.RequestPasswordResetMutation:
        return mutations.RequestPasswordResetMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def confirm_password_reset(
        self, info: Info, input: inputs.ConfirmPasswordResetMutationInput
    ) -> mutations.ConfirmPasswordResetMutation:
        return mutations.ConfirmPasswordResetMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def enable_multi_factor(
        self, info: Info, input: inputs.EnableMultiFactorMutationInput
    ) -> mutations.EnableMultiFactorMutation:
        return mutations.EnableMultiFactorMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def confirm_multi_factor(
        self, info: Info, input: inputs.ConfirmMultiFactorMutationInput
    ) -> mutations.ConfirmMultiFactorMutation:
        return mutations.ConfirmMultiFactorMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def disable_multi_factor(
        self, info: Info, input: inputs.DisableMultiFactorMutationInput
    ) -> mutations.DisableMultiFactorMutation:
        return mutations.DisableMultiFactorMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def create_address_template(
        self, info: Info, input: inputs.CreateAddressTemplateInput
    ) -> mutations.CreateAddressTemplateMutation:
        return mutations.CreateAddressTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_address_template(
        self, info: Info, input: inputs.UpdateAddressTemplateInput
    ) -> mutations.UpdateAddressTemplateMutation:
        return mutations.UpdateAddressTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def create_customs_template(
        self, info: Info, input: inputs.CreateCustomsTemplateInput
    ) -> mutations.CreateCustomsTemplateMutation:
        return mutations.CreateCustomsTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_customs_template(
        self, info: Info, input: inputs.UpdateCustomsTemplateInput
    ) -> mutations.UpdateCustomsTemplateMutation:
        return mutations.UpdateCustomsTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def create_parcel_template(
        self, info: Info, input: inputs.CreateParcelTemplateInput
    ) -> mutations.CreateParcelTemplateMutation:
        return mutations.CreateParcelTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_parcel_template(
        self, info: Info, input: inputs.UpdateParcelTemplateInput
    ) -> mutations.UpdateParcelTemplateMutation:
        return mutations.UpdateParcelTemplateMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def create_carrier_connection(
        self, info: Info, input: inputs.CreateCarrierConnectionMutationInput
    ) -> mutations.CreateCarrierConnectionMutation:
        return mutations.CreateCarrierConnectionMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_carrier_connection(
        self, info: Info, input: inputs.UpdateCarrierConnectionMutationInput
    ) -> mutations.UpdateCarrierConnectionMutation:
        return mutations.UpdateCarrierConnectionMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def mutate_system_connection(
        self, info: Info, input: inputs.SystemCarrierMutationInput
    ) -> mutations.SystemCarrierMutation:
        return mutations.SystemCarrierMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def delete_carrier_connection(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info, model=providers.Carrier, **input.to_dict()
        )

    @strawberry.mutation
    def partial_shipment_update(
        self, info: Info, input: inputs.PartialShipmentMutationInput
    ) -> mutations.PartialShipmentMutation:
        return mutations.PartialShipmentMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def mutate_metadata(
        self, info: Info, input: inputs.MetadataMutationInput
    ) -> mutations.MetadataMutation:
        return mutations.MetadataMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def change_shipment_status(
        self, info: Info, input: inputs.ChangeShipmentStatusMutationInput
    ) -> mutations.ChangeShipmentStatusMutation:
        return mutations.ChangeShipmentStatusMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def delete_template(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info, model=graph.Template, **input.to_dict()
        )

    @strawberry.mutation
    def discard_commodity(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info,
            model=manager.Commodity,
            validator=manager_serializers.can_mutate_commodity,
            **input.to_dict()
        )

    @strawberry.mutation
    def discard_customs(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info,
            model=manager.Customs,
            validator=manager_serializers.can_mutate_customs,
            **input.to_dict()
        )

    @strawberry.mutation
    def discard_parcel(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info,
            model=manager.Parcel,
            validator=manager_serializers.can_mutate_parcel,
            **input.to_dict()
        )

    @strawberry.mutation
    def create_rate_sheet(
        self, info: Info, input: inputs.CreateRateSheetMutationInput
    ) -> mutations.CreateRateSheetMutation:
        return mutations.CreateRateSheetMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def update_rate_sheet(
        self, info: Info, input: inputs.UpdateRateSheetMutationInput
    ) -> mutations.UpdateRateSheetMutation:
        return mutations.UpdateRateSheetMutation.mutate(info, **input.to_dict())

    @strawberry.mutation
    def delete_rate_sheet(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info, model=providers.RateSheet, **input.to_dict()
        )

    @strawberry.mutation
    def delete_metafield(
        self, info: Info, input: inputs.DeleteMutationInput
    ) -> mutations.DeleteMutation:
        return mutations.DeleteMutation.mutate(
            info, model=core.Metafield, **input.to_dict()
        )

    @strawberry.mutation
    def update_service_zone(
        self, info: Info, input: inputs.UpdateServiceZoneMutationInput
    ) -> mutations.UpdateServiceZoneMutation:
        return mutations.UpdateServiceZoneMutation.mutate(info, **input.to_dict())
