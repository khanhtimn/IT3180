import { api } from "@/utils/api";
import {feeFormSchema, type FeeFormValues} from "@/lib/validators";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const PaymentResult = () => {
  const toastMessageSuccess = "Tạo phí thành công";
  const router = useRouter();
  const searchParams = useSearchParams();
  const apartmentSize = searchParams.get("apartmentSize");
  const internet = searchParams.get("internet");
  const electricity = searchParams.get("electricity");
  const water = searchParams.get("water");
  const contribute = searchParams.get("contribute");
  const notes = searchParams.get("notes");
  const vehicles = searchParams.get("vehicles");
  const apartmentNo = searchParams.get("apartmentNo");
  const dueDate = searchParams.get("dueDate");

  const internetFee = (() => {
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
  })();

  const apartmentSizeFee = (() => {
    return apartmentSize ? parseFloat(apartmentSize) * 15000 : 0;
  })();

  const calculateElectricityCost = (kWh: number): number => {
    const rates = [
      { max: 50, rate: 1806 },
      { max: 100, rate: 1866 },
      { max: 200, rate: 2167 },
      { max: 300, rate: 2729 },
      { max: 400, rate: 3050 },
      { max: Infinity, rate: 3151 },
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
      { max: 10, rate: 5973 },
      { max: 20, rate: 7052 },
      { max: 30, rate: 8669 },
      { max: Infinity, rate: 15929 },
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

  const vehicleFee = (() => {
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
  })();

  const totalAmount = (() => {
    let amount = 0;

    if (apartmentSizeFee) {
      amount += apartmentSizeFee;
    }
    if (internetFee) {
      amount += internetFee;
    }
    if (electricity) {
      amount += calculateElectricityCost(parseFloat(electricity));
    }
    if (water) {
      amount += calculateWaterCost(parseFloat(water));
    }
    if (contribute) {
      amount += parseFloat(contribute);
    }
    if (vehicleFee) {
      amount += vehicleFee;
    }

    return amount;
  })();


  const form = useForm<FeeFormValues>({
    resolver: zodResolver(feeFormSchema),
    defaultValues: {
      apartmentNo: apartmentNo ? parseInt(apartmentNo) : 0,
      apartmentSizeFee: apartmentSizeFee,
      internetFee: internetFee,
      electricityFee: electricity ? parseFloat(electricity) : 0,
      waterFee: water ? parseFloat(water) : 0,
      contributionFee: contribute ? parseFloat(contribute) : 0,
      vehicleFee: vehicleFee,
      notes: notes || "",
      totalAmount: totalAmount,
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      isPaid: false,
    },
  });

  const { mutate: createFee } = api.fee.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(toastMessageSuccess);
      router.push("/example/example-02");
    },
  });



  const onSubmit = (values: FeeFormValues) => {
    createFee({
      ...values,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="Kết quả thanh toán" description="Xem và lưu kết quả thanh toán" />
        <h2 className="font-bold text-2xl tracking-tight">Phòng số {apartmentNo}</h2>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className="w-full space-y-8"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="apartmentSizeFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phí diện tích nhà</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phí diện tích nhà" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="internetFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gói cước internet</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Gói cước internet" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricityFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện tiêu thụ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Số điện tiêu thụ" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng nước tiêu thụ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Số lượng nước tiêu thụ" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contributionFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khoản đóng góp</FormLabel>
                  <FormControl>
                    <Input {...field} value={contribute ? parseFloat(contribute) : 0} placeholder="Khoản đóng góp" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phí gửi xe</FormLabel>
                  <FormControl>
                    <Input {...field} value={vehicleFee} placeholder="Phí gửi xe" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Input {...field} value={notes ? notes : ""} placeholder="Ghi chú" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tổng số tiền</FormLabel>
                  <FormControl>
                    <Input {...field} value={totalAmount} placeholder="Tổng số tiền" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày hết hạn</FormLabel>
                  <FormControl>
                    <Input {...field} value={dueDate ? new Date(dueDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]} type="date" disabled/>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-4">
            <Button
              disabled={form.formState.isSubmitting}
              className="ml-auto"
              type="button"
              onClick={() => router.back()}
            >
              Quay lại
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              className="ml-auto"
              type="submit"
            >
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentResult;
