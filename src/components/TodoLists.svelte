<script lang="ts">
    import { browser } from "$app/env";
    import todos from "../stores/todostore";
    import Icon from "./Icon.svelte";
    import TodoCard from "./TodoCard.svelte";

    let lists: TodoCard[] = [];
    const observer = browser
        ? new IntersectionObserver(
              (entries: IntersectionObserverEntry[]) => {
                  const currentVisible = entries.find(
                      (entry) => entry.isIntersecting
                  )?.target;
                  const index = lists.findIndex(
                      (todoCard) => todoCard?.getCard() === currentVisible
                  );
                  currentDisplayed = index !== -1 ? index : currentDisplayed;
              },
              {
                  threshold: 1,
              }
          )
        : null;
    $: {
        for (let todoCard of lists) {
            const element = todoCard?.getCard();
            if (element) {
                observer.observe(element);
            }
        }
    }
    $: maxLenght = $todos.length - 1;
    $: orderedTodos = $todos.sort(
        (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    let currentDisplayed = 0;
    const changeScroll = (e: WheelEvent) => {
        (e?.currentTarget as HTMLDivElement)?.scrollBy(e.deltaY, 0);
    };
</script>

<main on:wheel={changeScroll}>
    {#if currentDisplayed > 0}
        <button
            on:click={() => {
                lists[currentDisplayed - 1].getCard().scrollIntoView();
            }}
            class="left"><Icon icon="keyboard_arrow_left" /></button
        >
    {/if}
    {#if observer}
        {#each orderedTodos as todo, id}
            <TodoCard todoList={todo} bind:this={lists[id]} />
        {/each}
    {/if}
    {#if currentDisplayed < maxLenght}
        <button
            on:click={() => {
                lists[currentDisplayed + 1].getCard().scrollIntoView();
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
        z-index: 20;
    }
    .right {
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2));
    }
    .left {
        left: 0;
    }
</style>
