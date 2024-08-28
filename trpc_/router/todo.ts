
import { PrismaClient } from "@prisma/client";
import { router } from "../server/trpc"
import { publicProcedure } from "../server/trpc";

import { number, z } from "zod"
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()


const secret = "secret"

export const todoRouter = router({
    // routes
    getTodo: publicProcedure.query(async (opts) => {
        const todo = await prisma.todo.findFirst();
        console.log(opts.ctx.username);
        return todo;
    }),

    createTodo: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            done: z.boolean(),
            userId: z.number()
        }))
        .mutation(async (opts) => {
            const todo = await prisma.todo.create({
                data: {
                    title: opts.input.title,
                    description: opts.input.description,
                    done: opts.input.done,
                    authorId: opts.input.userId
                },
            });
            console.log(todo);
            console.log("Todo added successfully");
            return todo;
        }),

    getAllTodo: publicProcedure.query(async (opts) => {
        const user = await opts.ctx.prisma.todoUser.findUnique({
            where: {
                username: opts.ctx.username
            }
        })
        if(!user){
            return []
        }
        const todoArr = await opts.ctx.prisma.todo.findMany({
            where: {
                authorId: user.id
            }
        })
        return todoArr

    }),
    // getAllTodo: publicProcedure.input(z.object({
    //     id : z.number()
    // })).query(async (opts) => {
    //     // const user = await opts.ctx.prisma.todoUser.findUnique({
    //     //     where: {
    //     //         username: opts.ctx.username
    //     //     }
    //     // })
        
    //     const todoArr = await opts.ctx.prisma.todo.findMany({
    //         where: {
    //             authorId: opts.input.id
    //         }
    //     })
    //     return todoArr

    // })
});

