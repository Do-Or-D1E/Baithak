// lib/auth.js
import { getServerSession } from "next-auth/next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/* Options that NextAuth needs */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

/* ---- helper you can import anywhere on the server ------------------- */
export function auth(...args) {
  return getServerSession(...args, authOptions);
}

/* ---- handler for /api/auth/[...nextauth] ---------------------------- */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
