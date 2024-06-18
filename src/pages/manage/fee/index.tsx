import React from "react";
import {FeeList} from "@/components/page-component/manage/fee/fee";
import { Loading } from "@/components/common/loading";
import {api} from "@/utils/api";
import BreadCrumb from "@/components/ui/breadcrumb";


const breadcrumbItems = [{ title: 'Quản lý khoản thu', link: '/manage/fee' }];
const FeeManagement = () => {
  const { data, isLoading, isError, error } = api.fee.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <FeeList data={data}/>
      </div>
    </div>
  );
};

export default FeeManagement;
