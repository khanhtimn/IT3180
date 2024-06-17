"use client";
import React from "react";
import { Heading } from "@/components/common/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ResidentColumn } from "@/lib/validators";
import { columns } from "./columns";

interface ResidentClientProps {
  data: ResidentColumn[];
}
export const ResidentClient = ({ data }: ResidentClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Thông tin cư dân"
          description="Danh sách cư dân trong hệ thống"
        />
        <Button
          onClick={() => {
            router.push("/manage/residents/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
