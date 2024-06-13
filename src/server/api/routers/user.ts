import {hash} from "argon2";
import { loginSchema } from "@/lib/validators";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import { type Prisma } from "@prisma/client";


export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const {  email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await hash(password);

      const userData: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
      };

      const result = await ctx.prisma.user.create({
        data: userData,
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
  // login: publicProcedure
  //   .input(loginSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { email, password } = input;
  //
  //     const user = await ctx.prisma.user.findFirst({
  //       where: { email },
  //     });
  //
  //     if (!user) {
  //       throw new Error("Invalid email or password.");
  //     }
  //
  //     const isPasswordValid = await verify(password, user.password);
  //
  //     if (!isPasswordValid) {
  //       throw new Error("Invalid email or password.");
  //     }
  //
  //     // If you are using a session-based authentication system, you might need to create a session here
  //     // Otherwise, generate a token or handle the successful login accordingly
  //
  //     return {
  //       status: 200,
  //       message: "Login successful",
  //       result: user.email,
  //     };
  //   }),

  // login: publicProcedure
  //   .input(loginSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { email, password } = input;
  //
  //     const user = await ctx.prisma.user.findFirst({
  //       where: { email },
  //     });
  //
  //     if (!user) {
  //       throw new Error("Invalid email or password.");
  //     }
  //
  //     const isPasswordValid = await verify(user.password, password);
  //
  //     if (!isPasswordValid) {
  //       throw new Error("Invalid email or password.");
  //     }
  //
  //     // Using signIn function to authenticate the user
  //     // const result = await signIn('credentials', {
  //     //   redirect: false,
  //     //   email,
  //     //   password,
  //     //   callbackUrl: '/dashboard'
  //     // });
  //     //
  //     // if (result?.error) {
  //     //   throw new Error(result.error);
  //     // }
  //     //
  //     // return {
  //     //   status: 200,
  //     //   message: "Login successful",
  //     //   result: result?.url, // You can return the callback URL or other relevant information
  //     // };
  //     const signInResult = await signIn('credentials', {
  //       redirect: false,
  //       email,
  //       password,
  //       callbackUrl: '/dashboard'
  //     });
  //
  //     if (signInResult?.error) {
  //       throw new Error(signInResult.error);
  //     }
  //
  //     // Create a session using getServerSession
  //     const token = await getToken({ req: ctx.req, secret: process.env.NEXTAUTH_SECRET });
  //
  //     return {
  //       status: 200,
  //       message: "Login successful",
  //       result: signInResult?.url, // You can return the callback URL or other relevant information
  //       token, // Include session information in the response
  //     };
  //   }),
});
