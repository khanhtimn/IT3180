import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, type ILogin} from "@/lib/validators";
import {api} from "@/utils/api";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface ILoginProps {
  initialData: ILogin | null | undefined;
}

const SignUp = ({initialData}: ILoginProps) => {
  const toastMessageSuccess = "Dang ky thành công";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ILogin>({
    defaultValues: initialData || {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });


  const {mutate: signUp} = api.user.signup.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(toastMessageSuccess);
      router.push("/");
      },
  });

  const onSubmit = (values: ILogin) => {
    setLoading(true);
    signUp({...values});
    setLoading(false);
  };

  return (
    <div>
      <main>

        <Form {...form}>
          <form
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <div className="grid-cols-3 gap-8 md:grid">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Họ & Tên</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid-cols-3 gap-8 md:grid">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Mat khau</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                        disabled={loading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-x-4">
              <Button disabled={loading} className="ml-auto" type="submit">
                Tao tai khoan
              </Button>
              <Button
                disabled={loading}
                className="ml-auto"
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                Quay lai
              </Button>
            </div>
          </form>
        </Form>

      </main>
    </div>
  );
};

export default SignUp;