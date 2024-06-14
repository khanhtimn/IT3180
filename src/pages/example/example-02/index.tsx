import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { ApartmentSelector } from "@/components/page-component/example/example-02/apartment-selector";
import {FeeList} from "@/components/page-component/example/example-02/fee";
import { Loading } from "@/components/common/loading";
import {api} from "@/utils/api";

const ApartmentSelectorPage = () => {
  const { data, isLoading, isError, error } = api.fee.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <FeeList data={data}/>
      </div>
    </div>
  );
};

export default ApartmentSelectorPage;
