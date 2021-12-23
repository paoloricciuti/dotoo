export interface Todo {
    id: string,
    content: string,
    completed: boolean,
    createdAt: Date,
}

export interface TodoList {
    id: string,
    title: string,
    todos: Todo[],
    createdAt: Date,
}

