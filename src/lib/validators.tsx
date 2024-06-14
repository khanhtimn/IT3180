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

export const apartmentFormSchema = z.object({
  apartmentNo: z.number(),
  size: z.number(),
});

export const updateApartmentFormSchema = apartmentFormSchema.extend({
  id: z.number(),
});

export const feeFormSchema = z.object({
  apartmentNo: z.number(),
  internetFee: z.number().nonnegative(),
  electricityFee: z.number().nonnegative(),
  waterFee: z.number().nonnegative(),
  contributionFee: z.number().nonnegative().optional(),
  vehicleFee: z.number().nonnegative().optional(),
  notes: z.string().optional(),
  totalAmount: z.number().nonnegative(),
  dueDate: z.date(),
  isPaid: z.boolean(),
});

export type feeFormValues = z.infer<typeof feeFormSchema>;

export const updateFeeFormSchema = feeFormSchema.extend({
  id: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type ILogin = z.infer<typeof loginSchema>;
