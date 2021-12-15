import type { TodoList } from "src/types/todo.types";
import { Writable, writable } from "svelte/store";
import { onMount } from 'svelte';
let todos: Writable<TodoList[]> = writable<TodoList[]>([]);
onMount(() => {
    const localTodos: TodoList[] = JSON.parse(localStorage.getItem("todos")) as TodoList[] || [];
    todos = writable<TodoList[]>(localTodos);
    todos.subscribe((newVal: TodoList[]) => localStorage.setItem("todos", JSON.stringify(newVal)));
});
export default todos;