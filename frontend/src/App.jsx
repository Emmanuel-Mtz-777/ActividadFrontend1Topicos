import './index.css'
import { TaskForm } from './components/TaskForm'
import { ViewTask } from './components/ViewTask'
import { useState } from 'react'

function App() {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Función para forzar el refresh de las tareas
  const refreshTasks = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <div className='w-full h-screen bg-black flex items-center justify-around'>
        <TaskForm 
          taskToEdit={taskToEdit} 
          setTaskToEdit={setTaskToEdit}
          refreshTasks={refreshTasks}
        />
        <ViewTask 
          setTaskToEdit={setTaskToEdit}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </>
  )
}

export default App