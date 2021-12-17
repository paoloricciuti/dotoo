<script lang="ts">
    import logo from "../assets/dotoo.svg";
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import theme from "../stores/themestore";

    const toggleTheme = () => {
        $theme = $theme === "light" ? "dark" : "light";
    };
</script>

<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <img src={logo} alt="logo" />
            <span>DoToo</span>
        </Section>
        <Section align="end" toolbar>
            <IconButton
                on:click={toggleTheme}
                class="material-icons"
                aria-label="Download"
            >
                {#if $theme === "light"}
                    brightness_4
                {:else}
                    brightness_5
                {/if}
            </IconButton>
        </Section>
    </Row>
</TopAppBar>

<style>
    img {
        max-height: 100%;
    }
    span {
        font-weight: bold;
    }
</style>
