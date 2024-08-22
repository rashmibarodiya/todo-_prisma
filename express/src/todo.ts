import { authenticateJwt } from "./auth";
import express from "express";


const router = express.Router();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

router.post('/addTodo', authenticateJwt, async (req, res) => {

    const { title, description } = req.body;
    const userId = parseInt(req.headers["userId"] as string);
    const done = false;
    const todo = await prisma.todo.create({
        data: {

            title: title,
            description: description,
            done: done,
            authorId: userId
        }

    }).then(saved => {
        console.log(saved)
        res.status(200).json(saved);
    })
        .catch(err => {
            res.status(500).json({
                mes: "Failed to create a todo"
            });
        });
});
router.get('/todo', authenticateJwt, async (req, res) => {
    const userId = parseInt(req.headers["userId"] as string);
    try {
        const todos = await prisma.todo.findMany({
            where: {
                authorId: userId
            }
        });
        res.status(200).json(todos);
    } catch (e) {
        res.status(500).json({
            message: "Failed to get todos"
        });
    }
});
router.patch('/todos/:todoId/done', authenticateJwt, async (req, res) => {
    const todoId = parseInt(req.params.todoId);
    const userId = parseInt(req.headers["userId"] as string);

    try {
        const todo = await prisma.todo.findUnique({
            where: { id: todoId }
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.authorId !== userId) {
            return res.status(403).json({ message: "Not authorized to update this todo" });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: { done: true }
        });

        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: "Failed to update todo" });
    }
});

export default router;