<script lang="ts">
    import Fab, { Icon } from "@smui/fab";
    import type { FABButtons } from "src/types/FAB.types";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let icon: string;
    export let buttons: FABButtons[] | undefined = undefined;
    export let open: boolean = false;
    export let openVelocity: number = 50;
    const sleep: (number) => Promise<void> = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));
    let buttonsOpen: boolean[] = buttons?.map(() => open);
    $: {
        (async () => {
            for (let i = 0; i < buttons.length; i++) {
                const index = !open ? i : buttons.length - i - 1;
                buttonsOpen[index] = open;
                await sleep(openVelocity);
            }
        })();
    }
    const onClick: () => void = () => {
        dispatch("click");
    };
</script>

<div class="fab-wrapper">
    <Fab color="primary" on:click={onClick}>
        <Icon class="material-icons">{icon}</Icon>
    </Fab>
    {#if buttons?.length}
        <div class="buttons-wrapper" class:open>
            <ul>
                {#each buttons as button, i}
                    <li>
                        <Fab
                            color="secondary"
                            mini
                            touch
                            exited={!buttonsOpen[i]}
                            on:click={button.action}
                        >
                            <Icon class="material-icons">{button.icon}</Icon>
                        </Fab>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style>
    .fab-wrapper {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }
    .buttons-wrapper {
        position: absolute;
        bottom: 100%;
        width: 100%;
        margin-bottom: 1rem;
        pointer-events: none;
    }
    .buttons-wrapper.open {
        pointer-events: all;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    ul > * + * {
        margin-top: 1rem;
    }
</style>
