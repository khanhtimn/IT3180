import { Loading } from "@/components/common/loading";
import { ResidentForm } from "@/components/page-component/manage/resident/resident-form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

const Resident = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <Loading />;
  }

  const { data: resident, isLoading } = api.resident.getById.useQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <ResidentForm initialData={resident} />
      </div>
    </div>
  );
};

export default Resident;
