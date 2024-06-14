"use client";
import React from "react";
import { Heading } from "@/components/common/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import {type FeeColumns} from "@/lib/validators";
import {columns} from "@/components/page-component/example/example-02/fee-columns";

interface FeeClientProps {
  data: FeeColumns[];
}
export const FeeList = ({ data }: FeeClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Thông tin thu phi"
          description="Danh sách phi can thu trong hệ thống"
        />
        <Button
          onClick={() => {
            router.push("/example/payment/new");
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
