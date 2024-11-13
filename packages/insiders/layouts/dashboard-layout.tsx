import { KARRIO_PUBLIC_URL, MULTI_TENANT } from "@karrio/lib";
import { Sidebar } from "@karrio/insiders/components/sidebar";
import { Navbar } from "@karrio/insiders/components/navbar";
import { Providers } from "@karrio/hooks/providers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // await requireAuthentication(session);

  // const metadata = await loadMetadata();
  // const user = await loadUserData(session, metadata.metadata as Metadata);
  // const org = await loadOrgData(session, metadata.metadata as Metadata);
  // const orgId = ((session as any)?.orgId as string) || null;

  const pageProps = {
    // orgId,
    // ...org,
    // ...user,
    // ...metadata,
    // session,
    // MULTI_TENANT,
    // KARRIO_PUBLIC_URL,
  };

  return (
    <>
      <Providers {...pageProps}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
          <Sidebar />

          <div className="flex flex-col">
            <Navbar />

            {children}
          </div>
        </div>
      </Providers>
    </>
  );
}
