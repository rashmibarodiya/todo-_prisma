import { router } from "./trpc"
import { publicProcedure } from "./trpc"
import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { z } from "zod"
const appRouter = router({
    //routes

    getTodo: publicProcedure
        .query(async () => {
            //await console.log("whats going on")
            return {
                title: "i dont want it",
                description: "hola",
                done: false
            }
        }),

        createTodo: publicProcedure
        .input(z.object({
            title: z.string(),

            description: z.string(),
            done: z.boolean()
        })).mutation(async (opts) => {
            return {
                title: "i dont want it",
                description: "hola",
                done: false
            }
        })
})
const server = createHTTPServer({
    router: appRouter,
  });
   
  server.listen(3000);
export type AppRouter = typeof appRouter