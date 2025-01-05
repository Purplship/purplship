"use client";

import { ErrorBoundary } from "@karrio/ui/components/error-boudaries";
import APIMetadataProvider from "@karrio/hooks/api-metadata";
import { NextPostHogProvider } from "@karrio/hooks/posthog";
import { SessionProvider } from "next-auth/react";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@karrio/trpc/client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    }),
  );

  return (
    <SessionProvider session={(props as any).session} refetchInterval={5 * 60}>
      <NextPostHogProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient as any}>
          <QueryClientProvider client={queryClient}>
            <APIMetadataProvider {...(props as any)}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </APIMetadataProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </NextPostHogProvider>
    </SessionProvider>
  );
}
