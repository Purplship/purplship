

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSystemConnections
// ====================================================

export interface GetSystemConnections_system_carrier_connections {
  id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
}

export interface GetSystemConnections {
  system_carrier_connections: GetSystemConnections_system_carrier_connections[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSystemConnection
// ====================================================

export interface GetSystemConnection_system_carrier_connection {
  id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
}

export interface GetSystemConnection {
  system_carrier_connection: GetSystemConnection_system_carrier_connection | null;
}

export interface GetSystemConnectionVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSystemConnection
// ====================================================

export interface CreateSystemConnection_create_system_carrier_connection_errors {
  field: string;
  messages: string[];
}

export interface CreateSystemConnection_create_system_carrier_connection_connection {
  id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
}

export interface CreateSystemConnection_create_system_carrier_connection {
  errors: CreateSystemConnection_create_system_carrier_connection_errors[] | null;
  connection: CreateSystemConnection_create_system_carrier_connection_connection | null;
}

export interface CreateSystemConnection {
  create_system_carrier_connection: CreateSystemConnection_create_system_carrier_connection;
}

export interface CreateSystemConnectionVariables {
  data: CreateConnectionMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSystemConnection
// ====================================================

export interface UpdateSystemConnection_update_system_carrier_connection_errors {
  field: string;
  messages: string[];
}

export interface UpdateSystemConnection_update_system_carrier_connection_connection {
  id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
}

export interface UpdateSystemConnection_update_system_carrier_connection {
  errors: UpdateSystemConnection_update_system_carrier_connection_errors[] | null;
  connection: UpdateSystemConnection_update_system_carrier_connection_connection | null;
}

export interface UpdateSystemConnection {
  update_system_carrier_connection: UpdateSystemConnection_update_system_carrier_connection;
}

export interface UpdateSystemConnectionVariables {
  data: UpdateConnectionMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSystemConnection
// ====================================================

export interface DeleteSystemConnection_delete_system_carrier_connection_errors {
  field: string;
  messages: string[];
}

export interface DeleteSystemConnection_delete_system_carrier_connection {
  errors: DeleteSystemConnection_delete_system_carrier_connection_errors[] | null;
  id: string;
}

export interface DeleteSystemConnection {
  delete_system_carrier_connection: DeleteSystemConnection_delete_system_carrier_connection;
}

export interface DeleteSystemConnectionVariables {
  data: DeleteConnectionMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  last_login: any | null;
  permissions: string[] | null;
}

export interface GetMe {
  me: GetMe_me;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  last_login: any | null;
  permissions: string[] | null;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  email: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_edges_node {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  last_login: any | null;
  permissions: string[] | null;
}

export interface GetUsers_users_edges {
  node: GetUsers_users_edges_node;
}

export interface GetUsers_users {
  edges: GetUsers_users_edges[];
}

export interface GetUsers {
  users: GetUsers_users;
}

export interface GetUsersVariables {
  filter?: UserFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_create_user_user {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  last_login: any | null;
  permissions: string[] | null;
}

export interface CreateUser_create_user_errors {
  field: string;
  messages: string[];
}

export interface CreateUser_create_user {
  user: CreateUser_create_user_user | null;
  errors: CreateUser_create_user_errors[] | null;
}

export interface CreateUser {
  create_user: CreateUser_create_user;
}

export interface CreateUserVariables {
  data: CreateUserMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_update_user_user {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  last_login: any | null;
  permissions: string[] | null;
}

export interface UpdateUser_update_user_errors {
  field: string;
  messages: string[];
}

export interface UpdateUser_update_user {
  user: UpdateUser_update_user_user | null;
  errors: UpdateUser_update_user_errors[] | null;
}

export interface UpdateUser {
  update_user: UpdateUser_update_user;
}

export interface UpdateUserVariables {
  data: UpdateUserMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveUser
// ====================================================

export interface RemoveUser_remove_user_errors {
  field: string;
  messages: string[];
}

export interface RemoveUser_remove_user {
  errors: RemoveUser_remove_user_errors[] | null;
  id: number;
}

export interface RemoveUser {
  remove_user: RemoveUser_remove_user;
}

export interface RemoveUserVariables {
  data: DeleteUserMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConfigs
// ====================================================

export interface GetConfigs_configs {
  EMAIL_USE_TLS: boolean | null;
  EMAIL_HOST_USER: string | null;
  EMAIL_HOST_PASSWORD: string | null;
  EMAIL_HOST: string | null;
  EMAIL_PORT: number | null;
  EMAIL_FROM_ADDRESS: string | null;
  GOOGLE_CLOUD_API_KEY: string | null;
  CANADAPOST_ADDRESS_COMPLETE_API_KEY: string | null;
  ORDER_DATA_RETENTION: number | null;
  TRACKER_DATA_RETENTION: number | null;
  SHIPMENT_DATA_RETENTION: number | null;
  API_LOGS_DATA_RETENTION: number | null;
}

export interface GetConfigs {
  configs: GetConfigs_configs;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateConfigs
// ====================================================

export interface UpdateConfigs_update_configs_errors {
  field: string;
  messages: string[];
}

export interface UpdateConfigs_update_configs_configs {
  EMAIL_USE_TLS: boolean | null;
  EMAIL_HOST_USER: string | null;
  EMAIL_HOST_PASSWORD: string | null;
  EMAIL_HOST: string | null;
  EMAIL_PORT: number | null;
  EMAIL_FROM_ADDRESS: string | null;
  GOOGLE_CLOUD_API_KEY: string | null;
  CANADAPOST_ADDRESS_COMPLETE_API_KEY: string | null;
  ORDER_DATA_RETENTION: number | null;
  TRACKER_DATA_RETENTION: number | null;
  SHIPMENT_DATA_RETENTION: number | null;
  API_LOGS_DATA_RETENTION: number | null;
}

export interface UpdateConfigs_update_configs {
  errors: UpdateConfigs_update_configs_errors[] | null;
  configs: UpdateConfigs_update_configs_configs | null;
}

export interface UpdateConfigs {
  update_configs: UpdateConfigs_update_configs;
}

export interface UpdateConfigsVariables {
  data: InstanceConfigMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurcharge
// ====================================================

export interface GetSurcharge_surcharge_carrier_accounts {
  id: string;
  active: boolean;
  carrier_id: string;
}

export interface GetSurcharge_surcharge {
  id: string;
  name: string;
  amount: number;
  surcharge_type: string;
  object_type: string;
  active: boolean;
  services: string[];
  carriers: string[];
  carrier_accounts: GetSurcharge_surcharge_carrier_accounts[];
}

export interface GetSurcharge {
  surcharge: GetSurcharge_surcharge | null;
}

export interface GetSurchargeVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurcharges
// ====================================================

export interface GetSurcharges_surcharges_carrier_accounts {
  id: string;
  active: boolean;
  carrier_id: string;
}

export interface GetSurcharges_surcharges {
  id: string;
  name: string;
  amount: number;
  surcharge_type: string;
  object_type: string;
  active: boolean;
  services: string[];
  carriers: string[];
  carrier_accounts: GetSurcharges_surcharges_carrier_accounts[];
}

export interface GetSurcharges {
  surcharges: GetSurcharges_surcharges[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSurcharge
// ====================================================

export interface CreateSurcharge_create_surcharge_errors {
  field: string;
  messages: string[];
}

export interface CreateSurcharge_create_surcharge_surcharge_carrier_accounts {
  id: string;
  active: boolean;
  carrier_id: string;
}

export interface CreateSurcharge_create_surcharge_surcharge {
  id: string;
  name: string;
  amount: number;
  surcharge_type: string;
  object_type: string;
  active: boolean;
  services: string[];
  carriers: string[];
  carrier_accounts: CreateSurcharge_create_surcharge_surcharge_carrier_accounts[];
}

export interface CreateSurcharge_create_surcharge {
  errors: CreateSurcharge_create_surcharge_errors[] | null;
  surcharge: CreateSurcharge_create_surcharge_surcharge | null;
}

export interface CreateSurcharge {
  create_surcharge: CreateSurcharge_create_surcharge;
}

export interface CreateSurchargeVariables {
  data: CreateSurchargeMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSurcharge
// ====================================================

export interface UpdateSurcharge_update_surcharge_errors {
  field: string;
  messages: string[];
}

export interface UpdateSurcharge_update_surcharge_surcharge_carrier_accounts {
  id: string;
  active: boolean;
  carrier_id: string;
}

export interface UpdateSurcharge_update_surcharge_surcharge {
  id: string;
  name: string;
  amount: number;
  surcharge_type: string;
  object_type: string;
  active: boolean;
  services: string[];
  carriers: string[];
  carrier_accounts: UpdateSurcharge_update_surcharge_surcharge_carrier_accounts[];
}

export interface UpdateSurcharge_update_surcharge {
  errors: UpdateSurcharge_update_surcharge_errors[] | null;
  surcharge: UpdateSurcharge_update_surcharge_surcharge | null;
}

export interface UpdateSurcharge {
  update_surcharge: UpdateSurcharge_update_surcharge;
}

export interface UpdateSurchargeVariables {
  data: UpdateSurchargeMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSurcharge
// ====================================================

export interface DeleteSurcharge_delete_surcharge_errors {
  field: string;
  messages: string[];
}

export interface DeleteSurcharge_delete_surcharge {
  errors: DeleteSurcharge_delete_surcharge_errors[] | null;
  id: string;
}

export interface DeleteSurcharge {
  delete_surcharge: DeleteSurcharge_delete_surcharge;
}

export interface DeleteSurchargeVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRateSheet
// ====================================================

export interface GetRateSheet_rate_sheet_services_zones {
  object_type: string;
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
  transit_time: number | null;
  radius: number | null;
  latitude: number | null;
  longitude: number | null;
  cities: string[] | null;
  postal_codes: string[] | null;
  country_codes: CountryCodeEnum[] | null;
}

export interface GetRateSheet_rate_sheet_services {
  id: string;
  object_type: string;
  service_name: string | null;
  service_code: string | null;
  carrier_service_code: string | null;
  description: string | null;
  active: boolean | null;
  currency: CurrencyCodeEnum | null;
  transit_days: number | null;
  transit_time: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  dimension_unit: DimensionUnitEnum | null;
  max_weight: number | null;
  weight_unit: WeightUnitEnum | null;
  domicile: boolean | null;
  international: boolean | null;
  metadata: any | null;
  zones: GetRateSheet_rate_sheet_services_zones[];
}

export interface GetRateSheet_rate_sheet_carriers {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  active: boolean;
  is_system: boolean;
  test_mode: boolean;
  capabilities: string[];
}

export interface GetRateSheet_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  object_type: string;
  metadata: any | null;
  services: GetRateSheet_rate_sheet_services[];
  carriers: GetRateSheet_rate_sheet_carriers[];
}

export interface GetRateSheet {
  rate_sheet: GetRateSheet_rate_sheet | null;
}

export interface GetRateSheetVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRateSheets
// ====================================================

export interface GetRateSheets_rate_sheets_edges_node_services {
  id: string;
  service_name: string | null;
  service_code: string | null;
  carrier_service_code: string | null;
  description: string | null;
  active: boolean | null;
}

export interface GetRateSheets_rate_sheets_edges_node_carriers {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  active: boolean;
  is_system: boolean;
  test_mode: boolean;
  capabilities: string[];
}

export interface GetRateSheets_rate_sheets_edges_node {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  object_type: string;
  metadata: any | null;
  services: GetRateSheets_rate_sheets_edges_node_services[];
  carriers: GetRateSheets_rate_sheets_edges_node_carriers[];
}

export interface GetRateSheets_rate_sheets_edges {
  node: GetRateSheets_rate_sheets_edges_node;
}

export interface GetRateSheets_rate_sheets {
  edges: GetRateSheets_rate_sheets_edges[];
}

export interface GetRateSheets {
  rate_sheets: GetRateSheets_rate_sheets;
}

export interface GetRateSheetsVariables {
  filter?: RateSheetFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRateSheet
// ====================================================

export interface CreateRateSheet_create_rate_sheet_errors {
  field: string;
  messages: string[];
}

export interface CreateRateSheet_create_rate_sheet_rate_sheet_services_zones {
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
  transit_time: number | null;
  radius: number | null;
  latitude: number | null;
  longitude: number | null;
  cities: string[] | null;
  postal_codes: string[] | null;
  country_codes: CountryCodeEnum[] | null;
}

export interface CreateRateSheet_create_rate_sheet_rate_sheet_services {
  id: string;
  service_name: string | null;
  service_code: string | null;
  carrier_service_code: string | null;
  description: string | null;
  active: boolean | null;
  zones: CreateRateSheet_create_rate_sheet_rate_sheet_services_zones[];
}

export interface CreateRateSheet_create_rate_sheet_rate_sheet_carriers {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  active: boolean;
  is_system: boolean;
  test_mode: boolean;
  capabilities: string[];
}

export interface CreateRateSheet_create_rate_sheet_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  object_type: string;
  metadata: any | null;
  services: CreateRateSheet_create_rate_sheet_rate_sheet_services[];
  carriers: CreateRateSheet_create_rate_sheet_rate_sheet_carriers[];
}

export interface CreateRateSheet_create_rate_sheet {
  errors: CreateRateSheet_create_rate_sheet_errors[] | null;
  rate_sheet: CreateRateSheet_create_rate_sheet_rate_sheet | null;
}

export interface CreateRateSheet {
  create_rate_sheet: CreateRateSheet_create_rate_sheet;
}

export interface CreateRateSheetVariables {
  data: CreateRateSheetMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRateSheet
// ====================================================

export interface UpdateRateSheet_update_rate_sheet_errors {
  field: string;
  messages: string[];
}

export interface UpdateRateSheet_update_rate_sheet_rate_sheet_services_zones {
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
  transit_time: number | null;
  radius: number | null;
  latitude: number | null;
  longitude: number | null;
  cities: string[] | null;
  postal_codes: string[] | null;
  country_codes: CountryCodeEnum[] | null;
}

export interface UpdateRateSheet_update_rate_sheet_rate_sheet_services {
  id: string;
  service_name: string | null;
  service_code: string | null;
  carrier_service_code: string | null;
  description: string | null;
  active: boolean | null;
  zones: UpdateRateSheet_update_rate_sheet_rate_sheet_services_zones[];
}

export interface UpdateRateSheet_update_rate_sheet_rate_sheet_carriers {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  active: boolean;
  is_system: boolean;
  test_mode: boolean;
  capabilities: string[];
}

export interface UpdateRateSheet_update_rate_sheet_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  object_type: string;
  metadata: any | null;
  services: UpdateRateSheet_update_rate_sheet_rate_sheet_services[];
  carriers: UpdateRateSheet_update_rate_sheet_rate_sheet_carriers[];
}

export interface UpdateRateSheet_update_rate_sheet {
  errors: UpdateRateSheet_update_rate_sheet_errors[] | null;
  rate_sheet: UpdateRateSheet_update_rate_sheet_rate_sheet | null;
}

export interface UpdateRateSheet {
  update_rate_sheet: UpdateRateSheet_update_rate_sheet;
}

export interface UpdateRateSheetVariables {
  data: UpdateRateSheetMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateServiceZone
// ====================================================

export interface UpdateServiceZone_update_service_zone_errors {
  field: string;
  messages: string[];
}

export interface UpdateServiceZone_update_service_zone_rate_sheet_services_zones {
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
  transit_time: number | null;
  radius: number | null;
  latitude: number | null;
  longitude: number | null;
  cities: string[] | null;
  postal_codes: string[] | null;
  country_codes: CountryCodeEnum[] | null;
}

export interface UpdateServiceZone_update_service_zone_rate_sheet_services {
  id: string;
  zones: UpdateServiceZone_update_service_zone_rate_sheet_services_zones[];
}

export interface UpdateServiceZone_update_service_zone_rate_sheet {
  id: string;
  services: UpdateServiceZone_update_service_zone_rate_sheet_services[];
}

export interface UpdateServiceZone_update_service_zone {
  errors: UpdateServiceZone_update_service_zone_errors[] | null;
  rate_sheet: UpdateServiceZone_update_service_zone_rate_sheet | null;
}

export interface UpdateServiceZone {
  update_service_zone: UpdateServiceZone_update_service_zone;
}

export interface UpdateServiceZoneVariables {
  data: UpdateServiceZoneMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRateSheet
// ====================================================

export interface DeleteRateSheet_delete_rate_sheet_errors {
  field: string;
  messages: string[];
}

export interface DeleteRateSheet_delete_rate_sheet {
  errors: DeleteRateSheet_delete_rate_sheet_errors[] | null;
  id: string;
}

export interface DeleteRateSheet {
  delete_rate_sheet: DeleteRateSheet_delete_rate_sheet;
}

export interface DeleteRateSheetVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccounts
// ====================================================

export interface GetAccounts_accounts_edges_node_usage {
  members: number | null;
  total_errors: number | null;
  order_volume: number | null;
  total_requests: number | null;
  total_trackers: number | null;
  total_shipments: number | null;
  unfulfilled_orders: number | null;
  total_shipping_spend: number | null;
}

export interface GetAccounts_accounts_edges_node {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created: any;
  modified: any;
  usage: GetAccounts_accounts_edges_node_usage;
}

export interface GetAccounts_accounts_edges {
  node: GetAccounts_accounts_edges_node;
}

export interface GetAccounts_accounts {
  edges: GetAccounts_accounts_edges[];
}

export interface GetAccounts {
  accounts: GetAccounts_accounts;
}

export interface GetAccountsVariables {
  filter?: AccountFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrganizationAccount
// ====================================================

export interface CreateOrganizationAccount_create_organization_account_account {
  id: string;
}

export interface CreateOrganizationAccount_create_organization_account_errors {
  field: string;
  messages: string[];
}

export interface CreateOrganizationAccount_create_organization_account {
  account: CreateOrganizationAccount_create_organization_account_account | null;
  errors: CreateOrganizationAccount_create_organization_account_errors[] | null;
}

export interface CreateOrganizationAccount {
  create_organization_account: CreateOrganizationAccount_create_organization_account;
}

export interface CreateOrganizationAccountVariables {
  data: CreateOrganizationAccountMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateOrganizationAccount
// ====================================================

export interface UpdateOrganizationAccount_update_organization_account_account {
  id: string;
}

export interface UpdateOrganizationAccount_update_organization_account_errors {
  field: string;
  messages: string[];
}

export interface UpdateOrganizationAccount_update_organization_account {
  account: UpdateOrganizationAccount_update_organization_account_account | null;
  errors: UpdateOrganizationAccount_update_organization_account_errors[] | null;
}

export interface UpdateOrganizationAccount {
  update_organization_account: UpdateOrganizationAccount_update_organization_account;
}

export interface UpdateOrganizationAccountVariables {
  data: UpdateOrganizationAccountMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DisableOrganizationAccount
// ====================================================

export interface DisableOrganizationAccount_disable_organization_account_account {
  id: string;
}

export interface DisableOrganizationAccount_disable_organization_account_errors {
  field: string;
  messages: string[];
}

export interface DisableOrganizationAccount_disable_organization_account {
  account: DisableOrganizationAccount_disable_organization_account_account | null;
  errors: DisableOrganizationAccount_disable_organization_account_errors[] | null;
}

export interface DisableOrganizationAccount {
  disable_organization_account: DisableOrganizationAccount_disable_organization_account;
}

export interface DisableOrganizationAccountVariables {
  data: DisableOrganizationAccountMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteOrganizationAccount
// ====================================================

export interface DeleteOrganizationAccount_delete_organization_account_account {
  id: string;
}

export interface DeleteOrganizationAccount_delete_organization_account_errors {
  field: string;
  messages: string[];
}

export interface DeleteOrganizationAccount_delete_organization_account {
  account: DeleteOrganizationAccount_delete_organization_account_account | null;
  errors: DeleteOrganizationAccount_delete_organization_account_errors[] | null;
}

export interface DeleteOrganizationAccount {
  delete_organization_account: DeleteOrganizationAccount_delete_organization_account;
}

export interface DeleteOrganizationAccountVariables {
  data: DeleteOrganizationAccountMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPermissionGroups
// ====================================================

export interface GetPermissionGroups_permission_groups_edges_node {
  id: number;
  name: string;
  permissions: string[] | null;
}

export interface GetPermissionGroups_permission_groups_edges {
  node: GetPermissionGroups_permission_groups_edges_node;
}

export interface GetPermissionGroups_permission_groups {
  edges: GetPermissionGroups_permission_groups_edges[];
}

export interface GetPermissionGroups {
  permission_groups: GetPermissionGroups_permission_groups;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CarrierNameEnum {
  allied_express = "allied_express",
  allied_express_local = "allied_express_local",
  amazon_shipping = "amazon_shipping",
  aramex = "aramex",
  asendia_us = "asendia_us",
  australiapost = "australiapost",
  boxknight = "boxknight",
  bpost = "bpost",
  canadapost = "canadapost",
  canpar = "canpar",
  chronopost = "chronopost",
  colissimo = "colissimo",
  dhl_express = "dhl_express",
  dhl_parcel_de = "dhl_parcel_de",
  dhl_poland = "dhl_poland",
  dhl_universal = "dhl_universal",
  dicom = "dicom",
  dpd = "dpd",
  dpdhl = "dpdhl",
  easypost = "easypost",
  easyship = "easyship",
  eshipper = "eshipper",
  fedex = "fedex",
  fedex_ws = "fedex_ws",
  freightcom = "freightcom",
  generic = "generic",
  geodis = "geodis",
  hay_post = "hay_post",
  laposte = "laposte",
  locate2u = "locate2u",
  nationex = "nationex",
  purolator = "purolator",
  roadie = "roadie",
  royalmail = "royalmail",
  sapient = "sapient",
  seko = "seko",
  sendle = "sendle",
  tge = "tge",
  tnt = "tnt",
  ups = "ups",
  usps = "usps",
  usps_international = "usps_international",
  usps_wt = "usps_wt",
  usps_wt_international = "usps_wt_international",
  zoom2u = "zoom2u",
}

export enum SurchargeTypeEnum {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

export enum CurrencyCodeEnum {
  AED = "AED",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STD = "STD",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
}

export enum DimensionUnitEnum {
  CM = "CM",
  IN = "IN",
}

export enum WeightUnitEnum {
  G = "G",
  KG = "KG",
  LB = "LB",
  OZ = "OZ",
}

export enum CountryCodeEnum {
  AC = "AC",
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AN = "AN",
  AO = "AO",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BL = "BL",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  EH = "EH",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  IC = "IC",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IM = "IM",
  IN = "IN",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KV = "KV",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MF = "MF",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PR = "PR",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SX = "SX",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TL = "TL",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WS = "WS",
  XB = "XB",
  XC = "XC",
  XE = "XE",
  XM = "XM",
  XN = "XN",
  XS = "XS",
  XY = "XY",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

// null
export interface CreateConnectionMutationInput {
  carrier_name: CarrierNameEnum;
  carrier_id: string;
  credentials: any;
  active?: boolean | null;
  config?: any | null;
  metadata?: any | null;
  capabilities?: string[] | null;
}

// null
export interface UpdateConnectionMutationInput {
  id: string;
  active?: boolean | null;
  carrier_id?: string | null;
  credentials?: any | null;
  config?: any | null;
  metadata?: any | null;
  capabilities?: string[] | null;
}

// null
export interface DeleteConnectionMutationInput {
  id: string;
}

// null
export interface UserFilter {
  offset?: number | null;
  first?: number | null;
  id?: string | null;
  email?: string | null;
  is_staff?: boolean | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  order_by?: string | null;
}

// null
export interface CreateUserMutationInput {
  email: string;
  password1: string;
  password2: string;
  redirect_url: string;
  full_name?: string | null;
  is_staff?: boolean | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  organization_id?: string | null;
  permissions?: string[] | null;
}

// null
export interface UpdateUserMutationInput {
  id: number;
  email?: string | null;
  full_name?: string | null;
  is_staff?: boolean | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  permissions?: string[] | null;
}

// null
export interface DeleteUserMutationInput {
  id: number;
}

// null
export interface InstanceConfigMutationInput {
  EMAIL_USE_TLS?: boolean | null;
  EMAIL_HOST_USER?: string | null;
  EMAIL_HOST_PASSWORD?: string | null;
  EMAIL_HOST?: string | null;
  EMAIL_PORT?: number | null;
  EMAIL_FROM_ADDRESS?: string | null;
  GOOGLE_CLOUD_API_KEY?: string | null;
  CANADAPOST_ADDRESS_COMPLETE_API_KEY?: string | null;
  ORDER_DATA_RETENTION?: number | null;
  TRACKER_DATA_RETENTION?: number | null;
  SHIPMENT_DATA_RETENTION?: number | null;
  API_LOGS_DATA_RETENTION?: number | null;
}

// null
export interface CreateSurchargeMutationInput {
  name: string;
  amount: number;
  surcharge_type: SurchargeTypeEnum;
  active?: boolean | null;
  carriers?: string[] | null;
  services?: string[] | null;
  organizations?: string[] | null;
  carrier_accounts?: string[] | null;
}

// null
export interface UpdateSurchargeMutationInput {
  name?: string | null;
  amount?: number | null;
  surcharge_type?: SurchargeTypeEnum | null;
  active?: boolean | null;
  carriers?: string[] | null;
  services?: string[] | null;
  organizations?: string[] | null;
  carrier_accounts?: string[] | null;
  id: string;
}

// null
export interface DeleteMutationInput {
  id: string;
}

// null
export interface RateSheetFilter {
  offset?: number | null;
  first?: number | null;
  keyword?: string | null;
}

// null
export interface CreateRateSheetMutationInput {
  name: string;
  carrier_name: CarrierNameEnum;
  services?: CreateServiceLevelInput[] | null;
  carriers?: string[] | null;
}

// null
export interface CreateServiceLevelInput {
  service_name: string;
  service_code: string;
  currency: CurrencyCodeEnum;
  zones: ServiceZoneInput[];
  carrier_service_code?: string | null;
  description?: string | null;
  active?: boolean | null;
  transit_days?: number | null;
  transit_time?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  dimension_unit?: DimensionUnitEnum | null;
  min_weight?: number | null;
  max_weight?: number | null;
  weight_unit?: WeightUnitEnum | null;
  domicile?: boolean | null;
  international?: boolean | null;
  metadata?: any | null;
}

// null
export interface ServiceZoneInput {
  rate: number;
  label?: string | null;
  min_weight?: number | null;
  max_weight?: number | null;
  transit_days?: number | null;
  transit_time?: number | null;
  radius?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  cities?: string[] | null;
  postal_codes?: string[] | null;
  country_codes?: string[] | null;
}

// null
export interface UpdateRateSheetMutationInput {
  id: string;
  name?: string | null;
  services?: UpdateServiceLevelInput[] | null;
  carriers?: string[] | null;
  remove_missing_services?: boolean | null;
}

// null
export interface UpdateServiceLevelInput {
  service_name?: string | null;
  service_code?: string | null;
  currency?: CurrencyCodeEnum | null;
  zones?: UpdateServiceZoneInput[] | null;
  carrier_service_code?: string | null;
  description?: string | null;
  active?: boolean | null;
  transit_days?: number | null;
  transit_time?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  dimension_unit?: DimensionUnitEnum | null;
  min_weight?: number | null;
  max_weight?: number | null;
  weight_unit?: WeightUnitEnum | null;
  domicile?: boolean | null;
  international?: boolean | null;
  metadata?: any | null;
  id?: string | null;
}

// null
export interface UpdateServiceZoneInput {
  rate?: number | null;
  label?: string | null;
  min_weight?: number | null;
  max_weight?: number | null;
  transit_days?: number | null;
  transit_time?: number | null;
  radius?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  cities?: string[] | null;
  postal_codes?: string[] | null;
  country_codes?: string[] | null;
}

// null
export interface UpdateServiceZoneMutationInput {
  id: string;
  service_id: string;
  zone_index: number;
  zone: UpdateServiceZoneInput;
}

// null
export interface AccountFilter {
  offset?: number | null;
  first?: number | null;
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  is_active?: boolean | null;
  order_by?: string | null;
}

// null
export interface CreateOrganizationAccountMutationInput {
  name: string;
  slug?: string | null;
  is_active?: boolean | null;
}

// null
export interface UpdateOrganizationAccountMutationInput {
  id: string;
  name?: string | null;
  slug?: string | null;
  is_active?: boolean | null;
}

// null
export interface DisableOrganizationAccountMutationInput {
  id: string;
}

// null
export interface DeleteOrganizationAccountMutationInput {
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================