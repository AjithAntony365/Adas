import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("pathname", req.nextUrl.pathname);
    // console.log("role", req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/dashboard4")
      //  &&
      // req.nextauth.token.role != "admin"
    ) {
      console.log("Middleware");
      //   return NextResponse.redirect(new URL('/home', request.url))

      return NextResponse.rewrite(new URL("/drivers", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard12"] };
