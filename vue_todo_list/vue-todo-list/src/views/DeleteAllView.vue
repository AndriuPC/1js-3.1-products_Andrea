<template>
    <div>
        <h2>Borrar las Tareas</h2>
        <p>Este proceso borrará TODAS las tareas, tanto hechas como no hechas.</p>
        <button @click="deleteAll">Borrar las tareas</button>
    </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()

async function deleteAll() {
    if (confirm('¿Seguro que quieres eliminar todas las tareas?')) {
        try {
            await todoStore.clearTodos()
            alert('Todas las tareas han sido borradas.')
        } catch (error) {
            alert('Error al borrar las tareas.')
            console.error(error)
        }
    }
}
</script>