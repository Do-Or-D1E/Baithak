// lib/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest, createGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
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
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
