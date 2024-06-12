// // pages/example/example-02/apartment-selector.tsx
// import React from "react";
// import { Heading } from "@/components/common/heading";
// import { Separator } from "@/components/ui/separator";
// import { ApartmentSelector } from "@/components/page-component/example/example-02/ApartmentSelector";

// const ApartmentSelectorPage = () => {
//   return (
//     <div className="flex flex-col">
//       <div className="flex-1 space-y-4 p-4 md:p-8">
//         <div className="flex items-center justify-between">
//           <Heading
//             title="Chọn Phòng Chung Cư"
//             description="Chọn phòng chung cư của bạn"
//           />
//         </div>
//         <Separator />
//         <ApartmentSelector />
//       </div>
//     </div>
//   );
// };

// export default ApartmentSelectorPage;

import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { VehicleAndHouseForm } from "@/components/page-component/example/example-02/vehicle-and-house-form";

const Example02 = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <Heading
            title="Quản lý khoản thu"
            description="Quản lý khoản thu của bạn"
          />
        </div>
        <Separator />
        <VehicleAndHouseForm />
      </div>
    </div>
  );
};

export default Example02;