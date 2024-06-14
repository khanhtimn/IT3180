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
            title="Chọn Phòng Chung Cư"
            description=""
          />
        </div>
        <Separator />
        <ApartmentSelector />

      </div>
    </div>
  );
};

export default ApartmentSelectorPage;
