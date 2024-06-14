import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";

type VehicleType = Record<"value" | "label", string>;

export function PaymentForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<VehicleType[]>([]);
  const [apartmentSize, setApartmentSize] = useState("");
  const [internet, setInternet] = useState("Không sử dụng");
  const [electricity, setElectricity] = useState("");
  const [water, setWater] = useState("");
  const [contribute, setContribute] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const apartmentNo = Number(searchParams.get("apartmentNo"));

  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = api.apartment.getVehiclesByApartment.useQuery({ apartmentNo });

  const {
    data: size,
    isLoading: isLoadingSize,
    isError: isErrorSize,
    error: errorSize,
  } = api.apartment.getApartmentSize.useQuery({ apartmentNo });

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
    { value: "Không sử dụng", label: "Không sử dụng" },
    { value: "Internet1", label: "Internet1" },
    { value: "Internet2", label: "Internet2" },
    { value: "Internet3", label: "Internet3" },
  ];

  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router.push({
      pathname: "/example/example-02/payment/result",
      query: {
        apartmentSize,
        internet,
        electricity,
        water,
        contribute,
        notes,
        vehicles: selected.map((v) => v.value).join(","),
        apartmentNo,
        dueDate,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading || isLoadingSize) {
    return <div>Đang tải...</div>;
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
        <h2 className="font-bold text-2xl tracking-tight">Phòng số {apartmentNo}</h2>
      </div>
      <Separator />
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
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        <label
          htmlFor="internet"
          className="text-black-700 block text-sm font-medium"
        >
          Internet:
        </label>
        <div>
          <Select onValueChange={setInternet} value={internet}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn gói cước internet" />
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
          Số điện:
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="text"
            id="electricity"
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
          Nước (khối):
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="text"
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
          Khoản đóng góp:
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="text"
            id="contribute"
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
          Ngày hết hạn:
        </label>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
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
