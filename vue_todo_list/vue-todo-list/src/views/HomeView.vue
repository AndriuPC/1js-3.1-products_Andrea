<template>
  <div>
    <h2>Lista de Tareas</h2>

    <p v-if="todos.length === 0">No hay tareas</p>

    <ul v-else>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        @toggle="toggleDone(index)"
        @delete="deleteTodo(index)"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from '@/components/TodoItem.vue'

const todos = ref([
  { title: 'Learn JavaScript', done: false },
  { title: 'Learn Vue', done: false },
  { title: 'Play around in JSFiddle', done: true },
  { title: 'Build something awesome', done: true }
])

function toggleDone(index) {
  todos.value[index].done = !todos.value[index].done
}

function deleteTodo(index) {
  if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
    todos.value.splice(index, 1)
  }
}
</script>