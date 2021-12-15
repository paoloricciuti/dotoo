import type { TodoList } from "src/types/todo.types";
import { writable } from "svelte/store";
const localTodos: TodoList[] = JSON.parse(localStorage.getItem("todos")) as TodoList[] || [];
const todos = writable<TodoList[]>(localTodos);

todos.subscribe((newVal: TodoList[]) => localStorage.setItem("todos", JSON.stringify(newVal)));

export default todos;