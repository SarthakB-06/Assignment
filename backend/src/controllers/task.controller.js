import mongoose from "mongoose";
import Task from "../models/Task.js";



export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        if(!title || !description){
            return res.status(400).json({ message: 'Task title and description are required' });
        }

        const task = new Task({
            title,
            description,
            status,
            priority,
            userId: req.user.id
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, priority, search } = req.query;

        const query = { userId: req.user.id };

        
        if(status) query.status = status;
        if(priority) query.priority = priority;

    
        if(search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        
        const skip = (parseInt(page) - 1) * parseInt(limit);

    
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 }) 
            .skip(skip)
            .limit(parseInt(limit));

        const totalTasks = await Task.countDocuments(query);

        res.json({
            tasks,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalTasks / parseInt(limit)),
            totalTasks
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Task ID' });
        }

    
        let task = await Task.findOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

    
        task = await Task.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true 
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Task ID' });
        }

        
        const task = await Task.findOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


