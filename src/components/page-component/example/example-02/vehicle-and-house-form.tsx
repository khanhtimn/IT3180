"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/api"; // Đảm bảo import đúng module
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type VehicleType = Record<"value" | "label", string>;

export function VehicleAndHouseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const apartmentNo = Number(searchParams.get("apartmentNo"));

  const { data: vehicles = [], isLoading, isError, error } = api.resident.getVehiclesByApartment.useQuery({ apartmentNo });

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      houseArea: "",
      internet: "Internet0",
      electricity: "",
      water: "",
      contribute: "50.000",
      notes: "",
      selectedVehicles: [],
    },
  });

  React.useEffect(() => {
    if (vehicles.length > 0) {
      const formattedVehicles: VehicleType[] = vehicles
        .filter((vehicle) => vehicle !== "Không")
        .map((vehicle) => ({
          value: vehicle,
          label: vehicle,
        }));
      setValue("selectedVehicles", formattedVehicles);
    }
  }, [vehicles, setValue]);

  const onSubmit = (data) => {
    const { houseArea, internet, electricity, water, contribute, notes, selectedVehicles } = data;
    router.push({
      pathname: "/example/example-02/payment-form",
      query: {
        houseArea,
        internet,
        electricity,
        water,
        contribute,
        notes,
        vehicles: selectedVehicles.map((v) => v.value).join(","),
        apartmentNo,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Lỗi!. Vui lòng thử lại.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl tracking-tight">Phòng số {apartmentNo}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="houseArea" className="block text-sm font-medium text-black-700">
            Diện tích nhà (mét vuông):
          </label>
          <Controller
            name="houseArea"
            control={control}
            rules={{ required: "Vui lòng nhập diện tích nhà" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ví dụ: 120"
                className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${errors.houseArea ? "border-red-500" : "border-input"}`}
              />
            )}
          />
          {errors.houseArea && <p className="text-red-500">{errors.houseArea.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="internet" className="block text-sm font-medium text-black-700">
            Internet:
          </label>
          <Controller
            name="internet"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn gói cước internet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internet0">Không có</SelectItem>
                  <SelectItem value="Internet1">Internet1</SelectItem>
                  <SelectItem value="Internet2">Internet2</SelectItem>
                  <SelectItem value="Internet3">Internet3</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="electricity" className="block text-sm font-medium text-black-700">
            Số điện(kWh):
          </label>
          <Controller
            name="electricity"
            control={control}
            rules={{ required: "Vui lòng nhập số điện" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập số điện tiêu thụ..."
                className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${errors.electricity ? "border-red-500" : "border-input"}`}
              />
            )}
          />
          {errors.electricity && <p className="text-red-500">{errors.electricity.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="water" className="block text-sm font-medium text-black-700">
            Nước (khối):
          </label>
          <Controller
            name="water"
            control={control}
            rules={{ required: "Vui lòng nhập số nước" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập số lượng nước tiêu thụ..."
                className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${errors.water ? "border-red-500" : "border-input"}`}
              />
            )}
          />
          {errors.water && <p className="text-red-500">{errors.water.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="contribute" className="block text-sm font-medium text-black-700">
            Khoản đóng góp:
          </label>
          <Controller
            name="contribute"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readOnly
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground cursor-not-allowed"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-black-700">
            Ghi chú:
          </label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Ghi chú..."
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            )}
          />
        </div>

        <div className="space-x-4">
          <Button className="space-y-2" size="sm" type="button" onClick={handleBack}>
            Quay lại
          </Button>
          <Button className="space-y-2" size="sm" type="submit">
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  );
}
