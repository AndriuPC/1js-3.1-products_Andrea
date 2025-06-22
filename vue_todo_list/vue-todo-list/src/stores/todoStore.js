import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref([
        { title: 'Learn JavaScript', done: false },
        { title: 'Learn Vue', done: false },
        { title: 'Play around in JSFiddle', done: true },
        { title: 'Build something awesome', done: true }
    ])

    function toggleTodo(index) {
        todos.value[index].done = !todos.value[index].done
    }

    function deleteTodo(index) {
        todos.value.splice(index, 1)
    }

    function clearTodos() {
        todos.value = []
    }

    function addTodo(todo) {
        todos.value.push(todo)
    }

    return {
        todos,
        toggleTodo,
        deleteTodo,
        clearTodos
    }
})