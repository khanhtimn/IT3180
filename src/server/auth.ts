import {type GetServerSidePropsContext} from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import {loginSchema} from "@/lib/validators";
import {verify} from "argon2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "khanh.pq224867@sis.hust.edu.vn",
        },
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
          const {email, password} = await loginSchema.parseAsync(credentials);

          const result = await prisma.user.findFirst({
            where: {email},
          });

          if (!result) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return {id: result.id, email};
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({token, user}) => {
      console.log("JWT callback:", token, user);
      if (user) {
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },

    session: async ({session, token}) => {
      console.log("Session callback:", session, token);
      if (token) {
        session.user.id = token.userId;
        session.user.email = token.email;
      }
      return session;
    },

    // session: ({session, token}) => ({
    //   strategy: "jwt",
    //   maxAge: 60 * 60 * 24, // 1 Day
    //   ...session,
    //   user: {
    //     ...session.user,
    //     email: token.email,
    //     id: token.id,
    //   },
    // }),
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    maxAge: 5 * 60 * 1000,
  },

  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};