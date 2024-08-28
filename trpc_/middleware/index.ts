
// import { TRPCError } from "@trpc/server"
// import { middleware } from "../server/trpc"

// export const isLoggedIn = middleware(async (opts) => {
//     const username = opts.ctx.username
//     const prisma = opts.ctx.prisma
//     if (!username) {
//         throw new TRPCError({ code: "UNAUTHORIZED" })
//     }

//     let user = await prisma.todoUser.findUnique({
//         where: {
//             username: username
//         }
//     })
//     return opts.next({
//         ctx: {
//             user
//         }
//     })
// })