export interface Todo {
    content: string,
    completed: boolean,
}

export interface TodoList {
    title: string,
    todos: Todo[],
    color: string,
}

