import { middleware, procedure } from "@karrio/trpc/server/_app";
import { TRPCError } from "@trpc/server";
import { Session } from "next-auth";

export const isAuthed = middleware(async ({ ctx, next }) => {
  const session = ctx.session as Session | null;

  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session,
      user: session.user,
    },
  });
});

// Create a protected procedure that ensures session type
export const protectedProcedure = procedure.use(isAuthed);
