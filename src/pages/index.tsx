import {ILogin, loginSchema} from "@/lib/validators";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface ILoginProps {
  initialData: ILogin | null | undefined;
}

const Home = ({initialData}: ILoginProps) => {
  const toastMessageSuccess = "Dang nhap thành công";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ILogin>({
    defaultValues: initialData || {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // const { mutate: signIn } = api.user.login.useMutation({
  //   onError: (err) => {
  //     toast.error(err.message);
  //     setLoading(false);
  //   },
  //   onSuccess: async (data) =>  {
  //     toast.success(toastMessageSuccess);
  //     // Store the token in cookies
  //     if (data.token) {
  //       Cookies.set("token", data.token, { expires: 1 }); // Cookie expires in 1 day
  //     }
  //     setLoading(false);
  //     await getSession(); // Ensure the session is fetched
  //     router.push("/dashboard");
  //   },
  // });


  // const onSubmit = (values: ILogin) => {
  //   setLoading(true);
  //   signIn({ ...values });
  // };


  const onSubmit = async (values: ILogin) => {
    setLoading(true);
    // const result = signIn('credentials', {
    //   redirect: false,
    //   email: values.email,
    //   password: values.password,
    //   callbackUrl: "/dashboard",
    // });
    //
    // if (result?.error) {
    //   toast.error(result.error);
    //   setLoading(false);
    // } else {
    //   toast.success(toastMessageSuccess);
    await signIn("credentials", {...values, callbackUrl: "/dashboard"});
    //router.push( "/dashboard");
    setLoading(false);
  }


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
                Dang nhap
              </Button>
              <Button
                disabled={loading}
                className="ml-auto"
                type="button"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Dang ky
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default Home;
