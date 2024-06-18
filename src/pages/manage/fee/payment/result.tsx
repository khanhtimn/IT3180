import React from "react";
import PaymentForm from "@/components/page-component/manage/fee/payment/payment-form";
import BreadCrumb from "@/components/ui/breadcrumb";

const breadcrumbItems = [
  { title: 'Quản lý khoản thu', link: '/manage/fee' },
  { title: 'Tạo mới', link: '/manage/fee/create' },
  { title: 'Xác nhận tạo mới', link: '/manage/fee/create/result' }
];
const PaymentFormPage = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <PaymentForm initialData={null}/>
      </div>
    </div>
  )
}
export default PaymentFormPage;