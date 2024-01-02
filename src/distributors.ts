export const random = (percentageAlive: number) => (): boolean => Math.random() < percentageAlive;

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