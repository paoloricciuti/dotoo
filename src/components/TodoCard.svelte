<script lang="ts">
    import { Button, TextField } from "attractions";
    import type { TodoList } from "src/types/todo.types";
    import Icon from "./Icon.svelte";
    import todos from "../stores/todostore";
    import { nanoid } from "nanoid";

    export let todoList: TodoList;
    export const getCard: () => HTMLElement = () => {
        return card;
    };
    let card: HTMLElement;
    let todoToAdd = "";
    $: todosToShow = todoList.todos.sort(
        (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const setAllTodosTo = (value: boolean) => () => {
        $todos = [
            ...$todos.filter((elem) => elem.id !== todoList.id),
            {
                ...todoList,
                todos: todoList.todos.map((elem) => ({
                    ...elem,
                    completed: value,
                })),
            },
        ];
    };

    const deleteList = () => {
        $todos = [...$todos.filter((elem) => elem.id !== todoList.id)];
    };
    const deleteTodo = (todoId: string) => {
        $todos = [
            ...$todos.filter((elem) => elem.id !== todoList.id),
            {
                ...todoList,
                todos: [...todoList.todos.filter((elem) => elem.id !== todoId)],
            },
        ];
    };
    const toggleTodo = (todoId: string) => {
        const currentTodo = todoList.todos.find((elem) => elem.id === todoId);
        $todos = [
            ...$todos.filter((elem) => elem.id !== todoList.id),
            {
                ...todoList,
                todos: [
                    ...todoList.todos.filter((elem) => elem.id !== todoId),
                    {
                        ...currentTodo,
                        completed: !currentTodo.completed,
                    },
                ],
            },
        ];
    };
    const addTodo = () => {
        if (todoToAdd === "") return;
        $todos = [
            ...$todos.filter((elem) => elem.id !== todoList.id),
            {
                ...todoList,
                todos: [
                    ...todoList.todos,
                    {
                        id: nanoid(),
                        content: todoToAdd,
                        completed: false,
                        createdAt: new Date(),
                    },
                ],
            },
        ];
        todoToAdd = "";
    };
</script>

<article bind:this={card}>
    <h2>
        {todoList.title}
    </h2>
    <form on:submit|preventDefault={addTodo}>
        <TextField
            style="padding-right: 2.9rem;"
            bind:value={todoToAdd}
            outline
            label="Add TODO"
        />
        <div class="button-wrapper">
            <Button type="submit" round><Icon icon="send" /></Button>
        </div>
    </form>
    <section>
        <ul>
            {#each todosToShow as todo}
                <li
                    on:click={() => toggleTodo(todo.id)}
                    class:completed={todo.completed}
                >
                    <span>
                        {todo.content}
                    </span>
                    <button
                        on:click|stopPropagation={() => deleteTodo(todo.id)}
                    >
                        <Icon icon="close" />
                    </button>
                </li>
            {/each}
        </ul>
    </section>
    <div class="actions">
        <Button on:click={deleteList}
            ><Icon icon="delete" /><span class="btn-text"> Delete</span></Button
        >
        <Button on:click={setAllTodosTo(true)}
            ><Icon icon="check_box" /><span class="btn-text">
                Finish all</span
            ></Button
        >
        <Button on:click={setAllTodosTo(false)}
            ><Icon icon="check_box_outline_blank" /><span class="btn-text">
                Unfinish all</span
            ></Button
        >
    </div>
</article>

<style lang="scss">
    @use "theme.scss";
    article {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        scroll-snap-align: center;
        display: grid;
        grid-template-rows: min-content 1fr min-content;
        grid-template-columns: max-content 1fr;
        padding: 0.5rem 1rem;
        position: relative;
        overflow-y: auto;
        @media (max-width: 37.5rem) {
            grid-template-columns: 1fr;
            grid-template-rows: min-content min-content 1fr min-content;
        }
    }
    h2 {
        background-color: theme.$main;
        color: theme.$main-text;
        padding: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        margin: -0.5rem 1rem 1rem -1rem;
        place-self: start;
        font-size: 0.7rem;
    }
    form {
        position: relative;
        .button-wrapper {
            position: absolute;
            top: 0.65em;
            right: 0;
        }
    }
    section {
        grid-column: 1 / -1;
        padding: 1rem;
        overflow-y: auto;
        ul {
            list-style: none;
            li {
                position: relative;
                user-select: none;
                cursor: pointer;
                border-radius: 0.5rem 1rem 0.3rem 0.5rem;
                margin: 0.5rem 0;
                background: #01295f33;
                padding: 0.3rem;
                width: calc(100% - 24px);
                button {
                    border: 0;
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                    outline: 0;
                    background: transparent;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translate(100%, -50%);
                }
            }
            li > span {
                --height: 2px;
                background-image: linear-gradient(
                    90deg,
                    black 100%,
                    transparent 50%
                );
                background-size: 0% var(--height);
                background-position: center;
                background-position-x: right;
                background-repeat: no-repeat;
                transition: background-size 500ms;
            }
            li.completed {
                opacity: 0.5;
            }
            li.completed > span {
                background-size: 100% var(--height);
                background-position-x: left;
            }
        }
    }
    .actions {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-evenly;
        @media (max-width: 37.5rem) {
            .btn-text {
                display: none;
            }
        }
    }
</style>
