import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/portfolio/context/LanguageContext";
import { Navbar } from "@/portfolio/components/Navbar";
import { Footer } from "@/portfolio/components/Footer";
import { NotFoundView } from "@/portfolio/components/NotFoundView";
import { CursorOrb } from "@/portfolio/components/CursorOrb";
import { ScrollToTop } from "@/portfolio/components/ScrollToTop";
import { ScrollProgressBar } from "@/portfolio/components/Primitives";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { loadPublicContent } from "@/lib/public-content";
import { hydrateContent } from "@/admin/data/store";

function NotFoundComponent() {
  return <NotFoundView />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: () => loadPublicContent(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Asadbek Jumanazarov" },
      { name: "theme-color", content: "#050607" },
      { name: "color-scheme", content: "dark" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],[style*="translateY(110%)"],[style*="translateY(100%)"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const admin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });
  // Same data on the server and in the browser's first render; idempotent for the same loader result.
  hydrateContent(Route.useLoaderData());

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <ScrollToTop />
        {admin ? <Outlet /> : <>
        <CursorOrb />
        <ScrollProgressBar />
        <div className="relative flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            <Outlet />
          </main>
          <Footer />
        </div>
        </>}
      </LanguageProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
