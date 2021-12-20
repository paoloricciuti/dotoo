import { browser } from "$app/env";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

let mediaQuery: ((mediaQuery: string) => Writable<boolean>) | undefined;
if (browser) {
    mediaQuery = (mediaQuery: string) => {
        const result = window.matchMedia(mediaQuery);
        const retval = writable(result.matches);
        result.addEventListener("change", (e) => {
            console.log("changed");
            retval.update(() => e.matches);
        });
        return retval;
    };
}

export default mediaQuery;