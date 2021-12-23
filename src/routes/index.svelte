<script lang="ts">
    import AddTodoDialog from "../components/AddTodoDialog.svelte";
    import FAB from "../components/FAB.svelte";
    import TodoLists from "../components/TodoLists.svelte";
    import todos from "../stores/todostore";
    import { nanoid } from "nanoid";

    let menuOpen = false;
    let addTodoOpen = false;

    const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<TodoLists />
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
            action: () => {
                console.log("Hey");
            },
        },
        {
            icon: "file_download",
            action: () => {
                console.log("Hey");
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
