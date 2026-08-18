import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Authorization is enforced by the callback below.
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
