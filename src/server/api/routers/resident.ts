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
            firstName: item.firstName,
            lastName: item.lastName,
            nationalId: item.nationalId,
            gender: item.gender,
            address: item.address,
            createAt: format(item.createAt, "MMMM do, yyyy"),
            updateAt: format(item.updateAt, "MMMM do, yyyy"),
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
            return ctx.prisma.resident.create({data: {...input}});
        }),

    update: publicProcedure
        .input(updateResidentFormSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.resident.update({
                where: {id: input.id},
                data: {...input},
            });
        }),

    delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        return ctx.prisma.resident.delete({
            where: {id: input},
        });
    }),
});
