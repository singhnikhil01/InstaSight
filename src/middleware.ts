import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/site", "/api/uploadthing"]);
const afterAuth = async (req: NextRequest) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host") || ""; // Ensure hostname is a string
  const pathWithSearchParams = `${url.pathname}${
    searchParams ? `?${searchParams}` : ""
  }`;

  const customSubDomain = hostname
    .split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/agency/sign-in", req.url));
  }

  if (
    (url.pathname === "/" || url.pathname === "/site") &&
    hostname === process.env.NEXT_PUBLIC_DOMAIN
  ) {
    if (url.pathname === "/site") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/site", req.url));
  }

  if (url.pathname.startsWith("/agency") || url.pathname.startsWith("/site")) {
    return NextResponse.rewrite(new URL(pathWithSearchParams, req.url));
  }

  return NextResponse.next();
};

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth();
  return afterAuth(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
