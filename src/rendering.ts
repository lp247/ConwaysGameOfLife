import {Grid, getGridHeight, getGridWidth} from "./utils.js";

let gridReady = false;

const toDOMString = (value: boolean | Grid): string => {
    if (typeof value === "boolean") {
        return value ? '<div class="cell alive"></div>' : '<div class="cell"></div>';
    }
    return value.map((row) => row.map((cell) => toDOMString(cell)).join("")).join("");
};

const setupGrid = (container: HTMLElement, grid: Grid) => {
    container.style.setProperty("display", "grid");
    container.style.setProperty("grid-template-columns", `repeat(${getGridWidth(grid)}, 1fr)`);
    container.style.setProperty("grid-template-rows", `repeat(${getGridHeight(grid)}, 1fr)`);
    container.innerHTML = toDOMString(grid);
};

export const renderGrid = (container: HTMLElement, grid: Grid) => {
    if (!gridReady) {
        setupGrid(container, grid);
        gridReady = true;
    }
    for (let i = 0; i < getGridHeight(grid); i++) {
        for (let j = 0; j < getGridWidth(grid); j++) {
            const cell = container.children[i * getGridWidth(grid) + j] as HTMLElement;
            grid[i][j] ? cell.classList.add("alive") : cell.classList.remove("alive");
        }
    }
};

if (import.meta.vitest) {
    describe("toDOMString", () => {
        it("should generate DOM strings for alive cells correctly", () => {
            expect(toDOMString(true)).toBe('<div class="cell alive"></div>');
        });
        it("should generate DOM strings for dead cells correctly", () => {
            expect(toDOMString(false)).toBe('<div class="cell"></div>');
        });
        it("should generate DOM strings for grids of the correct size", () => {
            expect(
                toDOMString([
                    [false, false, false],
                    [true, false, false],
                    [false, false, false],
                ]),
            ).toBe(
                '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>',
            );
            expect(
                toDOMString([
                    [false, false, false],
                    [false, false, false],
                    [false, false, false],
                ]),
            ).toBe(
                '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>' +
                    '<div class="cell"></div>',
            );
            expect(
                toDOMString([
                    [true, true, true],
                    [true, true, true],
                    [true, true, true],
                ]),
            ).toBe(
                '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>' +
                    '<div class="cell alive"></div>',
            );
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
                style: {
                    setProperty: vi.fn(),
                },
            } as unknown as HTMLElement;
            renderGrid(container, grid);
            expect(container.style.setProperty).toHaveBeenCalledTimes(3);
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