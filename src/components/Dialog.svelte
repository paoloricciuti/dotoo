<script lang="ts">
    import { Dialog } from "attractions";
    import mediaQuery from "../stores/mediaquerystore";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const match = mediaQuery?.("(min-width: 25rem)");
    export let open: boolean;
    export let width: `${number}vw` = "50vw";
    export let mWidth: `${number}vw` = "90vw";
    export let title: string;
    const handleClose = (action) => () => {
        dispatch(action);
    };
</script>

<div
    style={`--width: ${$match ? width : mWidth}`}
    class="dialog-wrapper"
    class:open
>
    <Dialog closeCallback={handleClose("cancel")} {title}>
        <slot />
    </Dialog>
</div>

<style lang="scss">
    @use "theme.scss";
    .dialog-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: var(--width, 50vw);
        pointer-events: none;
        transition: transform 250ms;
        border-radius: theme.$dialog-radius;
    }
    .dialog-wrapper.open {
        transform: translate(-50%, -50%) scale(1);
        pointer-events: all;
        box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 0.3);
    }
</style>
