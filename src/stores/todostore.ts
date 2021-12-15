import { browser } from "$app/env";
import type { TodoList } from "src/types/todo.types";
import { writable } from "svelte/store";

const localTodos: TodoList[] = browser ? JSON.parse(localStorage.getItem("todos")) as TodoList[] || [] : [];
const todos = writable<TodoList[]>(localTodos);
if (browser) {
    todos.subscribe((newVal: TodoList[]) => localStorage.setItem("todos", JSON.stringify(newVal)));
}

export default todos;