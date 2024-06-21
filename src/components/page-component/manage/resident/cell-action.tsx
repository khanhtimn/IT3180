"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Pencil, Trash2 } from "lucide-react";
import { AlertModal } from "@/components/common/alert-modal";
import { type ResidentColumn } from "@/lib/validators";

interface CellActionProps {
  data: ResidentColumn;
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const { refetch } = api.resident.getAll.useQuery(undefined, {
    enabled: false,
  });

  const { mutate: deleteResident, isLoading: deleteResidentIsLoading } =
    api.resident.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: async () => {
        toast.success("Xóa thành công");
        await refetch();
      },
    });

  return (
    <div className="flex justify-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                router.push(`/manage/residents/${data.id}`);
              }}
            >
              <Pencil className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cập nhật thông tin</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                setAlertModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xóa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertModal
        title="Xóa thông tin cư dân này?"
        description="Không thể khôi phục."
        name={"cư dân: " + data.name}

        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteResident(data.id)}
        loading={deleteResidentIsLoading}
      />
    </div>
  );
}
