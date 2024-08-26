import { router } from "./trpc";
import { publicProcedure } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const appRouter = router({
    // routes
    getTodo: publicProcedure.query(async (opts) => {
        const todo = await prisma.todo.findFirst();
        console.log(opts.ctx.username)
        return todo;
    }),

    createTodo: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            done: z.boolean(),
            userId  :z.number()
        }))
        .mutation(async (opts) => {
            const todo = await prisma.todo.create({
                data: {
                    title: opts.input.title,
                    description: opts.input.description,
                    done: opts.input.done,
                    authorId : opts.input.userId
                },
            });
            console.log(todo)
            console.log("todo added successfully")
            return todo;
        })
});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let headuser = opts.req.headers["authorization"]
        console.log(headuser)
        return{
            username : "rashmi"
        }
    }
});

server.listen(3000);

export type AppRouter = typeof appRouter;
