import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/server/auth";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };