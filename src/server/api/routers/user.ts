import {hash, verify} from "argon2";
import { loginSchema, changePasswordSchema } from "@/lib/validators";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import { type Prisma } from "@prisma/client";
import { format } from "date-fns";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const {  email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new Error("Email này đã có người sử dụng!");
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
        message: "Đăng ký thành công!",
        result: result.email,
      };
    }),
    changePassword: publicProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { currentPassword, newPassword } = input;
      const userId = ctx.session?.user.id; // Giả sử bạn có session chứa userId

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Người dùng không tồn tại!");
      }
      if (!user.password) {
        throw new Error("Mật khẩu hiện tại không đúng");
      }

      const isPasswordValid = await verify(user.password, currentPassword);
      if (!isPasswordValid) {
        throw new Error("Mật khẩu hiện tại không đúng!");
      }

      const hashedNewPassword = await hash(newPassword);

      await ctx.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return {
        status: 200,
        message: "Thay đổi mật khẩu thành công!",
      };
    }),
    getAll: publicProcedure.query(async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany({
        orderBy: {
          createAt: "desc",
        },
      });

      return users.map((user) => ({
        id: user.id,
        email: user.email,
        createAt: format(user.createAt, "dd/MM/yyyy"),
        updateAt: format(user.updateAt, "dd/MM/yyyy"),
      }));
    }),
});
