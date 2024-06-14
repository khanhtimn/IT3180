import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import PaymentResult from "@/components/page-component/example/example-02/payment/payment-result";

const paymentFormPage = () => {
    return ( 
        <div className = "flex flex-col" >
            <div className = "flex-1 space-y-4 p-4 md:p-8" >
                <div className = "flex items-center justify-between" >
                    <Heading title = "Hóa đơn"
                    description = " " />
                </div> 
                <Separator />
                <PaymentResult />
            </div> 
        </div>
    )
}
export default paymentFormPage;