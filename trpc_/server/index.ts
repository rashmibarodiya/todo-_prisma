import { router } from "./trpc";
import { publicProcedure } from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userRouter } from "../router/auth";
import { todoRouter } from "../router/todo"
import cors from "cors";

interface MyJwtPayload extends JwtPayload {
    username: string;
}

const prisma = new PrismaClient();

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
                console.log("Received token:", token);

                jwt.verify(token, "secret", (err, decoded) => {
                    if (err) {
                        console.error("JWT verification failed:", err.message);
                        resolve({ prisma }); // Resolve with Prisma and no username on error
                    } else if (decoded && typeof decoded === "object") {
                        const payload = decoded as MyJwtPayload;
                        console.log("Decoded JWT payload:", payload);
                        resolve({ username: payload.username, prisma }); // Resolve with Prisma and username
                    } else {
                        console.warn("JWT decoded but no valid payload found.");
                        resolve({ prisma });
                    }
                });
            } else {
                console.warn("No Authorization header found.");
                resolve({ prisma }); // Resolve with Prisma and no username if no header
            }
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

export type AppRouter = typeof appRouter;
