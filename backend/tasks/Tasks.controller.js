export class TasksController {
    constructor(TaskModel) {
        this.taskModel = TaskModel;
    }
    createTask=async (req, res) => {
        try {
            
            const task = await this.taskModel.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating task' });
        }
    }
getTasks = async (req, res) => {
    try {
        const tasks = await this.taskModel.getTasks();
        res.status(200).json(tasks || []);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
}

    updateTask=async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const task = await this.taskModel.updateTask(id, body);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating task' });
        }
    }
    deleteTask=async (req, res) => {
        try {
            const { id } = req.params;
            const task = await this.taskModel.deleteTask(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting task' });
        }
    }
}