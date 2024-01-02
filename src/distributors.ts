export const random = (percentageAlive: number) => (): boolean => Math.random() < percentageAlive;

const patternGenerator = (pattern: [number, number][]) => (x: number, y: number) => pattern.some(([aliveX, aliveY]) => aliveX === x && aliveY === y);

export const gosperGliderGun = patternGenerator([
    [1, 5],
    [2, 5],
    [1, 6],
    [2, 6],
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 4],
    [12, 8],
    [13, 3],
    [13, 9],
    [14, 3],
    [14, 9],
    [15, 6],
    [16, 4],
    [16, 8],
    [17, 5],
    [17, 6],
    [17, 7],
    [18, 6],
    [21, 3],
    [21, 4],
    [21, 5],
    [22, 3],
    [22, 4],
    [22, 5],
    [23, 2],
    [23, 6],
    [25, 1],
    [25, 2],
    [25, 6],
    [25, 7],
    [35, 3],
    [35, 4],
    [36, 3],
    [36, 4],
]);

if (import.meta.vitest) {
    describe("randomLifeGenerator", () => {
        beforeAll(() => {
            vi.spyOn(Math, "random").mockReturnValue(0.5);
        });

        afterAll(() => {
            vi.restoreAllMocks();
        });

        it("should return true if random number is smaller than percentageAlive", () => {
            expect(random(0.6)()).toBe(true);
        });

        it("should return false if random number is greater than percentageAlive", () => {
            expect(random(0.4)()).toBe(false);
        });

        it("should return false if random number is equal to percentageAlive", () => {
            expect(random(0.5)()).toBe(false);
        });
    });
}
