<script lang="ts">
    import { browser } from "$app/env";

    import Icon from "./Icon.svelte";
    let main;
    const observer = browser
        ? new IntersectionObserver(
              (entries: IntersectionObserverEntry[]) => {
                  const currentVisible = entries.find(
                      (entry) => entry.isIntersecting
                  )?.target;
                  console.log(currentVisible);
                  currentDisplayed = Array.from(
                      currentVisible?.parentElement?.querySelectorAll?.(
                          "article"
                      )
                  )?.findIndex?.((elem) => elem === currentVisible);
              },
              {
                  threshold: 1,
              }
          )
        : null;
    export let maxLenght = 0;
    let currentDisplayed = 0;
</script>

<main bind:this={main}>
    {currentDisplayed}
    {#if currentDisplayed !== 0}
        <button
            on:click={() => {
                main?.querySelector?.(
                    `article:nth-of-type(${currentDisplayed})`
                )?.scrollIntoView();
            }}
            class="left"><Icon icon="keyboard_arrow_left" /></button
        >
    {/if}
    <slot {observer} />
    {#if currentDisplayed !== maxLenght}
        <button
            on:click={() => {
                main?.querySelector?.(
                    `article:nth-of-type(${currentDisplayed + 2})`
                )?.scrollIntoView();
            }}
            class="right"><Icon icon="keyboard_arrow_right" /></button
        >
    {/if}
</main>

<style>
    main {
        display: grid;
        grid-template-rows: 1fr;
        grid-auto-columns: 95%;
        grid-auto-flow: column;
        overflow: auto;
        width: 100%;
        height: 100%;
        gap: 1rem;
        scroll-snap-stop: always;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        scroll-behavior: smooth;
        align-items: center;
        padding: 1rem;
    }
    main::-webkit-scrollbar {
        height: 0;
    }
    button {
        position: fixed;
        top: 10vh;
        bottom: 0;
        position: fixed;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent);
        outline: 0;
        border: 0;
    }
    .right {
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2));
    }
    .left {
        left: 0;
    }
</style>
