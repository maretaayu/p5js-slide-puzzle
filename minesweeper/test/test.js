const chai = require("chai");
const expect = chai.expect;

const {
    createBoard,
    createTile,
    placeBees,
    countBees,
    reveal,
    floodFill,
    gameOver,
    isUnderMouse,
} = require("../sketch");

describe("Minesweeper", function () {
    describe("createBoard", function () {
        it("should create a 2D array with given dimensions", function () {
            let arrBoard = createBoard(2, 2);
            expect(arrBoard.length).to.equal(2);
            expect(arrBoard[0].length).to.equal(2);
        });
    });

    describe("createTile", function () {
        it("should create a tile with correct properties", function () {
            let tile = createTile(1, 1, 40);
            expect(tile).to.have.property("i", 1);
            expect(tile).to.have.property("j", 1);
            expect(tile).to.have.property("x", 40);
            expect(tile).to.have.property("y", 40);
            expect(tile).to.have.property("w", 40);
            expect(tile).to.have.property("neighborCount", 0);
            expect(tile).to.have.property("bee", false);
            expect(tile).to.have.property("revealed", false);
        });
    });

    describe("placeBees", function () {
        it("should place the correct number of bees", function () {
            let board = [
                [
                    {
                        i: 0,
                        j: 0,
                        x: 0,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 1,
                        x: 0,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 2,
                        x: 0,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 3,
                        x: 0,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 1,
                        j: 0,
                        x: 40,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 1,
                        x: 40,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 2,
                        x: 40,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 3,
                        x: 40,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 2,
                        j: 0,
                        x: 80,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 1,
                        x: 80,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 2,
                        x: 80,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 3,
                        x: 80,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 3,
                        j: 0,
                        x: 120,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 1,
                        x: 120,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 2,
                        x: 120,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 3,
                        x: 120,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
            ];

            board = placeBees(board, 3, 4, 4);

            let beeCount = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j].bee) {
                        beeCount++;
                    }
                }
            }
            expect(beeCount).to.equal(3);
        });
    });

    describe("countBees", function () {
        it("should correctly count the number of neighboring bees", function () {
            let board = [
                [
                    {
                        i: 0,
                        j: 0,
                        x: 0,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 1,
                        x: 0,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 2,
                        x: 0,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 3,
                        x: 0,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 1,
                        j: 0,
                        x: 40,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 1,
                        x: 40,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 2,
                        x: 40,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 3,
                        x: 40,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 2,
                        j: 0,
                        x: 80,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 1,
                        x: 80,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 2,
                        x: 80,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 3,
                        x: 80,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 3,
                        j: 0,
                        x: 120,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 1,
                        x: 120,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 2,
                        x: 120,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 3,
                        x: 120,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
            ];

            board[0][0].bee = true;
            board[2][2].bee = true;
            countBees(board, board[1][1]);
            expect(board[1][1].neighborCount).to.equal(2);
        });
    });

    describe("reveal", function () {
        it("should reveal a tile", function () {
            let tile = {
                i: 0,
                j: 0,
                x: 0,
                y: 0,
                w: 40,
                neighborCount: 1,
                bee: false,
                revealed: false,
            };

            reveal(tile);
            expect(tile.revealed).to.be.true;
        });
    });

    describe("gameOver", function () {
        it("should reveal all tiles", function () {
            let board = [
                [
                    {
                        i: 0,
                        j: 0,
                        x: 0,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 1,
                        x: 0,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 2,
                        x: 0,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 0,
                        j: 3,
                        x: 0,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 1,
                        j: 0,
                        x: 40,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 1,
                        x: 40,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 2,
                        x: 40,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 1,
                        j: 3,
                        x: 40,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 2,
                        j: 0,
                        x: 80,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 1,
                        x: 80,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 2,
                        x: 80,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 2,
                        j: 3,
                        x: 80,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
                [
                    {
                        i: 3,
                        j: 0,
                        x: 120,
                        y: 0,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 1,
                        x: 120,
                        y: 40,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 2,
                        x: 120,
                        y: 80,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                    {
                        i: 3,
                        j: 3,
                        x: 120,
                        y: 120,
                        w: 40,
                        neighborCount: 0,
                        bee: false,
                        revealed: false,
                    },
                ],
            ];

            board = placeBees(board, 3, 4, 4);
            gameOver(board);
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    expect(board[i][j].revealed).to.be.true;
                }
            }
        });
    });

    describe("isUnderMouse", function () {
        it("should return true if coordinates are within tile", function () {
            let tile = createTile(1, 1, 40);
            expect(isUnderMouse(tile, 45, 45)).to.be.true;
        });

        it("should return false if coordinates are outside tile", function () {
            let tile = createTile(1, 1, 40);
            expect(isUnderMouse(tile, 85, 85)).to.be.false;
        });
    });
});
