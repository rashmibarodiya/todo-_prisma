import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.secret!;
console.log(secret)
export const router = express.Router();

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).send("Token is not valid");
            }
            if (user && typeof user !== "string") {
                req.headers["userId"] = user.id.toString(); // Ensure userId is stored as a string
                next();
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.status(401).send("Token not provided");
    }
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.todoUser.findMany({
        where: {
            username : username
        }
    });
    if (user) {
        return res.status(403).send("User already exists");
    }
    const newUser = await prisma.todoUser.create({
        data: { username, password }
    });

    const token = jwt.sign({ id: newUser.id }, secret, { expiresIn: '1h' });
    res.json({
        message: "User created successfully", token
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.todoUser.findFirst({
        where: {
            username,
            password
        }
    });

    if (user) {
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
        return res.json({
            message: "Logged in successfully", token
        });
    }
    res.status(403).send({
        message: "Invalid username or password"
    });
});

router.get("/me", authenticateJwt, async (req, res) => {
    const userId = parseInt(req.headers["userId"] as string, 10);
    if (isNaN(userId)) {
        return res.status(400).send("Invalid user ID");
    }

    const user = await prisma.todoUser.findUnique({
        where: { id: userId }
    });

    if (user) {
        res.json({
            username: user.username
        });
    } else {
        res.status(403).send("User not found");
    }
});
