<script lang="ts">
    import logo from "../assets/dotoo.svg";
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
</script>

<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <img src={logo} alt="logo" />
            <span>DoToo</span>
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
