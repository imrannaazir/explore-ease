import { jwtDecode } from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  PRIVET_ROUTES,
  Role,
  ROOT_ROUTE,
  SIGN_IN_ROUTE,
  USER_ROUTES,
} from "./constants";
import type { TJwtPayload } from "./types";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const decoded = accessToken ? (jwtDecode(accessToken) as TJwtPayload) : null;
  const { nextUrl } = request;

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPrivetRoute = PRIVET_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname);
  const isUserRoute = USER_ROUTES.includes(nextUrl.pathname);

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(ROOT_ROUTE, nextUrl));
  }

  if (!accessToken && !decoded && isPrivetRoute) {
    return NextResponse.redirect(new URL(SIGN_IN_ROUTE, nextUrl));
  }

  if (isAdminRoute && accessToken && decoded?.role !== Role.ADMIN) {
    return deleteCookiesAndRedirect(SIGN_IN_ROUTE, nextUrl);
  }

  if (isUserRoute && accessToken && decoded?.role !== Role.USER) {
    return deleteCookiesAndRedirect(SIGN_IN_ROUTE, nextUrl);
  }

  return NextResponse.next();
}

function deleteCookiesAndRedirect(redirectPath: string, nextUrl: URL) {
  const response = NextResponse.redirect(new URL(redirectPath, nextUrl));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
