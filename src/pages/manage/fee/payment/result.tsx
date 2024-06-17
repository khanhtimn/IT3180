import React from "react";
import PaymentForm from "@/components/page-component/manage/fee/payment/payment-form";
import {useRouter} from "next/router";
import {Loading} from "@/components/common/loading";
import {api} from "@/utils/api";

const PaymentFormPage = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <PaymentForm initialData={null}/>
      </div>
    </div>
  )
}
export default PaymentFormPage;