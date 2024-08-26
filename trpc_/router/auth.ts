import { PrismaClient } from "@prisma/client";
import { router } from "../server/trpc"
import { publicProcedure } from "../server/trpc";

import { z } from "zod"
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()


//const secret  ="secret"
const appRouter = router({
    //signup
    signup: publicProcedure.input(z.object({
        username: z.string(),
        password: z.string()
    })).mutation(async (opts) => {
        const user = await prisma.todoUser.findUnique({
            where: {
                username: opts.input.username
            }
        })
        if (user) {
            return {
                msg: "user already exist"
            }
        } else {

            const newUser = await prisma.todoUser.create({
                data: {
                    username: opts.input.username,
                    password: opts.input.password
                }

            })
            const token = jwt.sign({ id: newUser.id }, process.env.SECRET!, { expiresIn: '1h' });
            return {
                newUser ,
                token  
            }
        }
    }),

    //login

    
})


export type AppRouter2 = typeof appRouter