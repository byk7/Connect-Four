/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let HEIGHT = 6; //y
let WIDTH = 7;  //x

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  

/** makeBoard: create in-JS board structure:
 */
// TODO: set "board" to empty HEIGHT x WIDTH matrix array (board[y][x])

function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {              
		board[y] = [];                        		
		for (let x = 0; x < WIDTH; x++) {           
			board[y][x] = null;						
		}
	}
};


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById('board');
	// TODO: add comment for this code
	/* This code creates a top row called 'column-top' with a 'click' event. 
	The 'column-top' row has 7 appended cells and are then appended to the htmlBoard. 
	When any of the 7 cells are clicked, the function will execute the 'handleClick' function*/
	let top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (let x = 0; x < WIDTH; x++) {						
		const topCell = document.createElement('td');
		topCell.setAttribute('id', x);
		top.append(topCell);
	}
	htmlBoard.append(top);

	// TODO: add comment for this code
	/* This code creates a grid of 6 rows and 7 appended cells in each row. 
	Each cell has an ID based on its position on the grid. Each row is appended to the htmlBoard.*/

	for (let y = 0; y < HEIGHT; y++) {					
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {				
			const cell = document.createElement('td');	
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}

	/* This code allows the players to see their respective colors change when hovering and/or clicking on the topCells*/

	let topCells = top.querySelectorAll('td');
	for (let cell of topCells) {
		cell.addEventListener('mouseover', event => {
			currPlayer === 1 ? (event.target.style.background = 'blue') : (event.target.style.background = 'red');
		});
	}

	for (let cell of topCells) {
		cell.addEventListener('mouseout', event => {
			event.target.style.background = '';
		});
	}

	for (let cell of topCells) {
		cell.addEventListener('click', event => {
			currPlayer === 1 ? (event.target.style.background = 'blue') : (event.target.style.background = 'red');
		});
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {										
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div');

	currPlayer === 1 ? piece.setAttribute('class', 'p1 piece') : piece.setAttribute('class', 'p2 piece');
	document.getElementById(`${y}-${x}`).append(piece);
}


/** handleClick: handle click of column top to add piece to the board */

function handleClick(event) {
	// get x from ID of clicked cell
	let x = +event.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}
	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;

	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	// const noNulls = (array) => array.every((value) => value.every((value) => value !== null));
	// if (noNulls(board)) endGame("It's a draw!");
	
	if (board.every(row => row.every(cell => cell))) {
		return endGame('It is a tie!');
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2

	currPlayer = currPlayer === 1 ? 2 : 1;
	
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you. 
/** Create the conditions for win when there are four consecutive pieces horizontally, vertically, diagonally to the right, and diagonally to the left */

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	alert(msg);
	replay();
	document.getElementById('column-top').innerHTML = '';
}


function replay() {
	const btn = document.createElement('button');
	btn.innerText = 'Play Again?';
	btn.setAttribute('class', 'replay');
	btn.addEventListener('click', function() {
		document.getElementById('board').innerHTML = '';
		makeBoard();
		makeHtmlBoard();
		btn.remove();
	});
	document.querySelector('body').append(btn);
}

makeBoard();
makeHtmlBoard();
