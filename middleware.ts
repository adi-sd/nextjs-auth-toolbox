import NextAuth from "next-auth";
import { NextApiRequest } from "next";

import authConfig from "@/auth/auth.config";

import { AUTHENTICATED_USER_REDIRECT, DEFAULT_LOGIN, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const { auth }: { auth: any } = NextAuth(authConfig);

export default auth((req: any) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return null;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(AUTHENTICATED_USER_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN, nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
