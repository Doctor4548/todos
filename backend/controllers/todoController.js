const todoModel = require('../Models/Todo.js');

const createTodo = async (req, res) => {
    const { title, content, id: authorId } = req.body;

    try {
        const newTodo = new todoModel({
            title,
            content,
            author: authorId
        });

        await newTodo.save();

        return res.status(201).json({
            message: 'Task created successfully',
            task: newTodo
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error while creating task',
            error: error.message
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const tasks = await todoModel.find({ author: req.body.id })
        return res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error while retrieving tasks',
            error: error.message
        });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTask = await todoModel.findById(id)

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }



        updatedTask.completed = !updatedTask.completed;

        await updatedTask.save();


        return res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error while updating task',
            error: error.message
        });
    }
};


const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await todoModel.findOneAndDelete({ _id: id, author: req.body.id });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        return res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error while deleting task',
            error: error.message
        });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
