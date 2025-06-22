<template>
  <div>
    <h2>Lista de Tareas</h2>

    <p v-if="todos.length === 0">No hay tareas</p>

    <ul v-else>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        @toggle="toggleTodo(index)"
        @delete="deleteTodo(index)"
      />
    </ul>
  </div>
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const { todos, toggleTodo, deleteTodo } = todoStore
</script>