<script lang="ts">
    export let icon: string;
    export let size: string = "24px";
</script>

<span style={`--size: ${size}`} class="material-icons">{icon}</span>

<style>
    span {
        font-size: var(--size);
    }
</style>
