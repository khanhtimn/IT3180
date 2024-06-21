import React from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { AccountForm } from "@/components/page-component/manage/account/account-form";

const breadcrumbItems = [{ title: 'Đổi mật khẩu', link: '/manage/account' }];
const Account = () => {

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AccountForm/>
      </div>
    </div>
  );
};

export default Account;
