import type { Context } from "@karrio/trpc/server/context";
import { initTRPC } from "@trpc/server";
import { Session } from "next-auth";

export interface CreateContextOptions {
  session: Session | null;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
