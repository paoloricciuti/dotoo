import { writable } from "svelte/store";
import { onMount } from 'svelte';
let theme = writable<string>("light");
onMount(() => {
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
    const settedTheme = window.localStorage.getItem("theme");
    theme = writable<string>(settedTheme || (preferDark.matches ? "dark" : "light"));
    let firstTime = true;
    theme.subscribe((val) => {
        if (firstTime) {
            firstTime = false;
            return;
        }
        window.localStorage.setItem("theme", val);
    });
});

export default theme;