import withAuth from "next-auth/middleware";
// import { NextResponse } from "next/server";

export default withAuth(
//   async function middleware(req) {
//     const { pathname } = req.nextUrl;
//     const token = req.nextauth.token;
//     const role = token?.role;
//     if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));
//     if (pathname.startsWith("/admin") && role !== "ADMIN")
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     if (pathname.startsWith("/dashboard") && role !== "USER")
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     return NextResponse.next();
//   },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // return !!token;
        // codes for handle guard just by authorized callback

          if (!token) return false;

          const { pathname } = req.nextUrl;
          const role = token.role;

          if (pathname.startsWith("/admin") && role !== "ADMIN") return false;
          if (pathname.startsWith("/dashboard") && role !== "USER") return false;

          return true;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/unauthorized",
    },
  }
);
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
