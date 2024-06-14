import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {feeFormSchema, updateFeeFormSchema} from "@/lib/validators";
import { format } from "date-fns";

export const feeRouter = createTRPCRouter({
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   return ctx.prisma.fee.findMany({
  //     orderBy: {
  //       createAt: "desc",
  //     },
  //   });
  // }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const fee = await ctx.prisma.fee.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return fee.map((item) => ({
      id: item.id,
      apartmentNo: item.apartmentNo,
      apartmentSizeFee: item.apartmentSizeFee,
      internetFee: item.internetFee,
      electricityFee: item.electricityFee,
      waterFee: item.waterFee,
      contributionFee: item.contributionFee,
      vehicleFee: item.vehicleFee,
      notes: item.notes,
      totalAmount: item.totalAmount,
      dueDate: format(item.dueDate, "dd/MM/yyyy"),
      isPaid: item.isPaid,
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
});