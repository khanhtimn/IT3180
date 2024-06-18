import React from "react";
import {PaymentCreateForm} from "@/components/page-component/manage/fee/payment/payment-create-form";
import BreadCrumb from "@/components/ui/breadcrumb";


const breadcrumbItems = [
  { title: 'Quản lý khoản thu', link: '/manage/fee' },
  { title: 'Tạo mới', link: '/manage/fee/create' }
];

const PaymentCreate = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
        </div>
        <PaymentCreateForm/>
      </div>
    </div>
  );
};

export default PaymentCreate;