import type {GridSize} from "./utils.js";

const RANDOM_THRESHOLD = 0.2;

const getGreatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : getGreatestCommonDivisor(b, a % b));

const determineGridSize = (): GridSize => {
    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;
    const gcd = getGreatestCommonDivisor(clientWidth, clientHeight);
    return {width: clientWidth / gcd, height: clientHeight / gcd};
};

const generateDomCellString = (alive: boolean): string => {
    if (alive) {
        return `<div class="cell alive"></div>`;
    }
    return `<div class="cell"></div>`;
}

const generateDomGrid = (element: HTMLElement, size: GridSize): void => {
    element.style.setProperty("display", "grid");
    element.style.setProperty("grid-template-columns", `repeat(${size.width}, 1fr)`);
    element.style.setProperty("grid-template-rows", `repeat(${size.height}, 1fr)`);
    element.innerHTML = Array(size.width * size.height).fill("").map(() => generateDomCellString(Math.random() > RANDOM_THRESHOLD)).join("");
};

export const setupGrid = (container: HTMLElement) => {
    const gridSize = determineGridSize();
    console.log(`Grid size: ${gridSize.width}x${gridSize.height}`);
    generateDomGrid(container, gridSize);
    return gridSize;
};
