<script lang="ts">
    import AddTodoDialog from "../components/AddTodoDialog.svelte";
    import FAB from "../components/FAB.svelte";
    import TodoLists from "../components/TodoLists.svelte";
    import todos from "../stores/todostore";
    import { nanoid } from "nanoid";
    import Icon from "../components/Icon.svelte";
    import { loadFile, saveFile } from "../utils/utils";
    import type { TodoList } from "../types/todo.types";

    let menuOpen = false;
    let addTodoOpen = false;

    const toggleMenu = () => (menuOpen = !menuOpen);
    const loadTodos = async () => {
        try {
            const toLoad = await loadFile();
            const todosToLoad = JSON.parse(toLoad) as TodoList[];
            const alreadyPresentIds: string[] = $todos.map((elem) => elem.id);
            $todos = [
                ...$todos,
                ...todosToLoad.filter(
                    (elem: TodoList) => !alreadyPresentIds.includes(elem.id)
                ),
            ];
        } catch (e) {}
    };
</script>

{#if $todos.length > 0}
    <TodoLists />
{:else}
    <main>
        <Icon size="25vmin" icon="sentiment_very_dissatisfied" />
        No todo list yet...
    </main>
{/if}
<AddTodoDialog
    open={addTodoOpen}
    on:cancel={() => {
        addTodoOpen = false;
    }}
    on:ok={({ detail: listName }) => {
        addTodoOpen = false;
        menuOpen = false;
        $todos = [
            ...$todos,
            {
                id: nanoid(),
                title: listName,
                todos: [],
                createdAt: new Date(),
            },
        ];
    }}
/>
<FAB
    open={menuOpen}
    on:click={toggleMenu}
    icon="more_vert"
    openVelocity={50}
    buttons={[
        {
            icon: "local_cafe",
            action: () => {
                window.open("https://www.buymeacoffee.com/pablopang", "_blank");
            },
        },
        {
            icon: "file_upload",
            action: loadTodos,
        },
        {
            icon: "file_download",
            action: () => {
                saveFile($todos);
            },
        },
        {
            icon: "add",
            action: () => {
                addTodoOpen = true;
            },
        },
    ]}
/>

<style lang="scss">
    main {
        display: grid;
        grid-template-rows: min-content min-content;
        place-content: center;
        place-items: center;
        color: #999;
        font-size: 4vmin;
    }
</style>
