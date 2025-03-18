import type { Metadata, Viewport } from "next";
import { locales } from "@/middleware";
import { headers } from "next/headers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { roboto_mono } from "@/lib/fonts";
import theme from "@/lib/theme";
import StateProvider from "@/components/StateProvider";
import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const url = new URL((await headers()).get("x-url")!);
  let canonical = url.pathname + url.search;
  for (const locale of locales)
    if (canonical.startsWith(`/${locale}`)) {
      canonical = canonical.substring(locale.length + 1);
      break;
    }
  const languages: { [key: string]: string } = {};
  for (const locale of locales)
    languages[locale] = `/${locale}${canonical}`;

  return {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL(url.origin),
    alternates: {
      canonical,
      languages,
    },
  };
};

export const viewport: Viewport = {
  width: "device-width, shrink-to-fit=no",
  initialScale: 1,
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ lang: string }>,
}>) {
  return (
    <html lang={(await params).lang}>
      <body className={roboto_mono.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StateProvider>
              {children}
            </StateProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};