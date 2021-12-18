<script lang="ts">
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let open;
    let todoListName = "";
    const handleClose = (action) => () => {
        dispatch(action, todoListName);
        todoListName = "";
    };
</script>

<Dialog bind:open on:SMUIDialog:closed={handleClose("cancel")}>
    <Title>Add list</Title>
    <Content>
        <div class="content">
            <Textfield
                variant="outlined"
                bind:value={todoListName}
                label="List Name"
            />
        </div>
    </Content>
    <Actions>
        <Button color="secondary" on:click={handleClose("cancel")}>
            <Label>Cancel</Label>
        </Button>
        <Button color="secondary" on:click={handleClose("ok")}>
            <Label>Add</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    .content {
        padding-top: 1rem;
    }
</style>
