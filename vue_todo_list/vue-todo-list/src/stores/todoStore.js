import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/todos'


export const useTodoStore = defineStore('todo', () => {
    const todos = ref([])

    async function fetchTodos() {
        try {
            const res = await axios.get(API_URL)
            console.log('Tareas cargadas:', res.data) 
            todos.value = res.data
        } catch (error) {
            console.error('Error al cargar tareas:', error)
        }
    }

    // Añade una tarea nueva al servidor
    async function addTodo(todo) {
        try {
            const res = await axios.post(API_URL, todo)
            todos.value.push(res.data)
        } catch (error) {
            console.error('Error al añadir tarea:', error)
        }
    }

// toggleTodo ahora busca por ID en vez de índice
    async function toggleTodo(id) {
        const todo = todos.value.find(t => t.id === id)
        if (!todo) return

        try {
            const updatedTodo = { ...todo, done: !todo.done }
            await axios.put(`${API_URL}/${id}`, updatedTodo)
            // Actualiza localmente
            todo.done = updatedTodo.done
        } catch (error) {
            console.error('Error al actualizar tarea:', error)
        }
    }

    // Borra tarea por índice y actualiza en servidor
    async function deleteTodo(id) {
        const index = todos.value.findIndex(t => t.id === id)
        if (index === -1) return

        try {
            await axios.delete(`${API_URL}/${id}`)
            todos.value.splice(index, 1)
        } catch (error) {
            console.error('Error al borrar tarea:', error)
        }
    }

    // Borra todas las tareas del servidor y localmente
    async function clearTodos() {
        try {
            // json-server no permite borrar todos a la vez, borramos uno por uno
            await Promise.all(todos.value.map(todo => axios.delete(`${API_URL}/${todo.id}`)))
            todos.value = []
        } catch (error) {
            console.error('Error al borrar todas las tareas:', error)
        }
    }

    return {
        todos,
        fetchTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearTodos
    }
})