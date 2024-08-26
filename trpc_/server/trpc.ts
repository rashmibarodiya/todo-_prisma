import { initTRPC } from "@trpc/server";

const t = initTRPC.context<{
    username :string
}>().create()

export const publicProcedure = t.procedure;
export const router = t.router; 