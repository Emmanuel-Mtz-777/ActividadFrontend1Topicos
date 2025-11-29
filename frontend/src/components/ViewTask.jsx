import useTasks from "../hooks/useTasks";
import Edit from './icons/Edit'
import Delete from './icons/Delete'
import { deleteTask } from "../services/Tasks.service";
import { Loader } from "./Loader";


export function ViewTask({ setTaskToEdit, refreshTrigger }) {
    const { tasks, loading, error, refreshTasks } = useTasks(refreshTrigger);
    if (loading) return <Loader />;
    if (error) return <p>Error: no se han podido cargar las tareas.</p>;
    const getColor = (status) => {
        switch (status) {
        case "creada": return "bg-gray-500";
        case "pendiente": return "bg-amber-500";
        case "completada": return "bg-green-500";
        default: return "bg-gray-500";
        }
    };
    const handleDelete = async (id) => {
        try {
        await deleteTask(id);
        refreshTasks();
    } catch (err) {
        console.error("Error deleting task:", err);
    }
    }
    return (
        <section className="w-2/3 h-9/11 border border-gray-700 rounded-lg text-white p-5">
        <div className="w-full flex justify-center border-b border-gray-700 py-3">
            <h2 className="text-3xl font-bold">Tasks</h2>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4 h-[calc(100vh-200px)] overflow-y-auto px-2">
            <div>
            <h3 className="text-lg font-bold mb-3 text-gray-300">Creadas</h3>
            {tasks.filter(t => t.status === "creada").map(task => (
                <div key={task._id} className="w-full border border-gray-800 rounded-md mb-4">
                <div className={`h-2 w-full rounded-t-md ${getColor(task.status)}`} />
                <div className="p-3">
                    <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setTaskToEdit(task)}><Edit /></button>
                        <button onClick={() => handleDelete(task._id)}><Delete /></button>
                    </div>
                    </div>
                    <p className="text-sm mt-2">{task.content}</p>
                </div>
                </div>
            ))}
            </div>
            <div>
            <h3 className="text-lg font-bold mb-3 text-gray-300">Pendientes</h3>
            {tasks.filter(t => t.status === "pendiente").map(task => (
                <div key={task.id} className="w-full border border-gray-800 rounded-md mb-4">
                <div className={`h-2 w-full rounded-t-md ${getColor(task.status)}`} />
                <div className="p-3">
                    <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setTaskToEdit(task)}><Edit /></button>
                        <button onClick={() => handleDelete(task._id)}><Delete /></button>
                    </div>
                    </div>
                    <p className="text-sm mt-2">{task.content}</p>
                </div>
                </div>
            ))}
            </div>
            <div>
            <h3 className="text-lg font-bold mb-3 text-gray-300">Completadas</h3>
            {tasks.filter(t => t.status === "completada").map(task => (
                <div key={task.id} className="w-full border border-gray-800 rounded-md mb-4">
                
                <div className={`h-2 w-full rounded-t-md ${getColor(task.status)}`} />
                <div className="p-3">
                    <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setTaskToEdit(task)}><Edit /></button>
                        <button onClick={() => handleDelete(task._id)}><Delete /></button>
                    </div>
                    </div>
                    <p className="text-sm mt-2">{task.content}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
