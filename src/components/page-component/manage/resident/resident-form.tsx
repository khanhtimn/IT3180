/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useState} from "react";
import {type Resident} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {type ResidentFromValues, residentFormSchema} from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";
import {api} from "@/utils/api";
import toast from "react-hot-toast";
import {Heading} from "@/components/common/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {AlertModal} from "@/components/common/alert-modal";

interface ResidentFormProps {
  initialData: Resident | null | undefined;
}

export const ResidentForm = ({initialData}: ResidentFormProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Cập nhật thông tin" : "Cư dân mới";
  const description = initialData ? "Cập nhật thông tin" : "Tạo cư dân mới";
  const toastMessage = initialData
    ? "Cập nhật thành công"
    : "Tạo mới thành công";
  const action = initialData ? "Lưu" : "Tạo mới";

  const form = useForm<ResidentFromValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues: initialData || {
      name: "",
      gender: "",
      vehicle: "",
      nationalId: "",
      phoneNumber: "",
    },
  });

  const {mutate: createResident} = api.resident.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/manage/residents`);
    },
  });

  const {mutate: updateResident} = api.resident.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessage);
      router.push(`/manage/residents`);
    },
  });

  const {mutate: deleteResident, isLoading: deleteResidentIsLoading} =
    api.resident.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: (data) => {
        toast.success(toastMessage);
        router.push(`/manage/residents`);
      },
    });

  const onSubmit = (values: ResidentFromValues) => {
    setLoading(true);
    if (initialData) {
      updateResident({...values, id: initialData.id});
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
        <Heading title={title} description={description}/>
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4"/>
          </Button>
        )}
      </div>
      <Separator/>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid-cols-3 gap-8 md:grid">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Họ & Tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Họ & Tên"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({field}) => (
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
                          placeholder="Giới tính"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Số điện thoại"
                      inputMode="numeric"
                      value={field.value}
                      pattern="[0-9]*"
                      maxLength={10}
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>CCCD / CMND</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="CCCD/CMND"
                      inputMode="numeric" // display number keyboard on mobile
                      value={field.value}
                      pattern="[0-9]*" // parse to number type for zod validation
                      // onChange={(e) =>
                      //   e.target.validity.valid && field.onChange(+e.target.value) // change input field
                      // }
                      maxLength={12}
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartmentNo"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Số nhà</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Số nhà"
                      inputMode="numeric" // display number keyboard on mobile
                      maxLength={3}
                      value={field.value || ""}
                      pattern="[0-9]*" // parse to number type for zod validation
                      onChange={(e) =>
                        e.target.validity.valid && field.onChange(+e.target.value) // change input field
                      }
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicle"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phương tiện</FormLabel>
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
                          placeholder="Phương tiện"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Không">Không</SelectItem>
                      <SelectItem value="Xe đạp">Xe đạp</SelectItem>
                      <SelectItem value="Xe môtô / Xe gắn máy">Xe môtô / Xe gắn máy</SelectItem>
                      <SelectItem value="Xe ôtô">Xe ôtô</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage/>
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
              Thoát
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        title="Xóa thông tin?"
        description="Không thể khôi phục."
        name={initialData?.name}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteResidentIsLoading}
      />
    </>
  );
};
