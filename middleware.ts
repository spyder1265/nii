import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;

    if (!isAuth) {
      return NextResponse.redirect(
        new URL(
          `/auth/signin?callbackUrl=${encodeURIComponent(
            req.nextUrl.pathname
          )}`,
          req.url
        )
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // Only protect dashboard routes
};
