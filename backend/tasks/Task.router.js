import { Router } from "express";
import {TasksController} from "./Tasks.controller.js";

export const createTaskRouter = (TaskModel) => {
    const taskRouter = Router();
    const taskController = new TasksController(TaskModel);
    taskRouter.get('/', taskController.getTasks);
    taskRouter.post('/', taskController.createTask);
    taskRouter.put('/:id', taskController.updateTask);
    taskRouter.delete('/:id', taskController.deleteTask);

    return taskRouter;
}