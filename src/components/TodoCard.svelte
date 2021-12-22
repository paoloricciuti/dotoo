<article>
    <slot />
</article>

<style>
    article {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        scroll-snap-align: center;
        display: grid;
        place-items: center;
    }
</style>
