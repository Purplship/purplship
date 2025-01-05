import gql from "graphql-tag";

// -----------------------------------------------------------
// Account Related Queries
// -----------------------------------------------------------
//#region

export const GET_ACCOUNTS = gql`
  query GetAccounts($filter: AccountFilter) {
    accounts(filter: $filter) {
      page_info {
        count
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
      edges {
        node {
          id
          name
          slug
          is_active
          created
          modified
          usage {
            members
            order_volume
            total_errors
            total_requests
            total_trackers
            total_shipments
            total_shipping_spend
            api_errors {
              label
              count
              date
            }
            api_requests {
              label
              count
              date
            }
            order_volumes {
              label
              count
              date
            }
            shipment_count {
              label
              count
              date
            }
            tracker_count {
              label
              count
              date
            }
            shipping_spend {
              label
              count
              date
            }
          }
        }
        cursor
      }
    }
  }
`;

//#endregion

// -----------------------------------------------------------
// User Related Queries
// -----------------------------------------------------------
//#region

export const GET_USERS = gql`
  query GetUsers($filter: UserFilter) {
    users(filter: $filter) {
      page_info {
        count
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
      edges {
        node {
          id
          email
          full_name
          is_staff
          is_active
          is_superuser
          date_joined
          last_login
          permissions
        }
        cursor
      }
    }
  }
`;

export const GET_GROUP_PERMISSIONS = gql`
  query GetPermissionGroups($filter: PermissionGroupFilter) {
    permission_groups(filter: $filter) {
      page_info {
        count
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
      edges {
        node {
          id
          name
          permissions
        }
        cursor
      }
    }
  }
`;

//#endregion

// -----------------------------------------------------------
// Carrier Related Queries
// -----------------------------------------------------------
//#region

export const GET_SYSTEM_CONNECTIONS = gql`
  query GetSystemConnections {
    system_connections {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      capabilities
      credentials
      metadata
      config
      rate_sheet {
        id
        name
        slug
        carrier_name
        metadata
      }
    }
  }
`;

export const GET_SYSTEM_CONNECTION = gql`
  query GetSystemConnection($id: String!) {
    system_connection(id: $id) {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      capabilities
      credentials
      metadata
      config
      rate_sheet {
        id
        name
        slug
        carrier_name
        metadata
      }
    }
  }
`;

//#endregion

// -----------------------------------------------------------
// Rate Sheet Related Queries
// -----------------------------------------------------------
//#region

export const GET_RATE_SHEETS = gql`
  query GetRateSheets($filter: RateSheetFilter) {
    rate_sheets(filter: $filter) {
      page_info {
        count
        has_next_page
        has_previous_page
        start_cursor
        end_cursor
      }
      edges {
        node {
          id
          name
          slug
          carrier_name
          services {
            id
            object_type
            service_name
            service_code
            description
            active
            currency
            transit_days
            transit_time
            max_width
            max_height
            max_length
            dimension_unit
            zones {
              object_type
              label
              rate
              min_weight
              max_weight
              transit_days
            }
          }
          carriers {
            id
            active
            carrier_id
            carrier_name
            display_name
            capabilities
            test_mode
          }
        }
        cursor
      }
    }
  }
`;

export const GET_RATE_SHEET = gql`
  query GetRateSheet($id: String!) {
    rate_sheet(id: $id) {
      id
      name
      slug
      carrier_name
      services {
        id
        object_type
        service_name
        service_code
        description
        active
        currency
        transit_days
        transit_time
        max_width
        max_height
        max_length
        dimension_unit
        zones {
          object_type
          label
          rate
          min_weight
          max_weight
          transit_days
        }
      }
      carriers {
        id
        active
        carrier_id
        carrier_name
        display_name
        capabilities
        test_mode
      }
    }
  }
`;

//#endregion

// -----------------------------------------------------------
// Surcharge Related Queries
// -----------------------------------------------------------
//#region

export const GET_SURCHARGES = gql`
  query GetSurcharges($filter: SurchargeFilter) {
    surcharges(filter: $filter) {
      object_type
      id
      name
      active
      amount
      carriers
      services
      surcharge_type
      carrier_accounts {
        id
        active
        carrier_id
        test_mode
        capabilities
        carrier_name
        display_name
      }
    }
  }
`;

export const GET_SURCHARGE = gql`
  query GetSurcharge($id: String!) {
    surcharge(id: $id) {
      object_type
      id
      name
      active
      amount
      carriers
      services
      surcharge_type
      carrier_accounts {
        id
        active
        carrier_id
        test_mode
        capabilities
        carrier_name
        display_name
      }
    }
  }
`;

//#endregion
