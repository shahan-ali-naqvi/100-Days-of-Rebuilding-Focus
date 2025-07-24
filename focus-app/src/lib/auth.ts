import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple demo authentication - in production, verify against your database
        if (credentials?.email === "demo@focusapp.com" && credentials?.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@focusapp.com",
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
})