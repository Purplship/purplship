import { router } from "@karrio/trpc/server/_app";
import { protectedProcedure } from "@karrio/trpc/server/middleware";
import { z } from "zod";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
  GET_CONFIGS,
  UPDATE_CONFIGS,
  GET_SURCHARGE,
  GET_SURCHARGES,
  CREATE_SURCHARGE,
  UPDATE_SURCHARGE,
  DELETE_SURCHARGE,
  GET_RATE_SHEET,
  GET_RATE_SHEETS,
  CREATE_RATE_SHEET,
  UPDATE_RATE_SHEET,
  DELETE_RATE_SHEET,
  GET_SYSTEM_CONNECTIONS,
  GET_SYSTEM_CONNECTION,
  CREATE_SYSTEM_CONNECTION,
  UPDATE_SYSTEM_CONNECTION,
  DELETE_SYSTEM_CONNECTION,
  GET_ACCOUNTS,
  CREATE_ORGANIZATION_ACCOUNT,
  UPDATE_ORGANIZATION_ACCOUNT,
  DISABLE_ORGANIZATION_ACCOUNT,
  DELETE_ORGANIZATION_ACCOUNT,
  GET_PERMISSION_GROUPS,
} from "@karrio/types/graphql/admin/queries";
import { gqlstr } from "@karrio/lib";
import type {
  GetUsers,
  GetConfigs,
  GetSurcharge,
  GetSurcharges,
  GetSystemConnections,
  GetSystemConnection,
  GetAccounts,
  GetPermissionGroups,
  CreateUser,
  UpdateUser,
  RemoveUser,
  UpdateConfigs,
  CreateSurcharge,
  UpdateSurcharge,
  DeleteSurcharge,
  GetRateSheet,
  GetRateSheets,
  CreateRateSheet,
  UpdateRateSheet,
  DeleteRateSheet,
  CreateSystemConnection,
  UpdateSystemConnection,
  DeleteSystemConnection,
  CreateOrganizationAccount,
  UpdateOrganizationAccount,
  DisableOrganizationAccount,
  DeleteOrganizationAccount,
} from "@karrio/types/graphql/admin/types";

const usersRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        filter: z
          .object({
            email: z.string().optional(),
            is_staff: z.boolean().optional(),
            is_active: z.boolean().optional(),
            is_superuser: z.boolean().optional(),
            order_by: z.string().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { users } = await client.admin.request<GetUsers>(
        gqlstr(GET_USERS),
        {
          filter: input.filter,
        },
      );
      return users;
    }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          email: z.string(),
          full_name: z.string(),
          is_staff: z.boolean().optional(),
          is_active: z.boolean().optional(),
          is_superuser: z.boolean().optional(),
          permissions: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { create_user } = await client.admin.request<CreateUser>(
        gqlstr(CREATE_USER),
        {
          data: input.data,
        },
      );
      return create_user;
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
          email: z.string().optional(),
          full_name: z.string().optional(),
          is_staff: z.boolean().optional(),
          is_active: z.boolean().optional(),
          is_superuser: z.boolean().optional(),
          permissions: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_user } = await client.admin.request<UpdateUser>(
        gqlstr(UPDATE_USER),
        {
          data: input.data,
        },
      );
      return update_user;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { remove_user } = await client.admin.request<RemoveUser>(
        gqlstr(REMOVE_USER),
        {
          data: input.data,
        },
      );
      return remove_user;
    }),
});

const configsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const client = ctx.karrio;
    const { configs } = await client.admin.request<GetConfigs>(
      gqlstr(GET_CONFIGS),
    );
    return configs;
  }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          EMAIL_USE_TLS: z.boolean().optional(),
          EMAIL_HOST_USER: z.string().optional(),
          EMAIL_HOST_PASSWORD: z.string().optional(),
          EMAIL_HOST: z.string().optional(),
          EMAIL_PORT: z.number().optional(),
          EMAIL_FROM_ADDRESS: z.string().optional(),
          GOOGLE_CLOUD_API_KEY: z.string().optional(),
          CANADAPOST_ADDRESS_COMPLETE_API_KEY: z.string().optional(),
          ORDER_DATA_RETENTION: z.number().optional(),
          TRACKER_DATA_RETENTION: z.number().optional(),
          SHIPMENT_DATA_RETENTION: z.number().optional(),
          API_LOGS_DATA_RETENTION: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_configs } = await client.admin.request<UpdateConfigs>(
        gqlstr(UPDATE_CONFIGS),
        {
          data: input.data,
        },
      );
      return update_configs;
    }),
});

const surchargesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const client = ctx.karrio;
    const { surcharges } = await client.admin.request<GetSurcharges>(
      gqlstr(GET_SURCHARGES),
    );
    return surcharges;
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { surcharge } = await client.admin.request<GetSurcharge>(
        gqlstr(GET_SURCHARGE),
        {
          id: input.id,
        },
      );
      return surcharge;
    }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          amount: z.number(),
          surcharge_type: z.string(),
          active: z.boolean().optional(),
          carriers: z.array(z.string()).optional(),
          services: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { create_surcharge } = await client.admin.request<CreateSurcharge>(
        gqlstr(CREATE_SURCHARGE),
        {
          data: input.data,
        },
      );
      return create_surcharge;
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
          name: z.string().optional(),
          amount: z.number().optional(),
          surcharge_type: z.string().optional(),
          active: z.boolean().optional(),
          carriers: z.array(z.string()).optional(),
          services: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_surcharge } = await client.admin.request<UpdateSurcharge>(
        gqlstr(UPDATE_SURCHARGE),
        {
          data: input.data,
        },
      );
      return update_surcharge;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { delete_surcharge } = await client.admin.request<DeleteSurcharge>(
        gqlstr(DELETE_SURCHARGE),
        {
          data: input.data,
        },
      );
      return delete_surcharge;
    }),
});

const rateSheetsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        filter: z.object({}).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { rate_sheets } = await client.admin.request<GetRateSheets>(
        gqlstr(GET_RATE_SHEETS),
        {
          filter: input.filter,
        },
      );
      return rate_sheets;
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { rate_sheet } = await client.admin.request<GetRateSheet>(
        gqlstr(GET_RATE_SHEET),
        {
          id: input.id,
        },
      );
      return rate_sheet;
    }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          carrier_name: z.string(),
          services: z
            .array(
              z.object({
                service_name: z.string(),
                service_code: z.string().optional(),
                carrier_service_code: z.string().optional(),
                description: z.string().optional(),
                active: z.boolean().optional(),
                currency: z.string().optional(),
                transit_days: z.number().optional(),
                transit_time: z.number().optional(),
                max_width: z.number().optional(),
                max_height: z.number().optional(),
                max_length: z.number().optional(),
                dimension_unit: z.string().optional(),
                max_weight: z.number().optional(),
                weight_unit: z.string().optional(),
                domicile: z.boolean().optional(),
                international: z.boolean().optional(),
                zones: z
                  .array(
                    z.object({
                      label: z.string(),
                      rate: z.number(),
                      min_weight: z.number().optional(),
                      max_weight: z.number().optional(),
                      transit_days: z.number().optional(),
                      transit_time: z.number().optional(),
                      radius: z.number().optional(),
                      latitude: z.number().optional(),
                      longitude: z.number().optional(),
                      cities: z.array(z.string()).optional(),
                      postal_codes: z.array(z.string()).optional(),
                      country_codes: z.array(z.string()).optional(),
                    }),
                  )
                  .optional(),
              }),
            )
            .optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { create_rate_sheet } = await client.admin.request<CreateRateSheet>(
        gqlstr(CREATE_RATE_SHEET),
        {
          data: input.data,
        },
      );
      return create_rate_sheet;
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
          name: z.string().optional(),
          carrier_name: z.string().optional(),
          services: z
            .array(
              z.object({
                id: z.string().optional(),
                service_name: z.string().optional(),
                service_code: z.string().optional(),
                carrier_service_code: z.string().optional(),
                description: z.string().optional(),
                active: z.boolean().optional(),
                currency: z.string().optional(),
                transit_days: z.number().optional(),
                transit_time: z.number().optional(),
                max_width: z.number().optional(),
                max_height: z.number().optional(),
                max_length: z.number().optional(),
                dimension_unit: z.string().optional(),
                max_weight: z.number().optional(),
                weight_unit: z.string().optional(),
                domicile: z.boolean().optional(),
                international: z.boolean().optional(),
                zones: z
                  .array(
                    z.object({
                      id: z.string().optional(),
                      label: z.string().optional(),
                      rate: z.number().optional(),
                      min_weight: z.number().optional(),
                      max_weight: z.number().optional(),
                      transit_days: z.number().optional(),
                      transit_time: z.number().optional(),
                      radius: z.number().optional(),
                      latitude: z.number().optional(),
                      longitude: z.number().optional(),
                      cities: z.array(z.string()).optional(),
                      postal_codes: z.array(z.string()).optional(),
                      country_codes: z.array(z.string()).optional(),
                    }),
                  )
                  .optional(),
              }),
            )
            .optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_rate_sheet } = await client.admin.request<UpdateRateSheet>(
        gqlstr(UPDATE_RATE_SHEET),
        {
          data: input.data,
        },
      );
      return update_rate_sheet;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { delete_rate_sheet } = await client.admin.request<DeleteRateSheet>(
        gqlstr(DELETE_RATE_SHEET),
        {
          data: input.data,
        },
      );
      return delete_rate_sheet;
    }),
});

const systemConnectionsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const client = ctx.karrio;
    const { system_carrier_connections } =
      await client.admin.request<GetSystemConnections>(
        gqlstr(GET_SYSTEM_CONNECTIONS),
      );
    return system_carrier_connections;
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { system_carrier_connection } =
        await client.admin.request<GetSystemConnection>(
          gqlstr(GET_SYSTEM_CONNECTION),
          { id: input.id },
        );
      return system_carrier_connection;
    }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          carrier_name: z.string(),
          display_name: z.string(),
          test_mode: z.boolean().optional(),
          active: z.boolean().optional(),
          capabilities: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { create_system_carrier_connection } =
        await client.admin.request<CreateSystemConnection>(
          gqlstr(CREATE_SYSTEM_CONNECTION),
          { data: input.data },
        );
      return create_system_carrier_connection;
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
          carrier_name: z.string().optional(),
          display_name: z.string().optional(),
          test_mode: z.boolean().optional(),
          active: z.boolean().optional(),
          capabilities: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_system_carrier_connection } =
        await client.admin.request<UpdateSystemConnection>(
          gqlstr(UPDATE_SYSTEM_CONNECTION),
          { data: input.data },
        );
      return update_system_carrier_connection;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { delete_system_carrier_connection } =
        await client.admin.request<DeleteSystemConnection>(
          gqlstr(DELETE_SYSTEM_CONNECTION),
          { data: input.data },
        );
      return delete_system_carrier_connection;
    }),
});

const organizationAccountsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        filter: z.object({}).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { accounts } = await client.admin.request<GetAccounts>(
        gqlstr(GET_ACCOUNTS),
        {
          filter: input.filter,
        },
      );
      return accounts;
    }),
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          slug: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { create_organization_account } =
        await client.admin.request<CreateOrganizationAccount>(
          gqlstr(CREATE_ORGANIZATION_ACCOUNT),
          { data: input.data },
        );
      return create_organization_account;
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
          name: z.string().optional(),
          slug: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { update_organization_account } =
        await client.admin.request<UpdateOrganizationAccount>(
          gqlstr(UPDATE_ORGANIZATION_ACCOUNT),
          { data: input.data },
        );
      return update_organization_account;
    }),
  disable: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { disable_organization_account } =
        await client.admin.request<DisableOrganizationAccount>(
          gqlstr(DISABLE_ORGANIZATION_ACCOUNT),
          { data: input.data },
        );
      return disable_organization_account;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        data: z.object({
          id: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = ctx.karrio;
      const { delete_organization_account } =
        await client.admin.request<DeleteOrganizationAccount>(
          gqlstr(DELETE_ORGANIZATION_ACCOUNT),
          { data: input.data },
        );
      return delete_organization_account;
    }),
});

const permissionGroupsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const client = ctx.karrio;
    const { permission_groups } =
      await client.admin.request<GetPermissionGroups>(
        gqlstr(GET_PERMISSION_GROUPS),
      );
    return permission_groups;
  }),
});

export const adminRouter = router({
  users: usersRouter,
  configs: configsRouter,
  surcharges: surchargesRouter,
  rate_sheets: rateSheetsRouter,
  system_connections: systemConnectionsRouter,
  organization_accounts: organizationAccountsRouter,
  permission_groups: permissionGroupsRouter,
});

export type AdminRouter = typeof adminRouter;
