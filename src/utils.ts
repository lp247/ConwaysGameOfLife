export type GridSize = {width: number; height: number};

export type Grid = Array<Array<boolean>>;

export const getGridHeight = (grid: Grid): number => grid.length;

export const getGridWidth = (grid: Grid): number => grid[0].length;

const getGreatestCommonDivisor = (a: number, b: number): number => (b === 0 ? a : getGreatestCommonDivisor(b, a % b));

export const determineGridSize = (screenWidth: number, screenHeight: number): GridSize => {
    if (screenWidth === 0 || screenHeight === 0) {
        throw new Error("Screen width and height must be greater than 0!");
    }
    const gcd = getGreatestCommonDivisor(screenWidth, screenHeight);
    return {width: screenWidth / gcd, height: screenHeight / gcd};
};

export const generateGrid = (size: GridSize, distributor: (x: number, y: number) => boolean): Grid => {
    return (Array(size.height).fill(Array(size.width).fill(false)) as Grid).map((row, y) => row.map((_, x) => distributor(x, y)));
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
    describe("generateInitialGrid", () => {
        it("should generate a grid of the correct size", () => {
            expect(generateGrid({width: 3, height: 3}, () => false)).toStrictEqual([
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ]);
            expect(generateGrid({width: 3, height: 3}, () => true)).toStrictEqual([
                [true, true, true],
                [true, true, true],
                [true, true, true],
            ]);
            expect(generateGrid({width: 3, height: 3}, (x, y) => x === y)).toStrictEqual([
                [true, false, false],
                [false, true, false],
                [false, false, true],
            ]);
        });
    });
}
