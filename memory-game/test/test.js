const chai = require("chai");
const expect = chai.expect;

const {
    createBoard,
    createTile,
    isUnderMouse,
    resetUnmatchedTiles,
    checkTiles,
} = require("../sketch");

describe("Memory Game", function () {
    describe("createBoard", function () {
        const NUM_COLS = 4;
        const NUM_ROWS = 4;

        it("should create an array of tiles of the proper length", function () {
            const board = createBoard();
            expect(board).to.be.an("array");
            expect(board.length).to.equal(NUM_COLS * NUM_ROWS);
        });

        it("should create tiles with correct properties", function () {
            const board = createBoard();
            board.forEach((tile) => {
                expect(tile).to.have.all.keys(
                    "x",
                    "y",
                    "size",
                    "face",
                    "isFaceUp",
                    "isMatch"
                );
                expect(tile.isFaceUp).to.equal(false);
                expect(tile.isMatch).to.equal(false);
            });
        });

        it("should create matched pairs of tile faces", function () {
            const board = createBoard();
            const faces = board.map((tile) => tile.face);
            const uniqueFaces = [...new Set(faces)];
            uniqueFaces.forEach((face) => {
                const faceOccurrences = faces.filter((f) => f === face).length;
                expect(faceOccurrences).to.equal(2);
            });
        });
    });

    describe("createTile", function () {
        it("should return an object with correct properties", function () {
            const tile = createTile(10, 20, "🤖");
            expect(tile).to.have.property("x", 10);
            expect(tile).to.have.property("y", 20);
            expect(tile).to.have.property("face", "🤖");
            expect(tile).to.have.property("isFaceUp", false);
            expect(tile).to.have.property("isMatch", false);
        });

        it("should return an object with size 100", function () {
            const tile = createTile(10, 20, "🤖");
            expect(tile).to.have.property("size", 100);
        });

        it("should return different objects for different inputs", function () {
            const tile1 = createTile(10, 20, "🤖");
            const tile2 = createTile(30, 40, "👾");
            expect(tile1).to.not.deep.equal(tile2);
        });
    });

    describe("isUnderMouse", function () {
        it("should return true if mouse is over the tile", function () {
            const tile = createTile(10, 20, "🤖");
            expect(isUnderMouse(tile, 15, 25)).to.be.true;
        });

        it("should return false if mouse is not over the tile", function () {
            const tile = createTile(10, 20, "🤖");
            expect(isUnderMouse(tile, 200, 200)).to.be.false;
        });
    });

    describe("resetUnmatchedTiles", function () {
        it("should turn all unmatched cards face down", function () {
            const board = [
                { face: "🦋", isFaceUp: true, isMatch: false },
                { face: "👾", isFaceUp: true, isMatch: true },
                { face: "👽️", isFaceUp: true, isMatch: false },
            ];
            const result = resetUnmatchedTiles(board);
            for (const tile of board) {
                if (!tile.isMatch) {
                    expect(tile.isFaceUp).to.equal(false);
                }
            }
        });

        it("should not change matched tiles' state", function () {
            const board = [
                { face: "🤡", isFaceUp: true, isMatch: true },
                { face: "🤡", isFaceUp: true, isMatch: true },
                { face: "👽️", isFaceUp: false, isMatch: false },
            ];
            const result = resetUnmatchedTiles(board);
            for (const tile of board) {
                if (tile.isMatch) {
                    expect(tile.isFaceUp).to.equal(true);
                }
            }
        });
    });

    describe("checkTiles", function () {
        it("should flip a tile if clicked and less than two are flipped", function () {
            const board = [
                {
                    face: "🦋",
                    x: 10,
                    y: 10,
                    size: 100,
                    isFaceUp: false,
                    isMatch: false,
                },
                {
                    face: "👾",
                    x: 500,
                    y: 500,
                    size: 100,
                    isFaceUp: false,
                    isMatch: false,
                },
            ];
            const flippedTiles = [];
            const result = checkTiles(board, flippedTiles, 50, 50);

            expect(result.flippedTiles.length).to.equal(1);
            expect(result.flippedTiles[0].face).to.equal("🦋");
            expect(result.flippedTiles[0].isFaceUp).to.equal(true);
        });

        it("should leave the second flipped card up and mark both as matches if they share the same face", function () {
            const board = [
                {
                    face: "👽️",
                    x: 10,
                    y: 10,
                    size: 100,
                    isFaceUp: true,
                    isMatch: false,
                },
                {
                    face: "👽️",
                    x: 500,
                    y: 500,
                    size: 100,
                    isFaceUp: false,
                    isMatch: false,
                },
            ];
            const flippedTiles = [board[0]];
            const result = checkTiles(board, flippedTiles, 540, 540);

            expect(result.flippedTiles.length).to.equal(0);
            expect(board[0].isFaceUp).to.equal(true);
            expect(board[0].isMatch).to.equal(true);
            expect(board[1].isFaceUp).to.equal(true);
            expect(board[1].isMatch).to.equal(true);
        });
    });
});
