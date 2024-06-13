// pages/example/example-02/payment-form.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";

const calculateTotal = (houseArea, internet, electricity, water, vehicles) => {
  // Ví dụ: tính toán số tiền phải trả
  const houseCost = houseArea * 10000; // Giả sử 10,000 VND/m2
  const internetCost = 200000; // Giả sử gói cước internet là 200,000 VND
  const electricityCost = electricity * 3000; // Giả sử 3,000 VND/kWh
  const waterCost = water * 5000; // Giả sử 5,000 VND/m3
  const vehicleCost = vehicles.length * 100000; // Giả sử mỗi phương tiện 100,000 VND

  return houseCost + internetCost + electricityCost + waterCost + vehicleCost;
};

export default function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const houseArea = Number(searchParams.get('houseArea'));
  const internet = searchParams.get('internet');
  const electricity = Number(searchParams.get('electricity'));
  const water = Number(searchParams.get('water'));
  const vehicles = searchParams.get('vehicles')?.split(',') || [];
  const apartmentNo = Number(searchParams.get('apartmentNo'));
  const notes = searchParams.get('notes');

  const total = calculateTotal(houseArea, internet, electricity, water, vehicles);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Tổng hợp chi phí</h1>
      <p>Phòng: {apartmentNo}</p>
      <p>Diện tích nhà: {houseArea} m²</p>
      <p>Internet: {internet}</p>
      <p>Số điện: {electricity} kWh</p>
      <p>Nước: {water} m³</p>
      <p>Phương tiện: {vehicles.join(', ')}</p>
      <p>Ghi chú: {notes}</p>
      <h2 className="text-lg font-bold">Tổng tiền: {total} VND</h2>
      <Button size="sm" onClick={() => router.back()}>
        Quay lại
      </Button>
    </div>
  );
}
