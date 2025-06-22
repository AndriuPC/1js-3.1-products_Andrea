<template>
  <li>
    <span v-if="todo.done"><del>{{ todo.title }}</del></span>
    <span v-else>{{ todo.title }}</span>

    <button @click="$emit('toggle')">
      {{ todo.done ? 'Desmarcar' : 'Marcar' }}
    </button>
    <button @click="$emit('delete')">
      Borrar
    </button>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>