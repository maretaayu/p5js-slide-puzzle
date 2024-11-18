const chai = require("chai");
const expect = chai.expect;

const { moveTile, shuffleBoard, checkBlank, swap } = require("../sketch");

describe("Slide Puzzle", function () {
    describe("shuffleBoard", function () {
        it("should return a shuffled array", function () {
            let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1];
            let shuffledArr = shuffleBoard([...arr]);
            expect(shuffledArr).to.not.deep.equal(arr);
        });
        it("should have one blank tile", function () {
            let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1];
            let shuffledArr = shuffleBoard([...arr]);
            expect(shuffledArr.filter((tile) => tile === -1).length).to.equal(1);
        });
    });

    describe("checkBlank", function () {
        it("should return true if tile can be moved", function () {
            expect(checkBlank(1, 1, 1, 2)).to.be.true;
            expect(checkBlank(1, 1, 2, 1)).to.be.true;
        });

        it("should return false if tile cannot be moved", function () {
            expect(checkBlank(1, 1, 2, 2)).to.be.false;
            expect(checkBlank(1, 1, 0, 0)).to.be.false;
        });
    });

    describe("swap", function () {
        it("should swap elements at given indices", function () {
            let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1];
            let swappedArr = swap(0, 9, [...arr]);
            expect(swappedArr[0]).to.equal(-1);
            expect(swappedArr[9]).to.equal(0);
        });
    });
});
