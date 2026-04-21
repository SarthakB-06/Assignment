import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status :{
        type : String,
        enum : ['pending', 'in-progress', 'completed'],
        default : 'pending'
    },
    priority :{
        type : String,
        enum : ['low', 'medium', 'high'],
        default : 'medium'
    },
    userId :{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const Task = model('Task', taskSchema);

export default Task;