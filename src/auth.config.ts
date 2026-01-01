import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({}),
  ],
  callbacks: {
    authorized({ request, auth }) {
      // Check if user is not authenticated and accessing a protected path
      const protectedPaths = [
        /\/order\/checkout\/shipping/,
        /\/user\/(.*)/,
        /\/admin/,
      ];
      const { pathname } = request.nextUrl;
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;
      // Check for session cart cookie
      const sessionCartId = request.cookies.get("sessionCartId")?.value;
      if (!sessionCartId) {
        const newSessionCartId = crypto.randomUUID();
        const response = NextResponse.next();
        response.cookies.set("sessionCartId", newSessionCartId);
        return response;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
