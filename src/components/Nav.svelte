<script lang="ts">
    import { Button } from "attractions";

    import logo from "../assets/dotoo.svg";
    import Icon from "./Icon.svelte";
</script>

<header>
    <img src={logo} alt="logo" />
    <span>DoToo</span>
</header>

<style lang="scss">
    @use "theme.scss";
    header {
        background: theme.$main;
        height: 10vh;
        display: grid;
        grid-template-columns: min-content min-content 1fr;
        grid-template-rows: 100%;
        align-items: center;
        width: 100%;
    }
    img {
        max-height: 100%;
    }
    span {
        font-weight: bold;
        color: theme.$main-text;
    }
</style>
