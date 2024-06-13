"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api"; // Đảm bảo import đúng module
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ApartmentSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const { data: apartments = [], isLoading } = api.resident.getApartmentsWithResidents.useQuery();

  const handleConfirm = () => {
    if (selected) {
      router.push({
        pathname: "/example/example-02/vehicle-and-house-form",
        query: { apartmentNo: selected },
      });
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <Select
        onValueChange={setSelected}
        value={selected}
      >
        <SelectTrigger>
          <SelectValue>{selected ? `Phòng ${selected}` : "Chọn phòng chung cư"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {apartments.map((apartment) => (
            <SelectItem key={apartment.apartmentNo} value={String(apartment.apartmentNo)}>
              {`Phòng ${apartment.apartmentNo}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end mt-4">
        <Button size="sm" onClick={handleConfirm} disabled={!selected}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}
