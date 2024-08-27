import { PrismaClient } from "@prisma/client";
import { router } from "../server/trpc"
import { publicProcedure } from "../server/trpc";

import { z } from "zod"
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()


const secret = "secret"
export const userRouter = router({
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
            const token = jwt.sign({ username: newUser.username }, secret, { expiresIn: '1h' });
            return {
                newUser,
                token
            }
        }
    }),

    //login

    login: publicProcedure.input(z.object({
        username: z.string(),
        password: z.string()
    })).query(async (opts) => {
        const user = await opts.ctx.prisma.todoUser.findUnique({
            where: {
                username: opts.input.username,
                password: opts.input.password
            }
        })
        if (!user) {
            return {
                msg: "incorrect username or password"
            }
        }
        const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" })

        return {
            user,
            token
        }
    }),

    //me 
    me: publicProcedure.query(async (opts) => {
        const username = opts.ctx.username
        if (!username) {
            return {
                msg: "not logged in",

            }
        }
        const user = await opts.ctx.prisma.todoUser.findUnique({
            where: {
                username: username
            }
        })
        return user
    })
})


