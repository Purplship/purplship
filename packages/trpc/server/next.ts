import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@karrio/trpc/server/context";
import { appRouter } from "@karrio/trpc/server/router";

export const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: request,
    createContext: async () => {
      const ctx = await createContext();
      return ctx as any;
    },
  });
};
