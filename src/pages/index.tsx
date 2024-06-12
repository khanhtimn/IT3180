import Link from "next/link";
import {useCallback} from "react";
import {SessionProvider, signIn} from "next-auth/react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, type ILogin} from "@/lib/validators";

const Home = () => {
  const {handleSubmit, control, reset} = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await signIn("credentials", {...data, callbackUrl: "/dashboard"});
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <SessionProvider>
      <div>
        <main>
          <form
            className="flex items-center justify-center h-screen w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Welcome back!</h2>
                <Controller
                  name="email"
                  control={control}
                  render={({field}) => (
                    <input
                      type="email"
                      placeholder="Type your email..."
                      className="input input-bordered w-full max-w-xs"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({field}) => (
                    <input
                      type="password"
                      placeholder="Type your password..."
                      className="input input-bordered w-full max-w-xs my-2"
                      {...field}
                    />
                  )}
                />
                <div className="card-actions items-center justify-between">
                  <Link href="/register" className="link">
                    Go to sign up
                  </Link>

                  <button className="btn btn-secondary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </SessionProvider>
  );
};

export default Home;