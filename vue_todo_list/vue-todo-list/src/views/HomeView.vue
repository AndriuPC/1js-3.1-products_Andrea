<script setup>
import { ref, onMounted } from 'vue'
import TodoItem from '@/components/TodoItem.vue'

const todos = ref([])

async function fetchTodos() {
  const res = await fetch('http://localhost:3000/todos')
  todos.value = await res.json()
}

async function toggleDone(id, currentStatus) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !currentStatus })
  })
  fetchTodos()
}

async function deleteTodo(id) {
  if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
    await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }
}

onMounted(fetchTodos)
</script>

<template>
  <div>
    <h2>Lista de Tareas</h2>

    <p v-if="todos.length === 0">No hay tareas</p>

    <ul v-else>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleDone(todo.id, todo.done)"
        @delete="deleteTodo(todo.id)"
      />
    </ul>
  </div>
</template>