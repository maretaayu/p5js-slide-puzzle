let board;
let cols = 10;
let rows = 10;
let w = 40;
let totalBees = 10;

function setup() {
  createCanvas(400, 400);

  board = createBoard(cols, rows);
  board = placeBees(board, totalBees, cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      countBees(board, board[i][j]);
    }
  }
}

function createBoard(cols, rows) {
  let board = new Array(cols);
  for (let i = 0; i < cols; i++) {
    board[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      board[i][j] = createTile(i, j, w);
    }
  }
  return board;
}

function createTile(i, j, w) {
  return {
    x: i * w,
    y: j * w,
    w: w,
    i: i,
    j: j,
    bee: false,
    revealed: false,
    neighborCount: 0,
  };
}

function placeBees(board, totalBees, cols, rows) {
  let options = [];

  // Create array of all possible positions
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  // Randomly place bees
  for (let n = 0; n < totalBees; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];

    // Remove used position
    options.splice(index, 1);

    board[i][j].bee = true;
  }

  return board;
}

function countBees(board, tile) {
  if (tile.bee) {
    return;
  }

  let total = 0;

  // Count bees in all surrounding cells
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = tile.i + xoff;
      let j = tile.j + yoff;

      if (i >= 0 && i < cols && j >= 0 && j < rows) {
        if (board[i][j].bee) {
          total++;
        }
      }
    }
  }

  tile.neighborCount = total;
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      drawTile(board[i][j]);
    }
  }
}

function drawTile(tile) {
  stroke(0);
  noFill();
  rect(tile.x, tile.y, tile.w, tile.w);

  if (tile.revealed) {
    if (tile.bee) {
      drawBeeTile(tile);
    } else {
      drawNumberTile(tile);
    }
  }
}

function drawBeeTile(tile) {
  fill(125);
  ellipse(tile.x + tile.w * 0.5, tile.y + tile.w * 0.5, tile.w * 0.5);
}

function drawNumberTile(tile) {
  fill(200);
  rect(tile.x, tile.y, tile.w, tile.w);
  if (tile.neighborCount > 0) {
    textAlign(CENTER, CENTER);
    fill(0);
    text(tile.neighborCount, tile.x + tile.w * 0.5, tile.y + tile.w - 18);
  }
}

function reveal(tile) {
  tile.revealed = true;
  if (tile.neighborCount == 0) {
    floodFill(tile);
  }
}

function floodFill(tile) {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      let i = tile.i + xoff;
      let j = tile.j + yoff;

      if (i >= 0 && i < cols && j >= 0 && j < rows && !board[i][j].revealed) {
        reveal(board[i][j]);
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (isUnderMouse(board[i][j], mouseX, mouseY)) {
        reveal(board[i][j]);
        if (board[i][j].bee) {
          gameOver(board);
        }
      }
    }
  }
}

function isUnderMouse(tile, x, y) {
  return x > tile.x && x < tile.x + tile.w && y > tile.y && y < tile.y + tile.w;
}

function gameOver(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].revealed = true;
    }
  }
}

module.exports = {
  createBoard,
  createTile,
  placeBees,
  countBees,
  reveal,
  floodFill,
  gameOver,
  isUnderMouse,
};
