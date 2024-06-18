import {z} from "@/lib/utils";

export const residentFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Hãy điền đúng Họ & Tên' }),
  gender: z
    .string()
    .min(1),
  nationalId: z
    .string()
    .min(9, { message: 'Định dạng CCCD / CMND yêu cầu từ 9-12 só' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Số điện thoại phải có 10 chữ số' }),
  apartmentNo: z
    .number()
    .int()
    .nonnegative()
    .min(3, { message: 'Hãy nhập đúng số căn hộ có 3 chữ số' }),
  vehicle: z
    .string()
    .min(1),
});

export type ResidentFromValues = z.infer<typeof residentFormSchema>;

export const residentColumn = z.object({
  id: z
    .string(),
  name: z
    .string(),
  gender: z
    .string(),
  nationalId: z
    .string(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Số điện thoại phải có 10 chữ số' }),
  apartmentNo: z
    .number()
    .int()
    .nonnegative()
    .min(3, { message: 'Hãy nhập đúng số căn hộ có 3 chữ số' }),
  vehicle: z
    .string(),
  createAt: z
    .string(),
  updateAt: z
    .string(),
});

export type ResidentColumn = z.infer<typeof residentColumn>;

export const updateResidentFormSchema = z.object({
  id: z
    .string(),
  name: z
    .string()
    .min(3, { message: 'Hãy điền đúng Họ & Tên' }),
  gender: z
    .string(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Số điện thoại phải có 10 chữ số' }),
  nationalId: z
    .string()
    .min(9, { message: 'Định dạng CCCD / CMND yêu cầu từ 9-12 só' }),
  apartmentNo: z
    .number()
    .int()
    .nonnegative()
    .min(3, { message: 'Hãy nhập đúng số căn hộ có 3 chữ số' }),
  vehicle: z
    .string(),
});

export const apartmentFormSchema = z.object({
  apartmentNo: z
    .number(),
  size: z
    .number(),
});

export const updateApartmentFormSchema = apartmentFormSchema.extend({
  id: z
    .number(),
});

export const feeFormSchema = z.object({
  apartmentNo: z
    .number(),
  apartmentSizeFee: z
    .number()
    .nonnegative(),
  internetFee: z
    .number()
    .nonnegative(),
  electricityFee: z
    .number()
    .nonnegative(),
  waterFee: z
    .number()
    .nonnegative(),
  contributionFee: z
    .number()
    .nonnegative()
    .nullable(),
  vehicleFee: z
    .number()
    .nonnegative(),
  notes: z
    .string()
    .nullable(),
  totalAmount: z
    .number()
    .nonnegative(),
  dueDate: z
    .coerce
    .date(),
  isPaid: z
    .boolean(),
  updateAt: z
    .coerce
    .date(),
});

export type FeeFormValues = z.infer<typeof feeFormSchema>;

export const updateFeeFormSchema = feeFormSchema.extend({
  id: z
    .string(),
});

export const feeColumn = z.object({
  id: z
    .string(),
  apartmentNo: z
    .number(),
  apartmentSizeFee: z
    .string(),
  internetFee: z
    .string(),
  electricityFee: z
    .string(),
  waterFee: z
    .string(),
  contributionFee: z
    .string()
    .nullable(),
  vehicleFee: z
    .string(),
  notes: z
    .string()
    .nullable(),
  totalAmount: z
    .string(),
  dueDate: z
    .string(),
  isPaid: z
    .string(),
  updateAt: z
    .string(),
});

export type FeeColumn = z.infer<typeof feeColumn>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Vui lòng nhập đúng định dạng Email' }),
  password: z
    .string()
    .min(4, { message: 'Mật khẩu cần có tối thiểu 4 ký tự' })
    .max(32, { message: 'Mật khẩu tối đa là 32 ký tự' } ),
});

export type ILogin = z.infer<typeof loginSchema>;
