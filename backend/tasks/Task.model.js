import Mongo from '../db/Mongo.js';
import { Schema } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    status: { type: String, enum:['creada', 'pendiente', 'completada'], default: 'creada' }
}, { timestamps: true });

export const Task = Mongo.model('Task', TaskSchema);

export class TaskModel {
    static async createTask(data) {
        return await Task.create(data);
    }

    static async getTasks() {
        return await Task.find()
    }
    static async updateTask(id, data) {
        return await Task.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }
}
