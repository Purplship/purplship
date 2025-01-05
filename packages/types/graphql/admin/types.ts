

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccounts
// ====================================================

export interface GetAccounts_accounts_page_info {
  count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_api_errors {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_api_requests {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_order_volumes {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_shipment_count {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_tracker_count {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage_shipping_spend {
  label: string | null;
  count: number | null;
  date: string | null;
}

export interface GetAccounts_accounts_edges_node_usage {
  members: number | null;
  order_volume: number | null;
  total_errors: number | null;
  total_requests: number | null;
  total_trackers: number | null;
  total_shipments: number | null;
  total_shipping_spend: number | null;
  api_errors: GetAccounts_accounts_edges_node_usage_api_errors[] | null;
  api_requests: GetAccounts_accounts_edges_node_usage_api_requests[] | null;
  order_volumes: GetAccounts_accounts_edges_node_usage_order_volumes[] | null;
  shipment_count: GetAccounts_accounts_edges_node_usage_shipment_count[] | null;
  tracker_count: GetAccounts_accounts_edges_node_usage_tracker_count[] | null;
  shipping_spend: GetAccounts_accounts_edges_node_usage_shipping_spend[] | null;
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
  cursor: string;
}

export interface GetAccounts_accounts {
  page_info: GetAccounts_accounts_page_info;
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
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_page_info {
  count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface GetUsers_users_edges_node {
  id: number;
  email: string;
  full_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean | null;
  date_joined: any;
  last_login: any | null;
  permissions: string[] | null;
}

export interface GetUsers_users_edges {
  node: GetUsers_users_edges_node;
  cursor: string;
}

export interface GetUsers_users {
  page_info: GetUsers_users_page_info;
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
// GraphQL query operation: GetPermissionGroups
// ====================================================

export interface GetPermissionGroups_permission_groups_page_info {
  count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface GetPermissionGroups_permission_groups_edges_node {
  id: number;
  name: string;
  permissions: string[] | null;
}

export interface GetPermissionGroups_permission_groups_edges {
  node: GetPermissionGroups_permission_groups_edges_node;
  cursor: string;
}

export interface GetPermissionGroups_permission_groups {
  page_info: GetPermissionGroups_permission_groups_page_info;
  edges: GetPermissionGroups_permission_groups_edges[];
}

export interface GetPermissionGroups {
  permission_groups: GetPermissionGroups_permission_groups;
}

export interface GetPermissionGroupsVariables {
  filter?: PermissionGroupFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSystemConnections
// ====================================================

export interface GetSystemConnections_system_connections_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  metadata: any | null;
}

export interface GetSystemConnections_system_connections {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
  credentials: any;
  metadata: any | null;
  config: any | null;
  rate_sheet: GetSystemConnections_system_connections_rate_sheet | null;
}

export interface GetSystemConnections {
  system_connections: GetSystemConnections_system_connections[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSystemConnection
// ====================================================

export interface GetSystemConnection_system_connection_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  metadata: any | null;
}

export interface GetSystemConnection_system_connection {
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
  credentials: any;
  metadata: any | null;
  config: any | null;
  rate_sheet: GetSystemConnection_system_connection_rate_sheet | null;
}

export interface GetSystemConnection {
  system_connection: GetSystemConnection_system_connection | null;
}

export interface GetSystemConnectionVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRateSheets
// ====================================================

export interface GetRateSheets_rate_sheets_page_info {
  count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface GetRateSheets_rate_sheets_edges_node_services_zones {
  object_type: string;
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
}

export interface GetRateSheets_rate_sheets_edges_node_services {
  id: string;
  object_type: string;
  service_name: string | null;
  service_code: string | null;
  description: string | null;
  active: boolean | null;
  currency: CurrencyCodeEnum | null;
  transit_days: number | null;
  transit_time: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  dimension_unit: DimensionUnitEnum | null;
  zones: GetRateSheets_rate_sheets_edges_node_services_zones[];
}

export interface GetRateSheets_rate_sheets_edges_node_carriers {
  id: string;
  active: boolean;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  capabilities: string[];
  test_mode: boolean;
}

export interface GetRateSheets_rate_sheets_edges_node {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
  services: GetRateSheets_rate_sheets_edges_node_services[];
  carriers: GetRateSheets_rate_sheets_edges_node_carriers[];
}

export interface GetRateSheets_rate_sheets_edges {
  node: GetRateSheets_rate_sheets_edges_node;
  cursor: string;
}

export interface GetRateSheets_rate_sheets {
  page_info: GetRateSheets_rate_sheets_page_info;
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
// GraphQL query operation: GetRateSheet
// ====================================================

export interface GetRateSheet_rate_sheet_services_zones {
  object_type: string;
  label: string | null;
  rate: number | null;
  min_weight: number | null;
  max_weight: number | null;
  transit_days: number | null;
}

export interface GetRateSheet_rate_sheet_services {
  id: string;
  object_type: string;
  service_name: string | null;
  service_code: string | null;
  description: string | null;
  active: boolean | null;
  currency: CurrencyCodeEnum | null;
  transit_days: number | null;
  transit_time: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  dimension_unit: DimensionUnitEnum | null;
  zones: GetRateSheet_rate_sheet_services_zones[];
}

export interface GetRateSheet_rate_sheet_carriers {
  id: string;
  active: boolean;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  capabilities: string[];
  test_mode: boolean;
}

export interface GetRateSheet_rate_sheet {
  id: string;
  name: string;
  slug: string;
  carrier_name: CarrierNameEnum;
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
// GraphQL query operation: GetSurcharges
// ====================================================

export interface GetSurcharges_surcharges_carrier_accounts {
  id: string;
  active: boolean;
  carrier_id: string;
  test_mode: boolean;
  capabilities: string[];
  carrier_name: string;
  display_name: string;
}

export interface GetSurcharges_surcharges {
  object_type: string;
  id: string;
  name: string;
  active: boolean;
  amount: number;
  carriers: string[];
  services: string[];
  surcharge_type: string;
  carrier_accounts: GetSurcharges_surcharges_carrier_accounts[];
}

export interface GetSurcharges {
  surcharges: GetSurcharges_surcharges[];
}

export interface GetSurchargesVariables {
  filter?: SurchargeFilter | null;
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
  test_mode: boolean;
  capabilities: string[];
  carrier_name: string;
  display_name: string;
}

export interface GetSurcharge_surcharge {
  object_type: string;
  id: string;
  name: string;
  active: boolean;
  amount: number;
  carriers: string[];
  services: string[];
  surcharge_type: string;
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

export enum SurchargeTypeEnum {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
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
export interface PermissionGroupFilter {
  offset?: number | null;
  first?: number | null;
}

// null
export interface RateSheetFilter {
  offset?: number | null;
  first?: number | null;
  keyword?: string | null;
}

// null
export interface SurchargeFilter {
  id?: string | null;
  name?: string | null;
  active?: boolean | null;
  surcharge_type?: SurchargeTypeEnum | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================