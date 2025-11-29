import express from 'express';
import { createTaskRouter } from './tasks/Task.router.js';
import { TaskModel } from './tasks/task.model.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/', createTaskRouter(TaskModel));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});