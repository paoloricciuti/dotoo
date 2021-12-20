<script lang="ts">
    import Dialog from "../components/Dialog.svelte";
    import { Button, TextField } from "attractions";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let open: boolean;
    export let width: `${number}vw` = "50vw";
    export let mWidth: `${number}vw` = "90vw";
    let todoListName: string = "";
    let error: boolean = false;
    const handleClose = (action) => () => {
        dispatch(action, todoListName);
        todoListName = "";
        error = false;
    };
</script>

<Dialog
    on:cancel={handleClose("cancel")}
    {width}
    {mWidth}
    {open}
    title="Add list"
>
    <div>
        <TextField
            error={error && "List name can't be void"}
            outline
            bind:value={todoListName}
            on:input={() => {
                error = false;
            }}
            label="List Name"
        />
    </div>
    <div class="actions">
        <Button filled small on:click={handleClose("cancel")}>
            <div>Cancel</div>
        </Button>
        <Button
            filled
            small
            on:click={() => {
                if (!todoListName) {
                    error = true;
                    return;
                }
                handleClose("ok")();
            }}
        >
            <div>Add</div>
        </Button>
    </div>
</Dialog>

<style lang="scss">
    .actions {
        display: flex;
        justify-content: end;
        padding: 0.5rem 0;
        gap: 0.5rem;
    }
</style>
