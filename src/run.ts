import type {Grid, GridSize} from "./utils.js";

const getCellDOMElement = (container: HTMLElement, gridSize: GridSize, x: number, y: number): HTMLElement => {
    const index = y * gridSize.width + x;
    return container.children[index] as HTMLElement;
}

const cellIsAlive = (container: HTMLElement, gridSize: GridSize, x: number, y: number): boolean => {
    return getCellDOMElement(container, gridSize, x, y).classList.contains("alive");
}

const getAliveNeighboursOfCell = (container: HTMLElement, gridSize: GridSize, x: number, y: number): number => {
    let numAliveNeightbours = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const neighbourX = x + i;
            const neighbourY = y + j;
            if (neighbourX < 0 || neighbourX >= gridSize.width || neighbourY < 0 || neighbourY >= gridSize.height) {
                continue;
            }
            if (cellIsAlive(container, gridSize, neighbourX, neighbourY)) {
                numAliveNeightbours++;
            }
        }
    }
    return numAliveNeightbours;
}

const determineNextStateOfCell = (container: HTMLElement, gridSize: GridSize, x: number, y: number): boolean => {
    const aliveNeighbours = getAliveNeighboursOfCell(container, gridSize, x, y);
    if (cellIsAlive(container, gridSize, x, y)) {
        return aliveNeighbours === 2 || aliveNeighbours === 3;
    } else {
        return aliveNeighbours === 3;
    }
}

const determineNextStateOfGrid = (container: HTMLElement, gridSize: GridSize) => {
    const nextGen = [];
    for (let i = 0; i < gridSize.height; i++) {
        const row = [];
        for (let j = 0; j < gridSize.width; j++) {
            row.push(determineNextStateOfCell(container, gridSize, j, i));
        }
        nextGen.push(row);
    }
    return nextGen;
}

const render = (container: HTMLElement, nextState: Grid) => {
    for (let i = 0; i < nextState.length; i++) {
        for (let j = 0; j < nextState[i].length; j++) {
            const cell = getCellDOMElement(container, {width: nextState[i].length, height: nextState.length}, j, i);
            if (nextState[i][j]) {
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }
        }
    }
}

const update = (container: HTMLElement, gridSize: GridSize) => {
    const nextState: Grid = determineNextStateOfGrid(container, gridSize);
    render(container, nextState);
};

const timeMeasuredUpdate = (container: HTMLElement, gridSize: GridSize) => {
    const start = performance.now();
    update(container, gridSize);
    const end = performance.now();
    console.log(`Execution took ${end - start}ms`);
}

const UPDATE_INTERVAL = 100;

export const runGameLoop = (container: HTMLElement, gridSize: GridSize) => {
    setInterval(timeMeasuredUpdate, UPDATE_INTERVAL, container, gridSize);
}
