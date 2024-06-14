import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  residentFormSchema,
  updateResidentFormSchema,
} from "@/lib/validators";
import { format } from "date-fns";


export const residentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const resident = await ctx.prisma.resident.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return resident.map((item) => ({
      id: item.id,
      name: item.name,
      nationalId: item.nationalId,
      gender: item.gender,
      apartmentNo: item.apartmentNo,
      vehicle: item.vehicle,
      createAt: format(item.createAt, "dd/MM/yyyy"),
      updateAt: format(item.updateAt, "dd/MM/yyyy"),
    }));
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.resident.findUnique({
      where: { id: input },
    });
  }),

  create: publicProcedure
    .input(residentFormSchema)
    .mutation(async ({ ctx, input }) => {
      const apartmentExists = await ctx.prisma.apartment.findUnique({
        where: { apartmentNo: input.apartmentNo },
      });

      if (!apartmentExists) {
        throw new Error("Số nhà không tồn tại");
      }

      return ctx.prisma.resident.create({
        data: { ...input },
      });
    }),

  update: publicProcedure
    .input(updateResidentFormSchema)
    .mutation(async ({ ctx, input }) => {
      const apartmentExists = await ctx.prisma.apartment.findUnique({
        where: { apartmentNo: input.apartmentNo },
      });

      if (!apartmentExists) {
        throw new Error("Số nhà không tồn tại");
      }

      return ctx.prisma.resident.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.resident.delete({
      where: { id: input },
    });
  }),


  getCount: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.resident.count();
    return count;
  }),

  getOccupiedApartments: publicProcedure.query(async ({ ctx }) => {
    const apartments = await ctx.prisma.apartment.findMany({
      where: {
        residents: {
          some: {},
        },
      },
      include: {
        residents: true,
      },
    });

    return {
      count: apartments.length,
      apartmentList: apartments.map((apartment) => ({
        apartmentNo: apartment.apartmentNo,
        residents: apartment.residents.map((resident) => ({
          id: resident.id,
          name: resident.name,
        })),
      })),
    };
  }),
    
  getAllFees: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.fee.findMany();
  }),
});

export default residentRouter;
