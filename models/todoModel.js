import mongoose, { mongo } from "mongoose";
import User from "./userModel.js";

const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Must provide title."]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;