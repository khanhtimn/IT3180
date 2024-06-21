import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type ResidentFormValues, residentFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertModal } from "@/components/common/alert-modal";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type Resident } from "@prisma/client";

interface ResidentFormProps {
  initialData: Resident & {
    address: {
      id: string;
      apartment: { apartmentNo: number };
      permanentAddress: string;
      currentAddress: string;
      isStaying: boolean;
      dateRanges?: { startDate: Date; endDate: Date }[];
    };
  } | null | undefined;
}

export const ResidentForm = ({ initialData }: ResidentFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStaying, setIsStaying] = useState(initialData?.address?.isStaying ?? true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: initialData?.address?.dateRanges?.[0]?.startDate,
    to: initialData?.address?.dateRanges?.[0]?.endDate,
  });

  const title = initialData ? "Cập nhật thông tin" : "Cư dân mới";
  const description = initialData ? "Cập nhật thông tin" : "Tạo cư dân mới";
  const toastMessage = initialData ? "Cập nhật thành công" : "Tạo mới thành công";
  const action = initialData ? "Lưu" : "Tạo mới";

  const form = useForm<ResidentFormValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues: initialData ? {
      addressId: initialData.address.id,
      name: initialData.name,
      nationalId: initialData.nationalId,
      phoneNumber: initialData.phoneNumber,
      gender: initialData.gender,
      vehicle: initialData.vehicle,
      address: {
        apartmentNo: initialData.address.apartment.apartmentNo,
        permanentAddress: initialData.address.permanentAddress,
        currentAddress: initialData.address.currentAddress,
        isStaying: initialData.address.isStaying,
        startDate: initialData.address.dateRanges?.[0]?.startDate ?? undefined,
        endDate: initialData.address.dateRanges?.[0]?.endDate ?? undefined,
      },
    } : {
      name: "",
      addressId: "",
      nationalId: "",
      phoneNumber: "",
      gender: "",
      vehicle: "",
      address: {
        apartmentNo: undefined,
        permanentAddress: "",
        currentAddress: "",
        isStaying: true,
        startDate: undefined,
        endDate: undefined,
      },
    },
  });

  const { mutate: createResident } = api.resident.create.useMutation({
    onError: (err) => {
      console.error("Create Resident Error:", err);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      console.log("Create Resident Success:", data);
      toast.success(toastMessage);
      router.push(`/manage/residents`);
    },
  });

  const { mutate: updateResident } = api.resident.update.useMutation({
    onError: (err) => {
      console.error("Update Resident Error:", err);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      console.log("Update Resident Success:", data);
      toast.success(toastMessage);
      router.push(`/manage/residents`);
    },
  });

  const { mutate: deleteResident, isLoading: deleteResidentIsLoading } =
    api.resident.delete.useMutation({
      onError: (err) => {
        console.error("Delete Resident Error:", err);
        toast.error(err.message);
      },
      onSuccess: (data) => {
        console.log("Delete Resident Success:", data);
        toast.success(toastMessage);
        router.push(`/manage/residents`);
      },
    });

  const onSubmit = (values: ResidentFormValues) => {
    setLoading(true);

    const { address, ...residentData } = values;
    const addressData = {
      ...address,
      startDate: !isStaying ? dateRange?.from : undefined,
      endDate: !isStaying ? dateRange?.to : undefined,
    };

    if (initialData) {
      const isStayingChangedToTrue = !initialData.address.isStaying && address.isStaying;
      if (values.addressId) {
        updateResident({
          ...residentData,
          address: addressData,
          addressId: values.addressId,
          id: initialData.id,
          isStayingChangedToTrue,
        });
      }
    } else {
      createResident({
        ...residentData,
        address: addressData,
      });
    }

    setLoading(false);
  };

  const onDelete = () => {
    deleteResident(initialData?.id as string);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={(e) => {
            console.log("Form Submitted"); // Debug statement to check if form is submitted
            void form.handleSubmit(onSubmit)(e);
          }}
          className="w-full space-y-8"
        >
          <div className="grid-cols-3 gap-8 md:grid">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                console.log("Name field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Họ & Tên</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Họ & Tên"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => {
                console.log("Gender field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Giới tính"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => {
                console.log("Phone Number field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Số điện thoại"
                        inputMode="numeric"
                        value={field.value}
                        pattern="[0-9]*"
                        maxLength={10}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => {
                console.log("National ID field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>CCCD / CMND</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="CCCD / CMND"
                        inputMode="numeric"
                        value={field.value}
                        pattern="[0-9]*"
                        maxLength={12}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.apartmentNo"
              render={({ field }) => {
                console.log("Apartment No field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Số căn hộ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Số căn hộ"
                        inputMode="numeric"
                        value={field.value || ""}
                        pattern="[0-9]*"
                        maxLength={3}
                        onChange={(e) =>
                          e.target.validity.valid && field.onChange(+e.target.value)
                        }
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.permanentAddress"
              render={({ field }) => {
                console.log("Permanent Address field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Địa chỉ thường trú</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Địa chỉ thường trú"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.currentAddress"
              render={({ field }) => {
                console.log("Current Address field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Địa chỉ hiện tại</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Địa chỉ hiện tại"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => {
                console.log("Vehicle field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Phương tiện</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Phương tiện"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Không">Không</SelectItem>
                        <SelectItem value="Xe đạp">Xe đạp</SelectItem>
                        <SelectItem value="Xe môtô / Xe gắn máy">Xe môtô / Xe gắn máy</SelectItem>
                        <SelectItem value="Xe ôtô">Xe ôtô</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="address.isStaying"
              render={({ field }) => {
                console.log("Is Staying field registered:", field);
                return (
                  <FormItem>
                    <FormLabel>Tình trạng cư trú</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        const booleanValue = value === "true";
                        field.onChange(booleanValue);
                        setIsStaying(booleanValue);
                      }}
                      value={field.value ? "true" : "false"}
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value ? "true" : "false"}
                            placeholder="Tình trạng cư trú"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Không tạm vắng</SelectItem>
                        <SelectItem value="false">Đang tạm vắng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {!isStaying && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  console.log("Date Range field registered:", field);
                  return (
                    <FormItem>
                      <FormLabel>Chọn khoảng thời gian</FormLabel>
                      <FormControl>
                        <div className={cn("grid gap-2")}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                  "w-[260px] justify-start text-left font-normal",
                                  !dateRange && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                  dateRange.to ? (
                                    <>
                                      {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                                      {format(dateRange.to, "dd/MM/yyyy")}
                                    </>
                                  ) : (
                                    format(dateRange.from, "dd/MM/yyyy")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={(range) => {
                                  setDateRange(range);
                                  form.setValue("address.startDate", range?.from ?? undefined);
                                  form.setValue("address.endDate", range?.to ?? undefined);
                                }}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          <div className="space-x-4">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
            <Button
              disabled={loading}
              className="ml-auto"
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Thoát
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        title="Xóa thông tin?"
        description="Không thể khôi phục."
        name={initialData?.name}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteResidentIsLoading}
      />
    </>
  );
};
