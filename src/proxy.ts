import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_LOCALE = "en";
export const LOCALES = [DEFAULT_LOCALE, "zh"];

function getLocale(request: NextRequest) {
  const languages = request.headers.get("accept-language");
  if (!languages)
    return DEFAULT_LOCALE;
  return match(new Negotiator({ headers: { "accept-language": languages } }).languages(), LOCALES, DEFAULT_LOCALE);
}

export async function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl);
  }

  // Add url to headers
  const response = NextResponse.next();
  response.headers.set("x-url", request.url);
  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)"
}