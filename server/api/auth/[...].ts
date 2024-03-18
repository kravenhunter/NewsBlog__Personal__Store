/* eslint-disable n/prefer-global/process */
import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { H3Error } from "h3";
import CredentialsProvider from "next-auth/providers/credentials";

// const getUser = async(email:string) => {
//   const getUser = await $fetch("/api/auth/current-user",{
//     method: "POST",
//     body:
//   })
// }
//Auth middleware handler

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        //Fetch user from DB
        try {
          if (!credentials.email || !credentials.password) {
            throw createError({
              statusCode: 405,
              statusMessage: "Bad Request",
              message: "Missing required fields ",
            });
          }
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user?.email || !user?.hashedPassword) {
            throw createError({
              statusCode: 405,
              statusMessage: "Bad Request",
              message: "Invalid credentials",
            });
          }
          const correctPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
          if (!correctPassword) {
            throw createError({
              statusCode: 405,
              statusMessage: "Bad Request",
              message: "Invalid credentials",
            });
          }
          return user;
        } catch (error) {
          const errorResult = error as H3Error;
          throw createError({
            statusCode: errorResult.statusCode,
            message: errorResult.message,
            statusMessage: errorResult.statusMessage,
          });
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 600, //2592000 - 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };

      console.log("request session", token);
      //session.expires
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
