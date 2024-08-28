import { PrismaClient } from "@prisma/client";
import { router } from "../server/trpc";
import { publicProcedure } from "../server/trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = "secret";

export const userRouter = router({
    // Signup
    signup: publicProcedure.input(
        z.object({
            username: z.string(),
            password: z.string(),
        })
    ).mutation(async (opts) => {
        const user = await prisma.todoUser.findUnique({
            where: {
                username: opts.input.username,
            },
        });

        if (user) {
            return {
                msg: "User already exists",
                token: "",
            };
        }

        const newUser = await prisma.todoUser.create({
            data: {
                username: opts.input.username,
                password: opts.input.password,
            },
        });

        const token = jwt.sign({ username: newUser.username }, secret, {
            expiresIn: "1h",
        });

        return {
            newUser,
            token,
        };
    }),

    // Login
    login: publicProcedure.input(
        z.object({
            username: z.string(),
            password: z.string(),
        })
    ).mutation(async (opts) => {
        const user = await prisma.todoUser.findUnique({
            where: { username: opts.input.username },
        });

        if (!user || user.password !== opts.input.password) {
            return { msg: "Incorrect username or password" };
        }

        const token = jwt.sign({ username: user.username }, secret, {
            expiresIn: "1h",
        });
        console.log("no trouble from login route definition")

        return { user, token };
    }),

    // Me
    me: publicProcedure.query(async (opts) => {
        const username = opts.ctx.username;

        if (!username) {
            throw new Error("User is not authenticated.");
        }

        const user = await opts.ctx.prisma.todoUser.findUnique({
            where: {
                username: username,
            },
        });

        return user;
    }),
});
