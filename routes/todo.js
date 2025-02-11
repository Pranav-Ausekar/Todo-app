import express from 'express'
import {
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    createTodo
} from '../Controllers/todo.js'
import { verifyToken } from '../utils/verify.js'

const router = express.Router()

// get all todos 
router.get('/', verifyToken, getAllTodos)

// get a specific todo with id 
router.get('/:id', verifyToken, getTodo)

// create a new todo 
router.post('/', verifyToken, createTodo)

// update a todo 
router.put('/:id', verifyToken, updateTodo)

// delete a todo 
router.delete("/:id", verifyToken, deleteTodo)






// get all todos 
// router.get('/', verifyToken, getAllTodos)

// get a specific todo with id 
// router.get('/:id', (req, res, next) => {
//     console.log(req.params.id)
//     res.send(`Get todo with id: ${req.params.id}`)
// })
// router.get('/:id', verifyToken, getTodo)

// create a new todo 
// router.post('/', (req, res, next) => {
//     const userData = req.body;
//     console.log(`User Data : ${JSON.stringify(userData)}`)

//     res.send(`UserData: ${JSON.stringify(userData)}`)
// res.send("Created new todo")
// you cannot simply use "send" method two times 
// })
// router.post('/', verifyToken, createTodo)

// update a todo 
// router.put("/:id", (req, res, next) => {
// console.log(req.params.id)
// res.send(req.params.id)
// const userId = req.params.id;       // get the id from url
// const userData = req.body;          //get data from request body
// console.log(`message: User ${userId} updated successfully`)
// console.log(`user data : ${JSON.stringify(userData)}`)
// res.send(`User ${userId} updated successfully, User Data ${JSON.stringify(userData)}`);
// })
// router.put('/:id', verifyToken, updateTodo)

// delete a todo 
// router.delete("/:id", (req, res, next) => {
// console.log(req.params.id)
//     const todoId = req.params.id;
//     console.log(`deleting a todo with id ${todoId}`)

//     res.send(`Deleted todo with id: ${todoId}`)
// })
// router.delete("/:id", verifyToken, deleteTodo)

export default router;