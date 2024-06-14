import React from "react";
import {PaymentForm} from "@/components/page-component/example/example-02/payment/payment-form";

const Example02 = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
        </div>
        <PaymentForm/>
      </div>
    </div>
  );
};

export default Example02;