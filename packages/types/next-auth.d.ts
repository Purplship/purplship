import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    expires: number;
    testMode: boolean;
    error: string | null;
    orgId: string;
    user: {
      accessToken: string;
      testMode: boolean;
      orgId: string;
    };
  }
}
