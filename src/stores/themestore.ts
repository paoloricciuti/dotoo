import { writable } from "svelte/store";

const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
const settedTheme = window.localStorage.getItem("theme");
const theme = writable<string>(settedTheme || (preferDark.matches ? "dark" : "light"));
let firstTime = true;
theme.subscribe((val) => {
    if (firstTime) {
        firstTime = false;
        return;
    }
    window.localStorage.setItem("theme", val);
});

export default theme;