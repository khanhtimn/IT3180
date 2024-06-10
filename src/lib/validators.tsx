import { z } from "zod";

// Example
export const residentFormSchema = z.object({
  name: z.string().min(1),
  nationalId: z.number().min(1),
  address: z.string().min(1),
  gender: z.string().min(1),
});

export type ResidentFromValues = z.infer<typeof residentFormSchema>;

export const residentColumn = z.object({
  id: z.string(),
  name: z.string(),
  nationalId: z.number(),
  address: z.string(),
  gender: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type ResidentColumn = z.infer<typeof residentColumn>;

export const updateResidentFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  nationalId: z.number(),
  address: z.string(),
  gender: z.string(),
});
