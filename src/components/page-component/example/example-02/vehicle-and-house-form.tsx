"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/api"; // Đảm bảo import đúng module
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VehicleType = Record<"value" | "label", string>;

export function VehicleAndHouseForm() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selected, setSelected] = React.useState<VehicleType[]>([]);
  const [houseArea, setHouseArea] = React.useState("");
  const [internet, setInternet] = React.useState("Internet1");
  const [electricity, setElectricity] = React.useState("");
  const [water, setWater] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [contribute, setContribute] = React.useState("50.000 VNĐ"); // Giá trị mặc định
  const router = useRouter();
  const searchParams = useSearchParams();
  const apartmentNo = Number(searchParams.get("apartmentNo"));

  const { data: vehicles = [], isLoading, isError, error } = api.resident.getVehiclesByApartment.useQuery({ apartmentNo });
  const { data: resident } = api.resident.getByApartmentNo.useQuery({ apartmentNo });

  React.useEffect(() => {
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

  const internetOptions = [
    { value: "Internet1", label: "Internet1" },
    { value: "Internet2", label: "Internet2" },
    { value: "Internet3", label: "Internet3" },
  ];

  const handleSubmit = () => {
    router.push({
      pathname: "/summary",
      query: {
        houseArea,
        internet,
        electricity,
        water,
        contribute,
        notes,
        vehicles: selected.map((v) => v.value).join(","),
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
      <label htmlFor="houseArea" className="block text-sm font-medium text-black-700">
        Phương tiện:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
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
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground cursor-not-allowed"
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
      <label htmlFor="houseArea" className="block text-sm font-medium text-black-700">
        Diện tích nhà (mét vuông):
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="number"
          id="houseArea"
          value={houseArea}
          onChange={(e) => setHouseArea(e.target.value)}
          placeholder="Ví dụ: 120"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="internet" className="block text-sm font-medium text-black-700">
        Internet:
      </label>
      <div>
        <Select
          onValueChange={setInternet}
          value={internet}
        >
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
      <label htmlFor="electricity" className="block text-sm font-medium text-black-700">
        Số điện:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="electricity"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          placeholder="Nhập số điện tiêu thụ..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="water" className="block text-sm font-medium text-black-700">
        Nước (khối):
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          placeholder="Nhập số lượng nước tiêu thụ..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="contribute" className="block text-sm font-medium text-black-700">
        Khoản đóng góp:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="contribute"
          value={contribute}
          readOnly
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground cursor-not-allowed"
        />
      </div>
      <label htmlFor="notes" className="block text-sm font-medium text-black-700">
        Ghi chú:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="space-x-4">
        <Button className="ml-auto" size="sm" onClick={handleBack}>
          Quay lại
        </Button>
        <Button className="ml-auto" size="sm" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}
