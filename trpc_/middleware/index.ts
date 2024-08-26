
import { TRPCError } from "@trpc/server"
import { middleware } from "../server/trpc"

export const isLoggedIn = middleware(async (opts) => {
    const op = opts.ctx.username
    const prisma = opts.ctx.prisma
    if(!op){
        throw new TRPCError({code : "UNAUTHORIZED"})
    }

    let user = await prisma.todoUser.findUnique({
        where:{
            username
            :op
        }
    })
    return opts.next({
        ctx : {
            user
        }
    })
})