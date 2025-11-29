import { useState, useEffect } from "react";
import Logo from '../assets/img/taskFlow.jpg'
import { createTask } from "../services/Tasks.service";
import { updateTask } from "../services/Tasks.service";
import { Loader } from "./Loader";


export function TaskForm({ taskToEdit, setTaskToEdit, refreshTasks }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus]= useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setContent(taskToEdit.content);
      setStatus(taskToEdit.status || '');
    }
  }, [taskToEdit]);
  const savetask = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, {
          title,
          content,
          status,
        });
        setTaskToEdit(null);
      } else {
        await createTask({
          title,
          content,
          ...(status && { status })
        });
      }
      refreshTasks();
    } catch (err) {
      console.log("Error:", err);
    }
    setTitle('');
    setContent('');
    setStatus('');
    setSaving(false);
  };
  return (
    <div className="w-[300px] h-auto bg-black ml-5 rounded-lg shadow-md px-5 py-10 border border-gray-700">
      <form className="text-white" onSubmit={savetask}>
        <div className="flex justify-around items-center mb-4">
          <img src={Logo} alt="taskflow logo" className="w-15" />
          <h1 className="text-3xl mb-4 font-bold text-gray-300">TaskFlow</h1>
        </div>
        <input
          type="text"
          placeholder="Creme prro"
          className="p-3 w-full mb-2 rounded-md border border-gray-700"
          value={title}
          onChange={e => setTitle(e.target.value)}/>
        <textarea
          rows="3"
          placeholder="Describeme prro"
          className="p-3 w-full mb-2 rounded-md border border-gray-700 resize-none"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {taskToEdit && (
          <label className="mb-2 flex gap-2 items-center">
            <input
              type="radio"
              className="accent-slate-800"
              checked={status === "creada"}
              onChange={() => setStatus("creada")}
            />
            Creada
          </label>
        )}
        <label className="mb-2 flex gap-2 items-center">
          <input
            type="radio"
            className="accent-slate-800"
            checked={status === "pendiente"}
            onChange={() => setStatus("pendiente")}
          />
          Pendiente
        </label>

        <label className="mb-2 flex gap-2 items-center">
          <input
            type="radio"
            className="accent-slate-800"
            checked={status === "completada"}
            onChange={() => setStatus("completada")}
          />
          Completada
        </label>
        <button
          type="submit"
          className="bg-slate-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-2 w-full"
          disabled={saving}
        >
          {saving ? (
            <Loader size={30} color="#fff" />
          ) : (
            taskToEdit ? "Actualizar" : "Guardar"
          )}
        </button>
      </form>
    </div>
  );
}