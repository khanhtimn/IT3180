import { createTRPCRouter } from "@/server/api/trpc";
import { residentRouter } from "@/server/api/routers/resident";
import {userRouter} from "@/server/api/routers/user";
import {feeRouter} from "@/server/api/routers/fee";
import {apartmentRouter} from "@/server/api/routers/apartment";
import {addressRouter} from "@/server/api/routers/address";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  resident: residentRouter,
  user: userRouter,
  fee: feeRouter,
  apartment: apartmentRouter,
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
