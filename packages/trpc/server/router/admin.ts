import {
  GET_USERS,
  GET_ACCOUNTS,
  GET_SURCHARGE,
  GET_RATE_SHEET,
  GET_SURCHARGES,
  GET_RATE_SHEETS,
  GET_GROUP_PERMISSIONS,
  GET_SYSTEM_CONNECTIONS,
  GET_SYSTEM_CONNECTION,
} from "@karrio/types/graphql/admin/queries";
import {
  GetUsers,
  GetAccounts,
  GetRateSheet,
  GetRateSheets,
  GetSurcharge,
  GetSurcharges,
  GetPermissionGroups,
  GetSystemConnection,
  GetSystemConnections,
} from "@karrio/types/graphql/admin/types";
import { protectedProcedure } from "@karrio/trpc/server/middleware";
import { router } from "@karrio/trpc/server/_app";
import { gqlstr } from "@karrio/lib";
import { z } from "zod";

// Input validation schemas
const accountFilterSchema = z
  .object({
    offset: z.number().optional(),
    first: z.number().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    is_active: z.boolean().optional(),
    order_by: z.string().optional(),
  })
  .optional();

const userFilterSchema = z
  .object({
    offset: z.number().optional(),
    first: z.number().optional(),
    id: z.string().optional(),
    email: z.string().optional(),
    is_staff: z.boolean().optional(),
    is_active: z.boolean().optional(),
    is_superuser: z.boolean().optional(),
    order_by: z.string().optional(),
  })
  .optional();

const permissionGroupFilterSchema = z
  .object({
    offset: z.number().optional(),
    first: z.number().optional(),
  })
  .optional();

const rateSheetFilterSchema = z
  .object({
    offset: z.number().optional(),
    first: z.number().optional(),
    keyword: z.string().optional(),
  })
  .optional();

const surchargeFilterSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    active: z.boolean().optional(),
    surcharge_type: z.enum(["AMOUNT", "PERCENTAGE"]).optional(),
  })
  .optional();

export const adminRouter = router({
  // Accounts
  getAccounts: protectedProcedure
    .input(accountFilterSchema)
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetAccounts>(gqlstr(GET_ACCOUNTS), {
        variables: { filter: input },
      });
    }),

  // Users
  getUsers: protectedProcedure
    .input(userFilterSchema)
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetUsers>(gqlstr(GET_USERS), {
        variables: { filter: input },
      });
    }),

  // Permission Groups
  getPermissionGroups: protectedProcedure
    .input(permissionGroupFilterSchema)
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetPermissionGroups>(
        gqlstr(GET_GROUP_PERMISSIONS),
        {
          variables: { filter: input },
        },
      );
    }),

  // System Connections
  getSystemConnections: protectedProcedure.query(async ({ ctx }) => {
    const client = ctx.karrio;
    return client.admin.request<GetSystemConnections>(
      gqlstr(GET_SYSTEM_CONNECTIONS),
    );
  }),

  getSystemConnection: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetSystemConnection>(
        gqlstr(GET_SYSTEM_CONNECTION),
        { variables: input },
      );
    }),

  // Rate Sheets
  getRateSheets: protectedProcedure
    .input(rateSheetFilterSchema)
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetRateSheets>(gqlstr(GET_RATE_SHEETS), {
        variables: { filter: input },
      });
    }),

  getRateSheet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetRateSheet>(gqlstr(GET_RATE_SHEET), {
        variables: input,
      });
    }),

  // Surcharges
  getSurcharges: protectedProcedure
    .input(surchargeFilterSchema)
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetSurcharges>(gqlstr(GET_SURCHARGES), {
        variables: { filter: input },
      });
    }),

  getSurcharge: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const client = ctx.karrio;
      return client.admin.request<GetSurcharge>(gqlstr(GET_SURCHARGE), {
        variables: input,
      });
    }),
});
