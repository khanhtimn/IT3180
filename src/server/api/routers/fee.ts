import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {feeFormSchema, updateFeeFormSchema} from "@/lib/validators";

export const feeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.fee.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.fee.findUnique({
      where: { id: input },
    });
  }),

  create: publicProcedure.input(feeFormSchema).mutation(async ({ ctx, input }) => {
    // Ensure the apartmentNo exists in the Apartment table
    const apartmentExists = await ctx.prisma.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (!apartmentExists) {
      throw new Error("Apartment number does not exist");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ctx.prisma.fee.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { ...input },
    });
  }),

  update: publicProcedure.input(updateFeeFormSchema).mutation(async ({ ctx, input }) => {
    // Ensure the apartmentNo exists in the Apartment table
    const apartmentExists = await ctx.prisma.apartment.findUnique({
      where: { apartmentNo: input.apartmentNo },
    });

    if (!apartmentExists) {
      throw new Error("Apartment number does not exist");
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