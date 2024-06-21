import {z} from "@/lib/utils";

export const residentFormSchema = z.object({
  name: z.string().min(3, {message: 'Hãy điền đúng Họ & Tên'}),
  nationalId: z.string().min(9, {message: 'Định dạng CCCD / CMND yêu cầu từ 9-12 số'}),
  phoneNumber: z.string().min(10, {message: 'Số điện thoại phải có 10 chữ số'}),
  gender: z.string().min(1, {message: 'Hãy chọn giới tính'}),
  vehicle: z.string().min(1, {message: 'Hãy chọn thông tin phương tiện'}),
  address: z.object({
    apartmentNo: z.number().int().positive(),
    permanentAddress: z.string().min(1, {message: 'Hãy điền địa chỉ thường trú'}),
    currentAddress: z.string().min(1, {message: 'Hãy điền địa chỉ hiện tại'}),
    isStaying: z.boolean(),
    startDate: z.coerce.date().optional(),
    endDate: z.date().optional(),
  }),
  addressId: z.string().optional(),
});

export type ResidentFormValues = z.infer<typeof residentFormSchema>;

export const updateResidentFormSchema = residentFormSchema.extend({
  id: z.string(),
  isStayingChangedToTrue: z.boolean().optional(),
});

export type UpdateResidentFormValues = z.infer<typeof updateResidentFormSchema>;


export const residentColumn = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  nationalId: z.string(),
  phoneNumber: z.string(),
  vehicle: z.string(),
  address: z.object({
    apartmentNo: z.number().int().positive(),
    permanentAddress: z.string().min(1),
    currentAddress: z.string().min(1),
    isStaying: z.string(),
    startDate: z.coerce.date().optional(),
    endDate: z.date().optional(),
  }),
  addressId: z.string().optional(),
});

export type ResidentColumn = z.infer<typeof residentColumn>;



export const addressSchema = z.object({
  id: z.string().optional(),
  apartmentNo: z.number().int().positive(),
  permanentAddress: z.string().min(1),
  currentAddress: z.string().min(1),
  isStaying: z.boolean(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
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
    .email({message: 'Vui lòng nhập đúng định dạng Email'}),
  password: z
    .string()
    .min(4, {message: 'Mật khẩu cần có tối thiểu 4 ký tự'})
    .max(32, {message: 'Mật khẩu tối đa là 32 ký tự'}),
});

export type ILogin = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(4, { message: 'Mật khẩu hiện tại cần có tối thiểu 4 ký tự' })
    .max(32, { message: 'Mật khẩu hiện tại tối đa là 32 ký tự' }),
  newPassword: z
    .string()
    .min(4, { message: 'Mật khẩu mới cần có tối thiểu 4 ký tự' })
    .max(32, { message: 'Mật khẩu mới tối đa là 32 ký tự' }),
  confirmPassword: z
    .string()
    .min(4, { message: 'Xác nhận mật khẩu cần có tối thiểu 4 ký tự' })
    .max(32, { message: 'Xác nhận mật khẩu tối đa là 32 ký tự' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
  path: ["confirmPassword"],
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;