import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { consumeRateLimit } from "@/lib/rate-limit";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials?.email?.trim().toLowerCase();
        const requestHeaders = req.headers || {};
        const ip = requestHeaders["x-forwarded-for"]?.split(",")[0]?.trim() || requestHeaders["x-real-ip"] || "unknown";
        if (!consumeRateLimit(`login:ip:${ip}`, 10, 15 * 60 * 1000) || (email && !consumeRateLimit(`login:email:${email}`, 10, 15 * 60 * 1000))) {
          throw new Error("Too many attempts");
        }
        if (!email || !credentials?.password || credentials.password.length > 128) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
