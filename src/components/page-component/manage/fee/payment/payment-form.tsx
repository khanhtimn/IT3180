import React, {useState, useEffect} from "react";
import {type Fee} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {Heading} from "@/components/common/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DatePicker} from "@/components/ui/date-picker";
import {AlertModal} from "@/components/common/alert-modal";
import {api} from "@/utils/api";
import {feeFormSchema, type FeeFormValues} from "@/lib/validators";
import {Trash} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PaymentFormProps {
  initialData: Fee | null | undefined;
}

const PaymentForm = ({initialData}: PaymentFormProps) => {
  const title = initialData ? "Cập nhật thu phí" : "Tạo khoản thu mới";
  const description = initialData ? "Cập nhật thông tin cước phí" : "Tạo khoản thu mới cho căn hộ";
  const toastMessage = initialData ? "Cập nhật thành công" : "Tạo mới thành công";
  const action = initialData ? "Lưu" : "Tạo mới";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const apartmentSize = searchParams.get("apartmentSize");
  const internet = searchParams.get("internet");
  const electricity = searchParams.get("electricity");
  const water = searchParams.get("water");
  const contribute = searchParams.get("contribute");
  const notes = searchParams.get("notes");
  const vehicles = searchParams.get("vehicles");

  const apartmentNo = searchParams.get("apartmentNo") ? searchParams.get("apartmentNo") : initialData?.apartmentNo.toString();
  const dueDate = searchParams.get("dueDate");

  const [selectedDueDate, setSelectedDueDate] = useState<string | undefined>(
    initialData?.dueDate?.toISOString().split("T")[0] ??
    (dueDate ? new Date(dueDate).toISOString().split("T")[0] :
      new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0])
  );

  const calculateElectricityCost = (kWh: number): number => {
    const rates = [
      {max: 50, rate: 1806},
      {max: 100, rate: 1866},
      {max: 200, rate: 2167},
      {max: 300, rate: 2729},
      {max: 400, rate: 3050},
      {max: Infinity, rate: 3151},
    ];

    let cost = 0;
    let remainingKWh = kWh;

    for (const tier of rates) {
      if (remainingKWh <= 0) break;
      const kWhInThisTier = Math.min(remainingKWh, tier.max - (tier.max === Infinity ? 0 : tier.max - 50));
      cost += kWhInThisTier * tier.rate;
      remainingKWh -= kWhInThisTier;
    }

    return cost;
  };

  const calculateWaterCost = (cubicMeters: number): number => {
    const rates = [
      {max: 10, rate: 5973},
      {max: 20, rate: 7052},
      {max: 30, rate: 8669},
      {max: Infinity, rate: 15929},
    ];

    let cost = 0;
    let remainingCubicMeters = cubicMeters;

    for (const tier of rates) {
      if (remainingCubicMeters <= 0) break;
      const cubicMetersInThisTier = Math.min(remainingCubicMeters, tier.max - (tier.max === Infinity ? 0 : tier.max - 10));
      cost += cubicMetersInThisTier * tier.rate;
      remainingCubicMeters -= cubicMetersInThisTier;
    }

    return cost;
  };

  const calculateVehicleFee = (vehicles: string | null): number => {
    const vehicleArray = vehicles?.split(",") || [];
    let cost = 0;
    vehicleArray.forEach((vehicle) => {
      switch (vehicle) {
        case "Xe đạp":
          cost += 30000;
          break;
        case "Xe môtô / Xe gắn máy":
          cost += 70000;
          break;
        case "Xe ôtô":
          cost += 1200000;
          break;
        default:
          break;
      }
    });
    return cost;
  };

  const calculateInternetFee = (internet: string | null): number => {
    switch (internet) {
      case "Không sử dụng":
        return 0;
      case "Internet1":
        return 330000;
      case "Internet2":
        return 875600;
      case "Internet3":
        return 1075600;
      default:
        return 0;
    }
  };

  const form = useForm<FeeFormValues>({
    resolver: zodResolver(feeFormSchema),
    defaultValues: initialData || {
      apartmentNo: apartmentNo ? parseInt(apartmentNo) : 0,
      apartmentSizeFee: apartmentSize ? parseFloat(apartmentSize) * 15000 : 0,
      internetFee: calculateInternetFee(internet),
      electricityFee: electricity ? calculateElectricityCost(parseFloat(electricity)) : 0,
      waterFee: water ? calculateWaterCost(parseFloat(water)) : 0,
      contributionFee: contribute ? parseFloat(contribute) : 0,
      vehicleFee: calculateVehicleFee(vehicles),
      notes: notes || "",
      totalAmount: 0,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      isPaid: false,
      updateAt: new Date(),
    },
  });

  const watchedFields = useWatch({control: form.control});
  const {apartmentSizeFee, internetFee, electricityFee, waterFee, contributionFee, vehicleFee} = watchedFields;

  useEffect(() => {
    const totalAmount =
      (apartmentSizeFee || 0) +
      (internetFee || 0) +
      (electricityFee || 0) +
      (waterFee || 0) +
      (contributionFee || 0) +
      (vehicleFee || 0);
    form.setValue("totalAmount", totalAmount);
  }, [apartmentSizeFee, internetFee, electricityFee, waterFee, contributionFee, vehicleFee, form]);

  const {mutate: createFee} = api.fee.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push("/manage/fee");
    },
  });

  const {mutate: updateFee} = api.fee.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push("/manage/fee");
    },
  });

  const {mutate: deleteFee, isLoading: deleteFeeIsLoading} = api.fee.delete.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push(`/manage/fee`);
    },
  });

  const onSubmit = (values: FeeFormValues) => {
    setLoading(true);
    if (initialData) {
      updateFee({
        ...values,
        id: initialData.id,
        updateAt: new Date(),
      });
    } else {
      createFee({
        ...values,
      });
    }
    setLoading(false);
  };

  const onDelete = () => {
    deleteFee(initialData?.id as string);
  };

  const isEditMode = Boolean(initialData);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}/>
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-2xl tracking-tight">Căn hộ số {apartmentNo}</h2>
          {isEditMode && (
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4"/>
            </Button>
          )}
        </div>
      </div>
      <Separator/>

      <Form {...form}>
        <form onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
              className="w-full space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="apartmentSizeFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phí dịch vụ chung cư:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phí dịch vụ chung cư" disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="internetFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phí gói cước Internet:</FormLabel>
                  <FormControl>
                    <Input {...field}
                           inputMode="numeric" // display number keyboard on mobile
                           value={field.value}
                           pattern="[0-9]*" // parse to number type for zod validation
                           onChange={(e) =>
                             e.target.validity.valid && field.onChange(+e.target.value) // change input field
                           }
                           placeholder="Phí gói cước internet"
                           disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricityFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phí điện:</FormLabel>
                  <FormControl>
                    <Input {...field}
                           inputMode="numeric" // display number keyboard on mobile
                           value={field.value}
                           pattern="[0-9]*" // parse to number type for zod validation
                           onChange={(e) =>
                             e.target.validity.valid && field.onChange(+e.target.value) // change input field
                           }
                           placeholder="Phí điện tiêu thụ"
                           disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phí nước:</FormLabel>
                  <FormControl>
                    <Input {...field}
                           inputMode="numeric" // display number keyboard on mobile
                           value={field.value}
                           pattern="[0-9]*" // parse to number type for zod validation
                           onChange={(e) =>
                             e.target.validity.valid && field.onChange(+e.target.value) // change input field
                           }
                           placeholder="Phí nước tiêu thụ"
                           disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phí gửi xe:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phí gửi xe" disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contributionFee"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Khoản đóng góp:</FormLabel>
                  <FormControl>
                    <Input {...field}
                           inputMode="numeric" // display number keyboard on mobile
                           value={field.value ? field.value : 0}
                           pattern="[0-9]*" // parse to number type for zod validation
                           onChange={(e) =>
                             e.target.validity.valid && field.onChange(+e.target.value) // change input field
                           }
                           placeholder="Khoản đóng góp"
                           disabled={!isEditMode}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Ghi chú:</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ? field.value : ""} placeholder="Ghi chú"
                           disabled={!isEditMode}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({field}) => (
                <FormItem>
                  <FormLabel className={"text-red-500 font-bold"}>Tổng số tiền:</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} placeholder="Tổng số tiền" disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={() => (
                <FormItem>
                  <FormLabel>Hạn thanh toán:</FormLabel>
                  <FormControl>
                    <DatePicker date={selectedDueDate} setDate={setSelectedDueDate} disabled={!isEditMode}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPaid"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Trạng thái thanh toán</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value ? "true" : "false"}
                          placeholder="Trạng thái thanh toán"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Đã thanh toán</SelectItem>
                      <SelectItem value="false">Chưa thanh toán</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-4">
            <Button
              disabled={loading}
              className="ml-auto"
              type="button"
              onClick={() => router.back()}
            >
              Thoát
            </Button>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        title="Xóa khoản phí này?"
        description="Không thể khôi phục."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteFeeIsLoading}
      />
    </div>
  );
};

export default PaymentForm;
