import { type ILogin, loginSchema } from "@/lib/validators";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, type LiteralUnion, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { type BuiltInProviderType } from "next-auth/providers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: ILogin) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (result?.error) {
        toast.error("Đăng nhập thất bại, vui lòng thử lại!");
      } else {
        toast.success("Đăng nhập thành công!");
        await getSession();
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: LiteralUnion<BuiltInProviderType>) => {
    setLoading(true);
    try {
      await signIn(provider, {callbackUrl: "/dashboard"});
    } catch (error) {
      toast.error(`Đăng nhập với ${provider} thất bại, vui lòng thử lại`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-4">
                <h6 className="text-blueGray-500 font-bold">
                  Đăng nhập bằng
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="px-32 py-4 rounded outline-none focus:outline-none mr-1 uppercase shadow hover:shadow-md inline-flex items-center ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    void handleOAuthSignIn("google");
                  }}
                >
                  <Image className="w-5 mr-1"
                         width={500}
                         height={500}
                         alt="Google"
                         src="/img/google.svg"
                  />
                  Google
                </Button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300"/>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <h6 className="text-blueGray-500 font-bold">
                  Hoặc đăng nhập bằng
                </h6>
              </div>
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
                    Đăng Nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2"/>
            <div className="w-1/2 text-right">
              <Link href="/register" className="text-blueGray-200">
                <small>Tạo tài khoản mới</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
