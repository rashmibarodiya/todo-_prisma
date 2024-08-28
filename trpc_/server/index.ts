import { router } from "./trpc";
import { publicProcedure } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userRouter } from "../router/auth";
import { todoRouter } from "../router/todo"
import cors from "cors"

interface MyJwtPayload extends JwtPayload {
    username: string;
}
const prisma = new PrismaClient();


// using trpc
const appRouter = router({
    user: userRouter,
    todo: todoRouter,
});

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts) {
        const authHeader = opts.req.headers["authorization"];
        return new Promise<{ username?: string; prisma: PrismaClient }>((resolve) => {
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                console.log("inside server " + token);

                jwt.verify(token, "secret", (err, user) => {
                    if (!user) {
                        console.log("no user")
                        resolve({ prisma });
                    } else {
                        const payload = user as MyJwtPayload
                        console.log("payload : " + payload)
                        resolve({ username: payload.username, prisma }); // Pass Prisma and username
                    }
                });
            } else {
                resolve({ prisma }); // If no auth header, just pass Prisma
            }
        });
    }
});

server.listen(3000);

export type AppRouter = typeof appRouter;
