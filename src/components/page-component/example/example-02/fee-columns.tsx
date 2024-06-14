"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import {type FeeColumns} from "@/lib/validators";
import {CellAction} from "@/components/page-component/example/example-02/cell-action";

export const columns: ColumnDef<FeeColumns>[] = [
  {
    id: "select",
    header: ({table}) => (
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
    cell: ({row}) => (
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
    accessorKey: "id",
    header: "Nhan danh phi",
  },
  {
    accessorKey: "apartmentNo",
    header: "Chung cu so",
  },
  {
    accessorKey: "totalAmount",
    header: "Tong phi thu",
  },
  {
    accessorKey: "apartmentSizeFee",
    header: "Phi nha o",
  },
  {
    accessorKey: "internetFee",
    header: "Phi Internet",
  },
  {
    accessorKey: "electricityFee",
    header: "Phi dien",
  },
  {
    accessorKey: "waterFee",
    header: "Phi nuoc",
  },
  {
    accessorKey: "vehicleFee",
    header: "Phi gui xe",
  },
  {
    accessorKey: "dueDate",
    header: "Han thanh toan",
  },
  {
    accessorKey: "isPaid",
    header: "Da thanh toan?",
  },
  {
    accessorKey: "notes",
    header: "Ghi chu:",
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
    cell: ({row}) => <CellAction data={row.original}/>,
  },
];
