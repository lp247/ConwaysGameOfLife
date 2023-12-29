import {getGridHeight, getGridWidth, type Grid} from "./utils.js";

const getAliveNeighboursOfCell = (grid: Grid, x: number, y: number): number => {
    let numAliveNeightbours = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if ((i === 0 && j === 0) || x + i < 0 || y + j < 0 || x + i >= getGridWidth(grid) || y + j >= getGridHeight(grid)) {
                continue;
            }
            numAliveNeightbours += grid[y + j][x + i] ? 1 : 0;
        }
    }
    return numAliveNeightbours;
};

const getGenerationSequencer = (initialState: Grid) => {
    let prevGen: Grid = [...initialState.map((row) => [...row])];
    let nextGen: Grid = [...initialState.map((row) => [...row])];

    return {
        next: (): Grid => {
            for (let i = 0; i < getGridHeight(prevGen); i++) {
                for (let j = 0; j < getGridWidth(prevGen); j++) {
                    const aliveNeighbours = getAliveNeighboursOfCell(prevGen, j, i);
                    nextGen[i][j] = aliveNeighbours === 3 || (prevGen[i][j] && aliveNeighbours === 2);
                }
            }
            // swap generations
            [prevGen, nextGen] = [nextGen, prevGen];
            return prevGen;
        },
    };
};

const render = (container: HTMLElement, grid: Grid) => {
    for (let i = 0; i < getGridHeight(grid); i++) {
        for (let j = 0; j < getGridWidth(grid); j++) {
            const cell = container.children[i * getGridWidth(grid) + j] as HTMLElement;
            grid[i][j] ? cell.classList.add("alive") : cell.classList.remove("alive");
        }
    }
};

const UPDATE_INTERVAL = 100;

export const runGameLoop = (container: HTMLElement, initialState: Grid) => {
    const genSequencer = getGenerationSequencer(initialState);
    setInterval(() => render(container, genSequencer.next()), UPDATE_INTERVAL);
};

if (import.meta.vitest) {
    describe("getAliveNeighboursOfCell", () => {
        it("should return the correct number of alive neighbours", () => {
            const grid = [
                [true, false, false],
                [false, true, true],
                [false, false, false],
            ];
            expect(getAliveNeighboursOfCell(grid, 0, 0)).toBe(1);
            expect(getAliveNeighboursOfCell(grid, 0, 1)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 0, 2)).toBe(1);
            expect(getAliveNeighboursOfCell(grid, 1, 0)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 1, 1)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 1, 2)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 2, 0)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 2, 1)).toBe(1);
            expect(getAliveNeighboursOfCell(grid, 2, 2)).toBe(2);
        });
    });
    describe("getGenerationSequencer", () => {
        it("should return the correct next generation", () => {
            const grid = [
                [true, true, false],
                [false, true, true],
                [false, false, false],
            ];
            const genSequencer = getGenerationSequencer(grid);
            expect(genSequencer.next()).toStrictEqual([
                [true, true, true],
                [true, true, true],
                [false, false, false],
            ]);
            expect(genSequencer.next()).toStrictEqual([
                [true, false, true],
                [true, false, true],
                [false, true, false],
            ]);
            expect(genSequencer.next()).toStrictEqual([
                [false, false, false],
                [true, false, true],
                [false, true, false],
            ]);
        });
    });
    describe("render", () => {
        it("should render the correct grid", () => {
            const grid = [
                [true, true, false, true],
                [false, true, true, false],
                [false, false, false, true],
            ];
            const container = {
                children: [
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                    {classList: {add: vi.fn(), remove: vi.fn()}},
                ],
            } as unknown as HTMLElement;
            render(container, grid);
            expect(container.children[0].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[0].classList.remove).not.toHaveBeenCalled();
            expect(container.children[1].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[1].classList.remove).not.toHaveBeenCalled();
            expect(container.children[2].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[2].classList.add).not.toHaveBeenCalled();
            expect(container.children[3].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[3].classList.remove).not.toHaveBeenCalled();
            expect(container.children[4].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[4].classList.add).not.toHaveBeenCalled();
            expect(container.children[5].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[5].classList.remove).not.toHaveBeenCalled();
            expect(container.children[6].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[6].classList.remove).not.toHaveBeenCalled();
            expect(container.children[7].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[7].classList.add).not.toHaveBeenCalled();
            expect(container.children[8].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[8].classList.add).not.toHaveBeenCalled();
            expect(container.children[9].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[9].classList.add).not.toHaveBeenCalled();
            expect(container.children[10].classList.remove).toHaveBeenCalledWith("alive");
            expect(container.children[10].classList.add).not.toHaveBeenCalled();
            expect(container.children[11].classList.add).toHaveBeenCalledWith("alive");
            expect(container.children[11].classList.remove).not.toHaveBeenCalled();
        });
    });
}
