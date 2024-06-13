import { z } from "zod";

export const residentFormSchema = z.object({
  name: z.string().min(1),
  gender: z.string().min(1),
  nationalId: z.number().int().nonnegative().min(1),
  apartmentNo: z.number().int().nonnegative().min(1),
  vehicle: z.string().min(1),
});

export type ResidentFromValues = z.infer<typeof residentFormSchema>;

export const residentColumn = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  nationalId: z.number().int().nonnegative(),
  apartmentNo: z.number().int().nonnegative(),
  vehicle: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type ResidentColumn = z.infer<typeof residentColumn>;

export const updateResidentFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  nationalId: z.number().int().nonnegative(),
  apartmentNo: z.number().int().nonnegative(),
  vehicle: z.string(),
});

export const feeFormSchema = z.object({
  type: z.string().min(1),
  amount: z.number().nonnegative(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  isPaid: z.boolean(),
  apartmentNo: z.number().int().nonnegative().optional(),
  residentId: z.string().optional(),
});

export type FeeFormValues = z.infer<typeof feeFormSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type ILogin = z.infer<typeof loginSchema>;
