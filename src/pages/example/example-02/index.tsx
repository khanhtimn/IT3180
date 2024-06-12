 import React from "react";
 import { Heading } from "@/components/common/heading";
 import { Separator } from "@/components/ui/separator";
// import { FancyMultiSelect } from "@/components/page-component/example/example-02/multi-select-input";

// const Example02 = () => {
//   return (
//     <div className="flex flex-col">
//       <div className="flex-1 space-y-4 p-4 md:p-8">
//         <div className="flex items-center justify-between">
//           <Heading
//             title="Mutil Select"
//             description="This is a mutil select example"
//           />
//         </div>
//         <Separator />
//         <FancyMultiSelect />
//       </div>
//     </div>
//   );
// };

// export default Example02;

// import { VehicleAndHouseForm } from '@/components/page-component/example/example-02/vehicle-and-house-form';

// Trong component của bạn, sử dụng thành phần VehicleAndHouseForm
// const Example02 = () => {
//   return (
//     <div className="flex flex-col">
//       <div className="flex-1 space-y-4 p-4 md:p-8">
//         <div className="flex items-center justify-between">
//         <Heading
//         title = "Quản lý khoản thu"
//         description = "Quản lý khoản thu của bạn"
//         />
//         </div>
//         <Separator />
//         <VehicleAndHouseForm />
//       </div>
//     </div>
//    );
// };
// export default Example02;

import ApartmentList from '@/components/page-component/example/example-02/ApartmentList';

const Example02: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
         <div className="flex items-center justify-between">
        <Heading
        title = "Quản lý khoản thu"
        description = "Quản lý khoản thu của bạn"
         />/         
         </div>
         <Separator />
      <ApartmentList />
    </div>
  </div>
  );
};

export default Example02;

