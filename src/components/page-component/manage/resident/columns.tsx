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
    accessorKey: "name",
    header: "Họ & Tên",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
  },
  {
    accessorKey: "nationalId",
    header: "CCCD/CMND",
  },
  {
    accessorKey: "vehicle",
    header: "Phương tiện",
  },
  {
    accessorKey: "address.apartmentNo",
    header: "Số căn hộ",
  },
  {
    accessorKey: "address.permanentAddress",
    header: "Địa chỉ thường trú",
  },
  {
    accessorKey: "address.currentAddress",
    header: "Địa chỉ tạm trú",
  },
  {
    accessorKey: "address.isStaying",
    header: "Trạng thái",
  },
  // {
  //   accessorKey: "createAt",
  //   header: "Thời gian tạo",
  // },
  // {
  //   accessorKey: "updateAt",
  //   header: "Thời gian cập nhật",
  // },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
