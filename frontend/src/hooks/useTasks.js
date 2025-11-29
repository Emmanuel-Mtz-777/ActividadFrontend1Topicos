
import { useState, useEffect } from 'react';
import { getTasks } from '../services/Tasks.service';

export default function useTasks(refreshTrigger = 0) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
        setLoading(true);
        const tasksData = await getTasks();
        setTasks(tasksData);
        setError(null);
        } catch (err) {
        setError(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]); 

    return {
        tasks,
        loading,
        error,
        refreshTasks: fetchTasks
    };
}