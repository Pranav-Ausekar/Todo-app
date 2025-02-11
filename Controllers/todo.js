import { connectToDB } from '../utils/connect.js';
import Todo from "../models/todoModel.js";
import createError from '../utils/error.js';

export async function getAllTodos(req, res, next) {
    // res.send("all todos from controller")
    await connectToDB();
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).send(todos);
}

export async function getTodo(req, res, next) {
    try {
        // res.send("single todo from controller");
        await connectToDB();
        const todo = await Todo.findById(req.params.id);
        if (!todo) return next(createError(404, "Todo not found!"));

        // By comparing todo.userId with req.user.id, you're verifying that the currently logged-in user is the owner of the todo.
        if (todo.userId.toString() != req.user.id) {
            return next(createError(404, "Not authorized!"));
        }
        res.status(200).send(todo);
    } catch (error) {
        next(createError(404, "Todo not found!"));
    }
}

export async function updateTodo(req, res, next) {
    // res.send("update todo from controller")
    const id = req.params.id;
    if (!req.body) return next(createError(404, "Missing fields!"));
    try {
        await connectToDB();
        const todo = await Todo.findById(id);
        if (todo.userId.toString() != req.user.id) {
            return next(createError(404, "Not authorized!"))
        }

        todo.title = req.body.title || todo.title;

        if (req.body.isCompleted != undefined) {
            todo.isCompleted = req.body.isCompleted;
        }
        await todo.save();
        res.status(200).json({ message: "Todo updated successfully!" });
    } catch (error) {
        return next(createError(404, "Todo not found!"))
    }
}

export async function deleteTodo(req, res, next) {
    // res.send("delete todo from controller")
    try {
        await connectToDB();
        const todo = await Todo.deleteOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!todo.deletedCount) return next(createError(400, "Todo not deleted!"));
        res.status(200).json({ message: "Todo deleted successfully!" })
    } catch (error) {
        return next(createError(400, "Todo not found!"))
    }
}

export async function createTodo(req, res, next) {
    // res.send("create todo from controller")
    // console.log(req.body);
    if (!req.body || !req.body.title) {
        return next(createError(404, "Title is required!"));
    }
    await connectToDB();
    const newTodo = new Todo({ title: req.body.title, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
}