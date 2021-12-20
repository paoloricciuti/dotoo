<script lang="ts">
    import { Button } from "attractions";

    import logo from "../assets/dotoo.svg";
    import theme from "../stores/themestore";
    import Icon from "./Icon.svelte";

    const iconMapping = {
        light: "brightness_4",
        dark: "brightness_5",
    };

    const toggleTheme = () => {
        $theme = $theme === "light" ? "dark" : "light";
    };
</script>

<header>
    <img src={logo} alt="logo" />
    <span>DoToo</span>
    <div class="theme-toggler">
        <Button filled round on:click={toggleTheme}>
            <Icon icon={iconMapping[$theme]} />
        </Button>
    </div>
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
    .theme-toggler {
        justify-self: end;
        padding: 0 1rem;
    }
</style>
