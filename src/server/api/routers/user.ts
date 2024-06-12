import { hash } from "argon2";
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
});
