import type { AppRouter } from "@karrio/trpc/server/router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
