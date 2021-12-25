<script lang="ts">
    import type { MaterialIcon } from "src/types/materialicons.types";

    export let icon: MaterialIcon;
    export let size: string = "24px";
</script>

<span style={`--size: ${size}`} class="material-icons">{icon}</span>

<style>
    span {
        font-size: var(--size);
    }
</style>
