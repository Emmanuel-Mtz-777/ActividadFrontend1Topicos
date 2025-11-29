const BASE_API_URL= 'http://localhost:3000/';

export async function getTasks() {
    try {
        const res = await fetch(`${BASE_API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error obteniendo las tareas:", error);
        return null;
    }
}

export async function createTask(task) {
    try {
        const res = await fetch(`${BASE_API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
        });

        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error creando la tarea:", error);
        return null; 
    }
}

export async function updateTask(id, updatedTask) {
    try {
        const res = await fetch(`${BASE_API_URL}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
        });

        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error actualizando la tarea:", error);
        return null; 
    }
}

export async function deleteTask(id) {
    try {
        const res = await fetch(`${BASE_API_URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error eliminando la tarea:", error);
        return null; 
    }
}   