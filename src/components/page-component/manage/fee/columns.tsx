"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import {type FeeColumn} from "@/lib/validators";
import {CellAction} from "@/components/page-component/manage/fee/cell-action";

export const columns: ColumnDef<FeeColumn>[] = [
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
    accessorKey: "apartmentNo",
    header: "Số căn hộ",
  },
  {
    accessorKey: "apartmentSizeFee",
    header: "Phí dịch vụ chung cư",
  },

  {
    accessorKey: "electricityFee",
    header: "Phí điện",
  },
  {
    accessorKey: "waterFee",
    header: "Phí nước",
  },
  {
    accessorKey: "internetFee",
    header: "Phí Internet",
  },
  {
    accessorKey: "vehicleFee",
    header: "Phí gửi xe",
  },
  {
    accessorKey: "totalAmount",
    header: "Tổng phí thu",
  },
  {
    accessorKey: "contributionFee",
    header: "Khoản đóng góp",
  },
  {
    accessorKey: "dueDate",
    header: "Hạn thanh toán",
  },
  {
    accessorKey: "isPaid",
    header: "Trạng thái",
  },
  {
    accessorKey: "notes",
    header: "Ghi chú",
  },
  {
    accessorKey: "updateAt",
    header: "Cập nhật lần cuối",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({row}) => <CellAction data={row.original}/>,
  },
];
