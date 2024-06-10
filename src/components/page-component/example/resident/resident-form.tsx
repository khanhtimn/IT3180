/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { type Resident } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type ResidentFromValues, residentFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertModal } from "@/components/common/alert-modal";

interface ResidentFormProps {
  initialData: Resident | null | undefined;
}

export const ResidentForm = ({ initialData }: ResidentFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit resident" : "Create resident";
  const description = initialData ? "Edit a resident" : "Create a new resident";
  const toastMessage = initialData
    ? "Resident updated successfully"
    : "Resident created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ResidentFromValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
    },
  });

  const { mutate: createResident } = api.resident.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/example/residents`);
    },
  });

  const { mutate: updateResident } = api.resident.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/example/residents`);
    },
  });

  const { mutate: deleteResident, isLoading: deleteResidentIsLoading } =
    api.resident.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: (data) => {
        toast.success(toastMessage);
        router.push(`/example/residents`);
      },
    });

  const onSubmit = (values: ResidentFromValues) => {
    setLoading(true);
    if (initialData) {
      updateResident({ ...values, id: initialData.id });
    } else {
      createResident(values);
    }
    setLoading(false);
  };

  const onDelete = () => {
    deleteResident(initialData?.id as string);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid-cols-3 gap-8 md:grid">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên đệm</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="First Name"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Last Name"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CCCD/CMT</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="National ID"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Address"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-4">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
            <Button
              disabled={loading}
              className="ml-auto"
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={initialData?.firstName}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteResidentIsLoading}
      />
    </>
  );
};
