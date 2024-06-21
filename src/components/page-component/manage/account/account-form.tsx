import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
//import FileUpload from '@/components/page-component/file-upload';
import { changePasswordSchema, type ChangePasswordValues } from '@/lib/validators';
import {api} from "@/utils/api";
import toast from "react-hot-toast";


export const AccountForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const title = 'Đổi mật khẩu';
    const description = 'Đổi mật khẩu cho tài khoản đăng nhập của bạn';
    const toastMessage =  'Đổi mật khẩu thành công!.';
    const action = 'Xác nhận';


  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
  });
  const {mutate: updateAccount} = api.user.changePassword.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push(`/dashboard`);
    },
  });
  const onSubmit = (values: ChangePasswordValues) => {
    setLoading(true);
    updateAccount({...values});
    setLoading(false);
  };

return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(onSubmit)(e);
          }}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại:</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="Nhập mật khẩu đang được sử dụng."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
