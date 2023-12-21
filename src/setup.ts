import {type Grid, type GridSize} from "./utils.js";

const PERCENTAGE_ALIVE = 0.5;

const getGreatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : getGreatestCommonDivisor(b, a % b));

const determineGridSize = (screenWidth: number, screenHeight: number): GridSize => {
    if (screenWidth === 0 || screenHeight === 0) {
        throw new Error("Screen width and height must be greater than 0!");
    }
    const gcd = getGreatestCommonDivisor(screenWidth, screenHeight);
    return {width: screenWidth / gcd, height: screenHeight / gcd};
};

interface DOMStringConverter {
    (grid: Grid): string;
    (cell: boolean): string;
}

const toDOMString: DOMStringConverter = (value) => {
    if (typeof value === "boolean") {
        return value ? `<div class="cell alive"></div>` : `<div class="cell"></div>`;
    }
    return value.map((row) => row.map((cell) => toDOMString(cell)).join("")).join("");
};

const generateInitialGrid = (size: GridSize, fill: (x: number, y: number) => boolean): Grid => {
    return (
        Array(size.height)
            .fill(Array(size.width).fill(false))
            // @ts-ignore
            .map((row, y) => row.map((_, x) => fill(x, y)))
    );
};

const randomLifeGenerator = (percentageAlive: number) => (): boolean => Math.random() < percentageAlive;

export const setupGrid = (container: HTMLElement) => {
    const {clientWidth, clientHeight} = document.documentElement;
    const gridSize = determineGridSize(clientWidth, clientHeight);
    console.log(`Grid size: ${gridSize.width}x${gridSize.height}`);
    container.style.setProperty("display", "grid");
    container.style.setProperty("grid-template-columns", `repeat(${gridSize.width}, 1fr)`);
    container.style.setProperty("grid-template-rows", `repeat(${gridSize.height}, 1fr)`);
    container.innerHTML = toDOMString(generateInitialGrid(gridSize, randomLifeGenerator(PERCENTAGE_ALIVE)));
    return gridSize;
};

if (import.meta.vitest) {
    describe("getGreatestCommonDivisor", () => {
        it("should return the correct GCD", () => {
            expect(getGreatestCommonDivisor(10, 5)).toBe(5);
            expect(getGreatestCommonDivisor(10, 3)).toBe(1);
            expect(getGreatestCommonDivisor(10, 0)).toBe(10);
            expect(getGreatestCommonDivisor(0, 10)).toBe(10);
            expect(getGreatestCommonDivisor(0, 0)).toBe(0);
            expect(getGreatestCommonDivisor(32, 24)).toBe(8);
        });
    });
    describe("determineGridSize", () => {
        it("should return the correct grid size", () => {
            expect(determineGridSize(10, 10)).toStrictEqual({width: 1, height: 1});
            expect(determineGridSize(10, 5)).toStrictEqual({width: 2, height: 1});
            expect(determineGridSize(5, 10)).toStrictEqual({width: 1, height: 2});
            expect(determineGridSize(32, 24)).toStrictEqual({width: 4, height: 3});
        });
        it("should throw an error if one dimension is 0", () => {
            expect(() => determineGridSize(0, 0)).toThrow();
            expect(() => determineGridSize(10, 0)).toThrow();
            expect(() => determineGridSize(0, 10)).toThrow();
        });
    });
    describe("toDOMString", () => {
        it("should generate DOM strings for alive cells correctly", () => {
            expect(toDOMString(true)).toBe(`<div class="cell alive"></div>`);
        });
        it("should generate DOM strings for dead cells correctly", () => {
            expect(toDOMString(false)).toBe(`<div class="cell"></div>`);
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
                    [false, false, false]
                ])
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
                    [true, true, true]
                ])
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
    describe("generateInitialGrid", () => {
        it("should generate a grid of the correct size", () => {
            expect(generateInitialGrid({width: 3, height: 3}, () => false)).toStrictEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ]);
            expect(generateInitialGrid({width: 3, height: 3}, () => true)).toStrictEqual([
                [true, true, true],
                [true, true, true],
                [true, true, true],
            ]);
            expect(generateInitialGrid({width: 3, height: 3}, (x, y) => x === y)).toStrictEqual([
                [true, false, false],
                [false, true, false],
                [false, false, true],
            ]);
        });
    });
    describe("randomLifeGenerator", () => {
        beforeAll(() => {
            vi.spyOn(Math, "random").mockReturnValue(0.5);
        });

        afterAll(() => {
            vi.restoreAllMocks();
        });

        it("should return true if random number is smaller than percentageAlive", () => {
            expect(randomLifeGenerator(0.6)()).toBe(true);
        });

        it("should return false if random number is greater than percentageAlive", () => {
            expect(randomLifeGenerator(0.4)()).toBe(false);
        });

        it("should return false if random number is equal to percentageAlive", () => {
            expect(randomLifeGenerator(0.5)()).toBe(false);
        });
    });
}
