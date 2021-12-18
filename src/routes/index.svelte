<script>
    import AddTodoDialog from "../components/AddTodoDialog.svelte";

    import FAB from "../components/FAB.svelte";
    import todos from "../stores/todostore";

    let menuOpen = false;
    let addTodoOpen = false;

    const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="container">
    {#each $todos as todo}
        <div>{todo.title}</div>
    {:else}
        <span>No todo lists yet...</span>
    {/each}
</div>
<AddTodoDialog
    open={addTodoOpen}
    on:cancel={() => {
        addTodoOpen = false;
    }}
    on:ok={({ detail: listName }) => {
        addTodoOpen = false;
        $todos = [
            ...$todos,
            {
                title: listName,
                color: "hsl(200,50%,70%)",
                todos: [],
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
            color: "indigo lighten-1",
            icon: "file_upload",
            action: () => {
                console.log("Hey");
            },
        },
        {
            color: "indigo lighten-1",
            icon: "file_download",
            action: () => {
                console.log("Hey");
            },
        },
        {
            color: "indigo lighten-1",
            icon: "add",
            action: () => {
                addTodoOpen = true;
            },
        },
    ]}
/>

<style>
    .container {
        padding: 1rem;
        display: grid;
        align-items: center;
    }
</style>
