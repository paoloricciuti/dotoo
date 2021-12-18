<script>
    import Nav from "../components/Nav.svelte";
    import theme from "../stores/themestore";
</script>

<svelte:head>
    <link rel="stylesheet" href={`/smui-${$theme}.css`} />
</svelte:head>
<Nav />
<slot />
