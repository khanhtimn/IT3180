import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {api} from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, {useEffect, useRef, useState} from "react";
import {Heading} from "@/components/common/heading";
import {Separator} from "@/components/ui/separator";
import {DatePicker} from "@/components/ui/date-picker";
import {Loading} from "@/components/common/loading";

type VehicleType = Record<"value" | "label", string>;



export function PaymentCreateForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<VehicleType[]>([]);
  const [apartmentSize, setApartmentSize] = useState("");
  const [internet, setInternet] = useState("Không sử dụng");
  const [electricity, setElectricity] = useState("");
  const [water, setWater] = useState("");
  const [contribute, setContribute] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0] || "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const apartmentNo = Number(searchParams.get("apartmentNo"));

  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = api.apartment.getVehiclesByApartment.useQuery({apartmentNo});

  const {
    data: size,
    isLoading: isLoadingSize,
    isError: isErrorSize,
    error: errorSize,
  } = api.apartment.getApartmentSize.useQuery({apartmentNo});

  useEffect(() => {
    if (vehicles.length > 0) {
      const formattedVehicles: VehicleType[] = vehicles
        .filter((vehicle) => vehicle !== "Không") // Lọc phương tiện có nhãn hoặc giá trị là "không"
        .map((vehicle) => ({
          value: vehicle,
          label: vehicle,
        }));
      setSelected(formattedVehicles);
    }
  }, [vehicles]);

  useEffect(() => {
    if (size !== undefined) {
      setApartmentSize(size.toString());
    }
  }, [size]);

  const internetOptions = [
    {value: "Không sử dụng", label: "Không sử dụng"},
    {value: "Internet1", label: "Internet1"},
    {value: "Internet2", label: "Internet2"},
    {value: "Internet3", label: "Internet3"},
  ];

  const onSubmit = () => {
    const query = new URLSearchParams({
      apartmentSize: apartmentSize.toString(),
      internet: internet.toString(),
      electricity: electricity.toString(),
      water: water.toString(),
      contribute: contribute?.toString() || "",
      notes: notes || "",
      vehicles: selected.map((v) => v.value).join(","),
      apartmentNo: apartmentNo.toString(),
      dueDate: dueDate,
    }).toString();

    router.push(`/manage/fee/payment/result?${query}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading || isLoadingSize) {
    return <Loading/>;
  }

  if (isError || isErrorSize) {
    console.error(error || errorSize);
    return <div>Lỗi!. Vui lòng thử lại.</div>;
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Tạo khoản thu mới"
          description="Tạo khoản thu mới cho căn hộ"
        />
        <h2 className="font-bold text-2xl tracking-tight">Căn hộ số {apartmentNo}</h2>
      </div>
      <Separator/>
      <div className="space-y-4">
        <label
          htmlFor="apartmentSize"
          className="text-black-700 block text-sm font-medium"
        >
          Phương tiện căn hộ sở hữu:
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((vehicle) => (
              <Badge key={vehicle.value} variant="secondary">
                {vehicle.label}
              </Badge>
            ))}
            <input
              ref={inputRef}
              value=""
              readOnly
              className="ml-2 flex-1 cursor-not-allowed bg-transparent outline-none placeholder:text-muted-foreground"
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <label
          htmlFor="apartmentSize"
          className="text-black-700 block text-sm font-medium"
        >
          Diện tích nhà (mét vuông):
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="number"
            id="apartmentSize"
            value={apartmentSize}
            readOnly
            className="w-full cursor-not-allowed bg-transparent outline-none placeholder:text-muted-foreground opacity-60"
          />
        </div>
        <label
          htmlFor="internet"
          className="text-black-700 block text-sm font-medium"
        >
          Gói cước Internet:
        </label>
        <div>
          <Select onValueChange={setInternet} value={internet}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn gói cước internet"/>
            </SelectTrigger>
            <SelectContent>
              {internetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <label
          htmlFor="electricity"
          className="text-black-700 block text-sm font-medium"
        >
          Số điện (kWh):
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="number"
            id="electricity"
            inputMode="numeric"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            placeholder="Nhập số điện tiêu thụ..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <label
          htmlFor="water"
          className="text-black-700 block text-sm font-medium"
        >
          Số nước (khối):
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="number"
            inputMode="numeric"
            id="water"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            placeholder="Nhập số lượng nước tiêu thụ..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <label
          htmlFor="contribute"
          className="text-black-700 block text-sm font-medium"
        >
          Khoản đóng góp (vnđ):
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="number"
            id="contribute"
            inputMode="numeric"
            value={contribute}
            onChange={(e) => setContribute(e.target.value)}
            placeholder="Nhập số lượng..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <label
          htmlFor="notes"
          className="text-black-700 block text-sm font-medium"
        >
          Ghi chú:
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ghi chú..."
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <label
          htmlFor="dueDate"
          className="text-black-700 block text-sm font-medium"
        >
          Hạn thanh toán:
        </label>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-ignore*/}
        <DatePicker date={dueDate} setDate={setDueDate}/>
        <div className="space-x-4">
          <Button className="ml-auto" size="sm" onClick={handleBack}>
            Quay lại
          </Button>
          <Button className="ml-auto" size="sm" onClick={onSubmit}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
