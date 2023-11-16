import { checkIfNumbersAreEqual } from "../src/utils/utils";

describe("function checkIfNumbersAreEqual", function () {
    it("checkIfNumbersAreEqual true", function () {
        expect(checkIfNumbersAreEqual([1, 1, 1])).toBe(true);
    });

    it("checkIfNumbersAreEqual false", function () {
        expect(checkIfNumbersAreEqual([1, 2, 1])).toBe(false);
    });

    it("checkIfNumbersAreEqual true", function () {
        expect(checkIfNumbersAreEqual([-123])).toBe(true);
    });
});
