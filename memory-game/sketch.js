let cards = ["🤖", "👾", "👽️", "👻", "🤡", "🧛‍♂️", "🧟‍♂️", "🧟‍♀️"];
let NUM_COLS = 4;
let NUM_ROWS = 4;
let board = [];
let flippedTiles = [];
let twoCardsFlipped = false;

function setup() {
  createCanvas(600, 700);
  textSize(50);
  textAlign(CENTER, CENTER);
  board = createBoard();
}

function draw() {
  background(255, 255, 255);

  board.forEach((tile) => {
    drawTile(tile);
  });
}

function createBoard() {
  const board = [];
  const tileSize = 120;
  const startX = 60;
  const startY = 60;

  // Create pairs of cards
  let cardPairs = [...cards, ...cards];

  // Shuffle the cards
  cardPairs.sort(() => Math.random() - 0.5);

  // Create tiles with positions
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      const x = startX + col * (tileSize + 20);
      const y = startY + row * (tileSize + 20);
      const cardIndex = row * NUM_COLS + col;

      board.push(createTile(x, y, cardPairs[cardIndex]));
    }
  }

  return board;
}

function createTile(x, y, face) {
  return {
    x: x,
    y: y,
    size: 120,
    face: face,
    isFaceUp: false,
    isMatched: false,
  };
}

function drawTile(tile) {
  strokeWeight(2);
  if (tile.isMatched) {
    fill(200, 255, 200); // Light green for matched tiles
  } else {
    fill(255);
  }
  rect(tile.x, tile.y, tile.size, tile.size, 10);
  if (tile.isFaceUp) {
    text(tile.face, tile.x + tile.size / 2, tile.y + tile.size / 2);
  }
}

function mouseClicked() {
  let result;

  if (twoCardsFlipped) {
    result = resetUnmatchedTiles(board);
  } else {
    result = checkTiles(board, flippedTiles, mouseX, mouseY);
  }

  flippedTiles = result.flippedTiles;
  twoCardsFlipped = result.twoCardsFlipped;
}

function isUnderMouse(tile, mouseX, mouseY) {
  return (
    mouseX > tile.x &&
    mouseX < tile.x + tile.size &&
    mouseY > tile.y &&
    mouseY < tile.y + tile.size
  );
}

function resetUnmatchedTiles(board) {
  // Check if the two flipped tiles match
  const [tile1, tile2] = flippedTiles;
  if (tile1.face !== tile2.face) {
    // If they don't match, flip them back
    tile1.isFaceUp = false;
    tile2.isFaceUp = false;
  } else {
    // If they match, mark them as matched
    tile1.isMatched = true;
    tile2.isMatched = true;
  }

  return {
    flippedTiles: [],
    twoCardsFlipped: false,
  };
}

function checkTiles(board, flippedTiles, mouseX, mouseY) {
  // Find the clicked tile
  const clickedTile = board.find(
    (tile) =>
      isUnderMouse(tile, mouseX, mouseY) && !tile.isFaceUp && !tile.isMatched
  );

  if (!clickedTile) {
    return { flippedTiles, twoCardsFlipped: false };
  }

  // Flip the clicked tile
  clickedTile.isFaceUp = true;
  flippedTiles.push(clickedTile);

  // Check if two cards are now flipped
  const twoCardsFlipped = flippedTiles.length === 2;

  return {
    flippedTiles,
    twoCardsFlipped,
  };
}

module.exports = {
  createBoard,
  createTile,
  isUnderMouse,
  resetUnmatchedTiles,
  checkTiles,
};
