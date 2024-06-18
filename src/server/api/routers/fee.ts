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
      apartmentSizeFee: item.apartmentSizeFee.toLocaleString('vi-VN') + "₫",
      internetFee: item.internetFee.toLocaleString('vi-VN') + "₫",
      electricityFee: item.electricityFee.toLocaleString('vi-VN') + "₫",
      waterFee: item.waterFee.toLocaleString('vi-VN') + "₫",
      contributionFee: item.contributionFee ? item.contributionFee.toLocaleString('vi-VN') + "₫" : "0₫",
      vehicleFee: item.vehicleFee.toLocaleString('vi-VN') + "₫",
      notes: item.notes,
      totalAmount: item.totalAmount.toLocaleString('vi-VN') + "₫",
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

  getMonthlyFees: publicProcedure.query(async ({ ctx }) => {
    const fees = await ctx.prisma.fee.findMany({
      where: { isPaid: true },
      orderBy: { dueDate: "asc" },
    });

    const monthlyFees = fees.reduce((acc, fee) => {
      const monthYear = format(new Date(fee.dueDate), "MM/yyyy");
      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += fee.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(monthlyFees).map(monthYear => ({
      date: monthYear,
      total: monthlyFees[monthYear],
    }));
  }),

  create: publicProcedure.input(feeFormSchema).mutation(async ({ ctx, input }) => {
    const apartmentExists = await ctx.prisma.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (!apartmentExists) {
      throw new Error("Căn hộ này không tồn tại");
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
      throw new Error("Căn hộ này không tồn tại");
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
  getTotalUnpaidFees: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const unpaidFees = await ctx.prisma.fee.findMany({
      where: {
        isPaid: false,
        dueDate: {
          lt: now,
        },
      },
      select: {
        totalAmount: true,
      },
    });

    return unpaidFees.reduce((total, fee) => total + fee.totalAmount, 0);
  }),
  getUnpaidFees: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const unpaidFees = await ctx.prisma.fee.findMany({
      where: {
        isPaid: false,
        dueDate: {
          lt: now,
        },
      },
      select: {
        id: true,
        apartmentNo: true,
        totalAmount: true,
        dueDate: true,
      },
    });

    const apartmentsWithUnpaidFees = unpaidFees.reduce((acc, fee) => {
      if (!acc[fee.apartmentNo]) {
        acc[fee.apartmentNo] = [];
      }
      acc[fee.apartmentNo]?.push({
        id: fee.id,
        totalAmount: fee.totalAmount,
        dueDate: fee.dueDate,
      });
      return acc;
    }, {} as Record<string, { id: string; totalAmount: number; dueDate: Date }[]>);

    return Object.keys(apartmentsWithUnpaidFees).map(apartmentNo => ({
      apartmentNo: Number(apartmentNo),
      unpaidFees: apartmentsWithUnpaidFees[apartmentNo],
    }));
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
      totalAmount: payment.totalAmount.toLocaleString('vi-VN') + "₫",
      updateAt: format(payment.updateAt, "dd/MM/yyyy"),
    }));
  }),
});