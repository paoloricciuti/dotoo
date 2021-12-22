<script lang="ts">
    import type { FABButtons } from "src/types/FAB.types";
    import { Button } from "attractions";
    import { createEventDispatcher } from "svelte";
    import Icon from "./Icon.svelte";

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
    <Button on:click={onClick} filled round><Icon {icon} /></Button>
    {#if buttons?.length}
        <div class="buttons-wrapper" class:open>
            <ul>
                {#each buttons as button, i}
                    <li class={`sub-btn ${buttonsOpen[i] ? "open" : ""}`}>
                        <Button outline round small on:click={button.action}>
                            <Icon icon={button.icon} />
                        </Button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style lang="scss">
    @use "theme.scss";
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
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .sub-btn {
        transform: scale(0);
        transition: transform 250ms;
        background: theme.$main-text;
        border-radius: theme.$button-radius;
    }
    .sub-btn.open {
        transform: scale(1);
    }
</style>
