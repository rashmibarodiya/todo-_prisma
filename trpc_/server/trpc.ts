import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const t = initTRPC.context<{
    username?: string;
    prisma: PrismaClient;  
}>().create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware