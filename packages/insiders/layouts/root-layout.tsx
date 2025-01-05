import {
  inter,
  jetbrains,
  noto,
  ubuntu,
  oxygen,
} from "@karrio/insiders/fonts/font";
import { ErrorBoundary } from "@karrio/ui/components/error-boudaries";
import { Toaster } from "@karrio/insiders/components/ui/toaster";
import { PublicEnvScript } from "next-runtime-env";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${noto.variable} ${ubuntu.variable} ${oxygen.variable}`}
    >
      <head>
        <PublicEnvScript />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
