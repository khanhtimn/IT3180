import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { ApartmentSelector } from "@/components/page-component/example/example-02/apartment-selector";

const ApartmentSelectorPage = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Quản lý khoản thu"
            description=""
          />
        </div>
        <Separator/>
        <div className="flex items-center justify-between">
          <h2 className="font-bold tracking-tight">Tạo khoản thu mới cho căn hộ</h2>
        </div>
        <ApartmentSelector/>
        <Separator/>

      </div>
    </div>
  );
};

export default ApartmentSelectorPage;
