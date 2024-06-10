"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { type ResidentColumn } from "@/lib/validators";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ResidentColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "Họ và tên đệm",
  },
  {
    accessorKey: "lastName",
    header: "Tên",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
  {
    accessorKey: "nationalId",
    header: "CCCD/CMND",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "createAt",
    header: "Thời gian tạo",
  },
  {
    accessorKey: "updateAt",
    header: "Thời gian cập nhật",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
