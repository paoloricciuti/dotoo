<main>
    <slot />
</main>

<style>
    main {
        display: grid;
        grid-template-rows: 1fr;
        grid-auto-columns: 80%;
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
</style>
