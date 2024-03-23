import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkUserCredentials } from "../../../lib/helpers";

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email", name: "email" },
        password: { label: "Password", type: "password", placeholder: "Password", name: "password" }
      },
      async authorize(credentials, req) {
        const check = await checkUserCredentials(credentials.email, credentials.password)
        if (check) {
          return {
            email: credentials.email,
          }
        } else {
          return null
        }
      }
    }),
    CredentialsProvider({
      id: "register",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email", name: "email" },
      },
      async authorize(credentials, req) {
        if (credentials.email) {
          return {
            email: credentials.email,
          }
        } else {
          return null
        }
      }
    }),

  ]
}

export default (req, res) => NextAuth(req, res, options);