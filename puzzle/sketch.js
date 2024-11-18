let cols = 4;
let rows = 4;
let w, h;
let board = [];

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  board = [...Array(cols * rows - 1).keys(), -1];
  shuffleBoard(board);
}

function draw() {
  background(0);

  for (let i = 0; i < cols * rows; i++) {
    let x = (i % cols) * w;
    let y = Math.floor(i / cols) * h;
    let tileValue = board[i];
    if (tileValue > -1) {
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(tileValue + 1, x + w / 2, y + h / 2);
    }
    // strokeWeight(2);
    // stroke(255);
    noFill();
    rect(x, y, w, h);
  }
}

function shuffleBoard(arr) {
  // Melakukan random swap sebanyak 1000 kali untuk mengacak board
  for (let i = 0; i < 1000; i++) {
    let blank = arr.indexOf(-1);
    let blankCol = blank % cols;
    let blankRow = Math.floor(blank / rows);

    // Mendapatkan kemungkinan gerakan yang valid
    let possibleMoves = [];

    // Cek atas
    if (blankRow > 0) {
      possibleMoves.push(blank - cols);
    }
    // Cek bawah
    if (blankRow < rows - 1) {
      possibleMoves.push(blank + cols);
    }
    // Cek kiri
    if (blankCol > 0) {
      possibleMoves.push(blank - 1);
    }
    // Cek kanan
    if (blankCol < cols - 1) {
      possibleMoves.push(blank + 1);
    }

    // Pilih salah satu gerakan secara random
    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    swap(blank, move, arr);
  }
  return arr;
}

function mousePressed() {
  moveTile(Math.floor(mouseX / w), Math.floor(mouseY / h), board);
}

function moveTile(i, j, arrBoard) {
  let blank = arrBoard.indexOf(-1);
  let blankCol = blank % cols;
  let blankRow = Math.floor(blank / rows);

  if (checkBlank(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arrBoard);
  }
}

function checkBlank(i, j, x, y) {
  // Mengecek apakah tile yang diklik bersebelahan dengan tile kosong
  // Tile harus bersebelahan secara horizontal atau vertikal (tidak diagonal)
  return (
    (Math.abs(i - x) === 1 && j === y) || // Bersebelahan horizontal
    (Math.abs(j - y) === 1 && i === x) // Bersebelahan vertikal
  );
}

function swap(i, j, arr) {
  // Menukar posisi dua tile
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function checkWin() {
  // Mengecek apakah puzzle sudah selesai
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i) {
      return false;
    }
  }
  return board[board.length - 1] === -1;
}

module.exports = {
  moveTile,
  shuffleBoard,
  checkBlank,
  swap,
};
