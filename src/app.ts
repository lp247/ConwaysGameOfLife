import {runGameLoop} from "./run.js";
import {setupGrid} from "./setup.js";

export const app = () => {
    try {
        const body = document.querySelector("body");
        if (!body) {
            throw new Error("No body element found!");
        }
        runGameLoop(body, setupGrid(body));
    } catch (error) {
        console.error(`There was an error: ${error}`);
    }
};

window.onload = app;
