<script>
    import FAB from "../components/FAB.svelte";
    import todos from "../stores/todostore";

    let menuOpen = false;

    const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="container">
    {#each $todos as todo}
        <div />
    {:else}
        <span>No todo lists yet...</span>
    {/each}
</div>

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
                console.log("Hey");
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
