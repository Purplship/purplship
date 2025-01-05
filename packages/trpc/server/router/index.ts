import { adminRouter } from "@karrio/trpc/server/router/admin";
import { procedure, router } from "@karrio/trpc/server/_app";
import { isAuthed } from "@karrio/trpc/server/middleware";

// Create a protected procedure that ensures session type
export const protectedProcedure = procedure.use(isAuthed);

export const appRouter = router({
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
