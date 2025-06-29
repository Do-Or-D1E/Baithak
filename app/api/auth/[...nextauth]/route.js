import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";

// In this file, we can safely create the API handlers
const {
  handlers: { GET, POST },
} = NextAuth(authConfig);

export { GET, POST };
