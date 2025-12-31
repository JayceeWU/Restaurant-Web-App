import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest, NextResponse } from "next/server";

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
    authorized({ request }: { request: NextRequest }) {
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
