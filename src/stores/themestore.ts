import { browser } from "$app/env";
import { writable } from "svelte/store";

const preferDark = browser && window.matchMedia("(prefers-color-scheme: dark)");
const settedTheme = browser ? localStorage.getItem("theme") : "light";
const theme = writable<string>(settedTheme || (preferDark.matches ? "dark" : "light"));
let firstTime = true;
if (browser) {
    theme.subscribe((val) => {
        if (firstTime) {
            firstTime = false;
            return;
        }
        localStorage.setItem("theme", val);
    });
}

export default theme;