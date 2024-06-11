import {z} from "zod";
import {format} from "date-fns";
import {type ResidentColumn, residentFormSchema, updateResidentFormSchema,} from "@/lib/validators";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

export const residentRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const resident = await ctx.prisma.resident.findMany({
            orderBy: {
                createAt: "desc",
            },
        });

        const formattedResident: ResidentColumn[] = resident.map((item) => ({
            id: item.id,
            name: item.name,
            nationalId: item.nationalId,
            gender: item.gender,
            apartmentNo: item.apartmentNo,
            vehicle: item.vehicle,
            createAt: format(item.createAt, "dd/MM/yyyy"),
            updateAt: format(item.updateAt, "dd/MM/yyyy"),
        }));
        return formattedResident;
    }),

    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        return ctx.prisma.resident.findUnique({
            where: {id: input},
        });
    }),

    create: publicProcedure
      .input(residentFormSchema)
      .mutation(async ({ ctx, input }) => {
          // Ensure the apartmentNo exists in the Apartment table
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

    // create: publicProcedure
    //     .input(residentFormSchema)
    //     .mutation(async ({ ctx, input }) => {
    //         return ctx.prisma.resident.create({data: {...input}});
    //     }),


    // update: publicProcedure
    //     .input(updateResidentFormSchema)
    //     .mutation(async ({ ctx, input }) => {
    //         return ctx.prisma.resident.update({
    //             where: {id: input.id},
    //             data: {...input},
    //         });
    //     }),

    update: publicProcedure
        .input(updateResidentFormSchema)
        .mutation(async ({ ctx, input }) => {
            // Ensure the apartmentNo exists in the Apartment table
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
            where: {id: input},
        });
    }),
});
