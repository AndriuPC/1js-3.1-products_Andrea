<template>
    <div>
        <h2>Añadir nueva tarea</h2>
        <p>Se añadirá la tarea a la lista y se marcará como NO hecha</p>
        <input v-model="newTodoText" type="text" placeholder="Título de la tarea" @keyup.enter="addTodo" />
        <button @click="addTodo">Añadir tarea</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from 'vue-router'

const newTodoText = ref('')
const todoStore = useTodoStore()
const router = useRouter()

async function addTodo() {
    const title = newTodoText.value.trim()
    if (title === '') {
        alert('Por favor, escribe un título para la tarea.')
        return
    }

    try {
        await todoStore.addTodo({
            title,
            done: false
        })
        newTodoText.value = ''
        router.push('/') // redirige a la página principal
    } catch (error) {
        alert('Error al añadir la tarea.')
        console.error(error)
    }
}
</script>