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
  apartmentSizeFee: z.number().nonnegative(),
  internetFee: z.number().nonnegative(),
  electricityFee: z.number().nonnegative(),
  waterFee: z.number().nonnegative(),
  contributionFee: z.number().nonnegative().nullable(),
  vehicleFee: z.number().nonnegative(),
  notes: z.string().nullable(),
  totalAmount: z.number().nonnegative(),
  dueDate: z.coerce.date(),
  isPaid: z.boolean(),
});

export type FeeFormValues = z.infer<typeof feeFormSchema>;

export const updateFeeFormSchema = feeFormSchema.extend({
  id: z.string(),
});

export const feeColumn = z.object({
  id: z.string(),
  apartmentNo: z.number(),
  apartmentSizeFee: z.number(),
  internetFee: z.number(),
  electricityFee: z.number(),
  waterFee: z.number(),
  contributionFee: z.number().nullable(),
  vehicleFee: z.number(),
  notes: z.string().nullable(),
  totalAmount: z.number(),
  dueDate: z.string(),
  isPaid: z.boolean(),
});

export type FeeColumn = z.infer<typeof feeColumn>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type ILogin = z.infer<typeof loginSchema>;
