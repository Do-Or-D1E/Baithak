// lib/auth.js
import { getServerSession } from "next-auth/next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getGuest, createGuest } from "./data-service";

/* Options that NextAuth needs */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest.id;
        console.log("Guest ID set in session:", guest.id);
      } else {
        console.log("No guest found for email:", session.user.email);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

/* ---- helper you can import anywhere on the server ------------------- */
export function auth(...args) {
  return getServerSession(...args, authOptions);
}

/* ---- handler for /api/auth/[...nextauth] ---------------------------- */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
