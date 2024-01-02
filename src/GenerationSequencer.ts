import {getGridHeight, getGridWidth, type Grid} from "./utils.js";

const getAliveNeighboursOfCell = (grid: Grid, x: number, y: number): number => {
    let numAliveNeightbours = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!i && !j) {
                continue;
            }
            let px = x + i < 0 ? getGridWidth(grid) - 1 : x + i >= getGridWidth(grid) ? 0 : x + i;
            let py = y + j < 0 ? getGridHeight(grid) - 1 : y + j >= getGridHeight(grid) ? 0 : y + j;
            numAliveNeightbours += grid[py][px] ? 1 : 0;
        }
    }
    return numAliveNeightbours;
};

export const createGenerationSequencer = (initialState: Grid) => {
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

if (import.meta.vitest) {
    describe("getAliveNeighboursOfCell", () => {
        it("should return the correct number of alive neighbours", () => {
            const grid = [
                [true, false, false],
                [false, true, true],
                [false, false, false],
            ];
            expect(getAliveNeighboursOfCell(grid, 0, 0)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 0, 1)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 0, 2)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 1, 0)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 1, 1)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 1, 2)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 2, 0)).toBe(3);
            expect(getAliveNeighboursOfCell(grid, 2, 1)).toBe(2);
            expect(getAliveNeighboursOfCell(grid, 2, 2)).toBe(3);
        });
    });
    describe("getGenerationSequencer", () => {
        it("should return the correct next generation", () => {
            const grid = [
                [true, false, false, false],
                [false, true, true, false],
                [false, false, false, false],
                [false, true, false, false],
            ];
            const genSequencer = createGenerationSequencer(grid);
            expect(genSequencer.next()).toStrictEqual([
                [true, false, true, false],
                [false, true, false, false],
                [false, true, true, false],
                [false, false, false, false]
            ]);
            expect(genSequencer.next()).toStrictEqual([
                [false, true, false, false],
                [true, false, false, true],
                [false, true, true, false],
                [false, false, true, true]
            ]);
        });
    });
}
