import React from "react";
import { api } from "@/utils/api";
import { Loading } from "@/components/common/loading";
import { ResidentClient } from "@/components/page-component/manage/resident/client";
import BreadCrumb from "@/components/ui/breadcrumb";

const breadcrumbItems = [{ title: 'Quản lý cư dân', link: '/manage/residents' }];
const Residents = () => {
  const { data, isLoading, isError, error } = api.resident.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ResidentClient data={data} />
      </div>
    </div>
  );
};

export default Residents;
