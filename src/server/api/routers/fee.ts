import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {feeFormSchema, updateFeeFormSchema} from "@/lib/validators";
import {endOfMonth, format, startOfMonth, subMonths} from "date-fns";

export const feeRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const fee = await ctx.prisma.fee.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return fee.map((item) => ({
      id: item.id,
      apartmentNo: item.apartmentNo,
      apartmentSizeFee: item.apartmentSizeFee.toLocaleString('fr') + "₫",
      internetFee: item.internetFee.toLocaleString('fr') + "₫",
      electricityFee: item.electricityFee.toLocaleString('fr') + "₫",
      waterFee: item.waterFee.toLocaleString('fr') + "₫",
      contributionFee: item.contributionFee ? item.contributionFee.toLocaleString('fr') + "₫" : "0₫",
      vehicleFee: item.vehicleFee.toLocaleString('fr') + "₫",
      notes: item.notes,
      totalAmount: item.totalAmount.toLocaleString('fr') + "₫",
      dueDate: format(item.dueDate, "dd/MM/yyyy"),
      isPaid: item.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
      updateAt: format(item.updateAt, "dd/MM/yyyy"),
    }));
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.fee.findUnique({
      where: { id: input },
    });
  }),

  create: publicProcedure.input(feeFormSchema).mutation(async ({ ctx, input }) => {
    const apartmentExists = await ctx.prisma.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (!apartmentExists) {
      throw new Error("Chung cư này không tồn tại");
    }

    return ctx.prisma.fee.create({
      data: { ...input },
    });
  }),

  update: publicProcedure.input(updateFeeFormSchema).mutation(async ({ ctx, input }) => {
    const apartmentExists = await ctx.prisma.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (!apartmentExists) {
      throw new Error("Chung cư này không tồn tại");
    }

    return ctx.prisma.fee.update({
      where: { id: input.id },
      data: { ...input },
    });
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.fee.delete({
      where: { id: input },
    });
  }),
  getTotalContributionFee: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const currentMonthFees = await ctx.prisma.fee.findMany({
      where: {
        isPaid: true,
        dueDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      select: {
        contributionFee: true,
      },
    });

    const lastMonthFees = await ctx.prisma.fee.findMany({
      where: {
        isPaid: true,
        dueDate: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
      select: {
        contributionFee: true,
      },
    });

    const allTimeFees = await ctx.prisma.fee.findMany({
      where: {
        isPaid: true,
      },
      select: {
        contributionFee: true,
      },
    });

    const currentMonthTotal = currentMonthFees.reduce((total, fee) => total + (fee.contributionFee || 0), 0);
    const lastMonthTotal = lastMonthFees.reduce((total, fee) => total + (fee.contributionFee || 0), 0);
    const allTimeTotal = allTimeFees.reduce((total, fee) => total + (fee.contributionFee || 0), 0);

    const percentageChange = lastMonthTotal === 0 ? 0 : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    return {
      currentMonthTotal,
      percentageChange,
      allTimeTotal,
    };
  }),
  getRecentPayments: publicProcedure.query(async ({ ctx }) => {
    const recentPayments = await ctx.prisma.fee.findMany({
      where: {
        isPaid: true,
      },
      orderBy: {
        updateAt: 'desc',
      },
      take: 5,
      select: {
        apartmentNo: true,
        totalAmount: true,
        updateAt: true,
      },
    });

    return recentPayments.map((payment) => ({
      apartmentNo: payment.apartmentNo,
      totalAmount: payment.totalAmount.toLocaleString('fr') + "₫",
      updateAt: format(payment.updateAt, "dd/MM/yyyy"),
    }));
  }),
});