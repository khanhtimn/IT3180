import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type ILogin } from "@/lib/validators";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutate: signUp } = api.user.signup.useMutation({
    onError: (err) => {
      toast.error(err.message);
      setLoading(false);
    },
    onSuccess: (data) => {
      toast.success("Đăng ký thành công!");
      setLoading(false);
      router.push("/login");
    },
  });

  const onSubmit = (values: ILogin) => {
    setLoading(true);
    signUp({ ...values });
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form
                onSubmit={(e) => {
                  void handleSubmit(onSubmit)(e);
                }}
              >
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="string"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    {...register("email")}
                    disabled={loading}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                    MẬT KHẨU
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Mật khẩu"
                    maxLength={32}
                    {...register("password")}
                    disabled={loading}
                  />
                  {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                </div>

                <div className="text-center mt-6">
                  <Button
                    className="uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    disabled={loading}
                  >
                    Đăng ký
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2"/>
            <div className="w-1/2 text-right">
              <Link href="/login" className="text-blueGray-200">
                <small>Quay lại</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
