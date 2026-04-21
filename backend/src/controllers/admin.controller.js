import mongoose from "mongoose";
import User from "../models/User.js";
import Task from "../models/Task.js";


export const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const deleteUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid User ID' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user._id.toString() === req.user.id.toString()) {
            return res.status(400).json({ message: 'Admin cannot delete themselves' });
        }


        await Task.deleteMany({ userId: id });


        await user.deleteOne();

        res.json({ message: 'User and their associated tasks removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const getAllTasksAdmin = async (req, res) => {
    try {
        // Find all tasks and populate user details
        const tasks = await Task.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const deleteTaskAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Task ID' });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed by Admin' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a user's role (Admin only)
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private/Admin
export const updateUserRoleByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid User ID' });
        }

        // Validate the role string
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be user or admin' });
        }

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent admin from accidentally demoting themselves
        if (user._id.toString() === req.user.id.toString() && role === 'user') {
            return res.status(400).json({ message: 'Admin cannot demote themselves' });
        }

        user.role = role;
        await user.save();

        res.json({ message: `User role successfully updated to ${role}`, user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};