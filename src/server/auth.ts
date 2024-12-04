import {type GetServerSidePropsContext} from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
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

          if (!result.password) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;
          console.log("Credentials received:", credentials);

          return {id: result.id, email};
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({session, token}) => {
      //console.log(session)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
    jwt: ({user, token}) => {
      //console.log(token)
      if (user) {
        return {
          ...token,
          ...user,
        }
      }
      return token
    }
  },
  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
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
