import React, {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import toast from "react-hot-toast";
import type {feeFormValues} from "@/lib/validators";

const PaymentResult = () => {
  const toastMessageSuccess = "Tạo phí thành công";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const houseArea = searchParams.get("houseArea");
  const internet = searchParams.get("internet");
  const electricity = searchParams.get("electricity");
  const water = searchParams.get("water");
  const contribute = searchParams.get("contribute");
  const notes = searchParams.get("notes");
  const vehicles = searchParams.get("vehicles");
  const apartmentNo = searchParams.get("apartmentNo");

  const [totalAmount, setTotalAmount] = useState(0);

  const internetLabels = {
    Internet0: "Không có",
    Internet1: "Internet1",
    Internet2: "Internet2",
    Internet3: "Internet3",
  };

  const calculateElectricityCost = (kWh) => {
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
      const kWhInThisTier = Math.min(remainingKWh, tier.max - (tier.max === Infinity ? 0 : (tier.max - 50)));
      cost += kWhInThisTier * tier.rate;
      remainingKWh -= kWhInThisTier;
    }

    return cost;
  };

  const calculateWaterCost = (cubicMeters) => {
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
      const cubicMetersInThisTier = Math.min(remainingCubicMeters, tier.max - (tier.max === Infinity ? 0 : (tier.max - 10)));
      cost += cubicMetersInThisTier * tier.rate;
      remainingCubicMeters -= cubicMetersInThisTier;
    }

    return cost;
  };

  const calculateVehicleCost = (vehicles) => {
    const vehicleArray = vehicles.split(",");
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

  useEffect(() => {
    // Calculate total amount based on input values
    let amount = 0;

    if (houseArea) {
      amount += parseFloat(houseArea) * 15000;
    }
    if (internet) {
      switch (internet) {
        case "Không có":
          amount += 0;
          break;
        case "Internet1":
          amount += 330000;
          break;
        case "Internet2":
          amount += 875600;
          break;
        case "Internet3":
          amount += 1075600;
          break;
      }
    }
    if (electricity) {
      amount += calculateElectricityCost(parseFloat(electricity));
    }
    if (water) {
      amount += calculateWaterCost(parseFloat(water));
    }
    if (contribute) {
      amount += parseFloat(contribute.replace(/[^0-9]/g, ""));
    }
    if (vehicles) {
      amount += calculateVehicleCost(vehicles);
    }

    setTotalAmount(amount);
  }, [houseArea, internet, electricity, water, contribute, vehicles]);

  const handleBack = () => {
    router.back();
  };

  const {mutate: createFee} = api.fee.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessageSuccess);
      handleBack();
    },
  });

  const handleSave = (values: feeFormValues) => {
    setLoading(true);
    createFee({
      values: {
        totalAmount: totalAmount,
        internetFee: internet,
        electricityFee: electricity,
        waterFee: water,
        contributionFee: contribute,
        notes: notes || null,
        apartmentNo: apartmentNo,
        dueDate: Date,
        isPaid: false,
      }
    });
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p>
          <strong>Diện tích nhà:</strong> {houseArea} m²
        </p>
        <p>
          <strong>Gói cước internet:</strong> {internetLabels[internet]}
        </p>
        <p>
          <strong>Số điện tiêu thụ:</strong> {electricity} kWh
        </p>
        <p>
          <strong>Số lượng nước tiêu thụ:</strong> {water} khối
        </p>
        <p>
          <strong>Khoản đóng góp:</strong> {contribute} VNĐ
        </p>
        <p>
          <strong>Phí gửi xe:</strong> {vehicles}
        </p>
        <p>
          <strong>Số phòng:</strong> {apartmentNo}
        </p>
        <p>
          <strong>Tổng số tiền:</strong> {totalAmount} VNĐ
        </p>
        {notes && (
          <p>
            <strong>Ghi chú:</strong> {notes}
          </p>
        )}
      </div>
      <div className="space-x-4">
        <Button className="ml-auto" size="sm" onClick={handleBack}>
          Quay lại
        </Button>

        <Button className="ml-auto" size="sm" onClick={handleSave}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default PaymentResult;