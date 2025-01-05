import {
  Auth,
  logger,
  parseJwt,
  KARRIO_API,
  computeTestMode,
} from "@karrio/lib";
import { cookies, headers, type UnsafeUnwrappedHeaders } from "next/headers";
import Credentials from "next-auth/providers/credentials";
import { loadMetadata } from "@karrio/core/context/main";
import NextAuth from "next-auth";
import moment from "moment";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ orgId, ...credentials }: any, req: any) {
        try {
          const { metadata } = await loadMetadata();
          const auth = Auth(metadata?.HOST || (KARRIO_API as string));
          const token = await auth.authenticate(credentials as any);
          const testMode = (headers() as unknown as UnsafeUnwrappedHeaders)
            .get("referer")
            ?.includes("/test");
          const org = metadata?.MULTI_ORGANIZATIONS
            ? await auth.getCurrentOrg(token.access, orgId)
            : { id: null };

          return {
            email: credentials.email,
            accessToken: token.access,
            refreshToken: token.refresh,
            orgId: org?.id,
            testMode,
          } as any;
        } catch (e) {
          logger.error(e);
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any): Promise<any> => {
      const auth = Auth(KARRIO_API as string);
      const headersList = await headers();

      if (user?.accessToken) {
        token.orgId = user.orgId;
        token.testMode = user.testMode;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiration = parseJwt(user.accessToken as string).exp;
      } else if (headersList.get("referer")) {
        token.testMode = computeTestMode(await cookies(), await headers());
      }

      if (trigger === "update" && session?.orgId) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        const org = await auth.getCurrentOrg(
          (token as any).accessToken,
          session.orgId,
        );
        token.orgId = org?.id;
      }

      // Return previous token if the access token has not expired yet
      if (
        moment().subtract(3, "m").toDate().getTime() <
        (token.expiration as number) * 1000
      ) {
        return token;
      }

      // Access token has expired, try to update it
      try {
        logger.info("Refreshing expired token...");
        const { access, refresh } = await auth.refreshToken(
          token.refreshToken as string,
        );
        return {
          ...token,
          accessToken: access,
          refreshToken: refresh,
          expiration: parseJwt(access).exp,
        };
      } catch (error) {
        logger.error(error);
        return {
          error: "RefreshAccessTokenError",
        };
      }
    },
    session: async ({ session, token, user }: any) => {
      session.accessToken = token.accessToken;
      session.expires = token.expiration;
      session.testMode = token.testMode;
      session.error = token.error;
      session.orgId = token.orgId;
      session.user = {
        ...(user || session.user || {}),
        accessToken: token.accessToken,
        testMode: token.testMode,
        orgId: token.orgId,
      };

      return session;
    },
  },
});
