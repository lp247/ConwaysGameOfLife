import {createGenerationSequencer} from "./GenerationSequencer.js";
import {random} from "./distributors.js";
import {createEngine} from "./engine.js";
import {renderGrid} from "./rendering.js";
import {generateGrid, determineGridSize} from "./utils.js";

const PERCENTAGE_ALIVE = 0.5;

export const app = () => {
    try {
        const gridContainer = document.getElementById("grid");
        if (!gridContainer) {
            throw new Error("No grid container element found!");
        }
        const {clientWidth, clientHeight} = document.documentElement;
        const initialGrid = generateGrid(determineGridSize(clientWidth, clientHeight), random(PERCENTAGE_ALIVE));
        const genSequencer = createGenerationSequencer(initialGrid);
        const engine = createEngine(() => renderGrid(gridContainer, genSequencer.next()));
        engine.start();
    } catch (error) {
        console.error(`There was an error: ${error}`);
    }
};

window.onload = app;
