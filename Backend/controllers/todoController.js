const Todo = require('../models/Todo');

// POST /tasks: Add a new task
const addTask = async (req, res) => {
    const { name } = req.body;
    const user = req.user.id; // Extracted from the JWT middleware

    try {
        const newTask = new Todo({
            user,
            name,
        });

        await newTask.save();

        res.status(201).json({
            message: 'Task added successfully!',
            task: newTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// GET /tasks: Retrieve all tasks for a user
const getAllTasks = async (req, res) => {
    const user = req.user.id; // Extracted from the JWT middleware

    try {
        const tasks = await Todo.find({ user });

        res.status(200).json({
            message: 'Tasks retrieved successfully!',
            tasks,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// PUT /tasks/:id: Update a task by ID
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, complete } = req.body;
    const userId = req.user.id; // Extracted from the JWT middleware

    try {
        // Find the task and check ownership
        const task = await Todo.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to update this task' });
        }

        // Update the task
        task.name = name !== undefined ? name : task.name;
        task.complete = complete !== undefined ? complete : task.complete;

        const updatedTask = await task.save();

        res.status(200).json({
            message: 'Task updated successfully!',
            task: updatedTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// DELETE /tasks/:id: Delete a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Extracted from the JWT middleware

    try {
        // Find and delete the task if it belongs to the user
        const task = await Todo.findOneAndDelete({ _id: id, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        res.status(200).json({
            message: 'Task deleted successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    addTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
