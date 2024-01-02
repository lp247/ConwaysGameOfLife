import {createGenerationSequencer} from "./GenerationSequencer.js";
import {random} from "./distributors.js";
import {renderGrid} from "./rendering.js";
import {generateGrid, determineGridSize} from "./utils.js";

const UPDATE_INTERVAL = 100;
const PERCENTAGE_ALIVE = 0.5;

export const app = () => {
    try {
        const body = document.querySelector("body");
        if (!body) {
            throw new Error("No body element found!");
        }
        const {clientWidth, clientHeight} = document.documentElement;
        const initialGrid = generateGrid(determineGridSize(clientWidth, clientHeight), random(PERCENTAGE_ALIVE));
        const genSequencer = createGenerationSequencer(initialGrid);
        setInterval(() => renderGrid(body, genSequencer.next()), UPDATE_INTERVAL);
    } catch (error) {
        console.error(`There was an error: ${error}`);
    }
};

window.onload = app;
