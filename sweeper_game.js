

/**
  TODO: -maybe have zero squares show blank instead of the literal zero
        -maybe ask for input on the size of the board, and automate the
          creation of the squares and arrays based on that number
          instead of hard-coding it in 
        -implement right-clicking to flag a bomb, and make
          it so that at the end of the game things like bomb
          locations, wrongly flagged squares, and such are indicated
        -there are probably more elegant ways to fill the board and
          to uncover all zero squares when clicked
        -implement a reload button at the end of the game to play again
*/


const e = React.createElement;


function Square(props) {
  /**
    Square is basically an object; it returns the most basic square in the game, and holds no information
    A "value" property is passed when a new Square is created by renderSquare()
  */
  return (
    e("button", {className: "square", onClick: props.onClick}, props.value)

    /**older JSX formatting
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    */

  );
}

class Board extends React.Component {
  /**
    Board is the actual game board, made up of Squares. It holds all the game information, which is to say
    a squares array, which holds the bomb positions and the number of bombs in the proximity of a square,
    and a squaresShow array, which is just an array of Booleans that indicate which squares have been
    revealed and which are still hidden.
    It has a handleClick() function which is passed to each Square when constructed.
  */

  constructor(props) {
    super(props);
    this.state = {
      /**
        The squares array is populated by an external function that fills it with the correct values.
        The squaresShow array is simply filled with false since all squares are hidden at the start.
      */
      squares: genBoard(64),
      squaresShow: Array(64).fill(false),
    };
  }

  handleClick(i) {
    /**
      handleClick() switches the value of squaresShow at the given index (i) to true; if the clicked square is
      a bomb, it fills the entire squaresShow to true
      It then updates the state of the Board.
    */
    const squares = this.state.squares.slice();
    let squaresShow = this.state.squaresShow.slice();
    const gap = Math.sqrt(squares.length);
    // if the game is over or the square has already been clicked, we can skip the logic.
    if (calculateWinner(squares, squaresShow) || squaresShow[i]) {
      return;
    }
    
    squaresShow[i] = true;
    if (squares[i] === "💣") {
      squaresShow.fill(true);
    }
    /**
      If we hit a square with no adjacent bombs, we want to automatically uncover all the adjacent squares;
      this has to happen for every "zero" square, so if there's a big patch of 0s everything must show at once.
      To implement this, we just use the look functions and call the handleClick workhorse.
      It's very important to also check in squaresShow if the square has already been uncovered and to update the
      squareShow within the Board's state;
      if we don't the function will loop 
    */
    if (squares[i] === 0){
      squaresShow = handleClickWH(i, squares, squaresShow);
    }
    
    this.setState({
      squaresShow: squaresShow,
    });
  }

  renderSquare(i) {
    /**
      This function returns a new Square, passing the handleClick function as its onClick property, and
      giving it a value depending on whether the square is uncovered: the value stored in the squares array
      if it is, or a question mark if the square is still hidden
    */
    return (
      e(Square, {
        value: this.state.squaresShow[i] ? this.state.squares[i] : "?",
        onClick: () => this.handleClick(i)}
      )
      /**older JSX formatting
      <Square
        value={this.state.squaresShow[i] ? this.state.squares[i] : "?"}
        onClick={() => this.handleClick(i)}
      />
      */
    );
  }

  render() {

    // These first lines handle the end-game message
    const outcome = calculateWinner(this.state.squares, this.state.squaresShow);
    let status;
    if (outcome) {
      status = `You ${outcome}!`;
    }

    // The actual rendering of the squares, hardcoded for an 8x8 board (TODO: automate and make dynamic?)
    return (
      e(
        "div",
        null,
        e(
          "div",
          {
            className: "status"
          },
          status
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(0),
          this.renderSquare(1),
          this.renderSquare(2),
          this.renderSquare(3),
          this.renderSquare(4),
          this.renderSquare(5),
          this.renderSquare(6),
          this.renderSquare(7)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(8),
          this.renderSquare(9),
          this.renderSquare(10),
          this.renderSquare(11),
          this.renderSquare(12),
          this.renderSquare(13),
          this.renderSquare(14),
          this.renderSquare(15)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(16),
          this.renderSquare(17),
          this.renderSquare(18),
          this.renderSquare(19),
          this.renderSquare(20),
          this.renderSquare(21),
          this.renderSquare(22),
          this.renderSquare(23)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(24),
          this.renderSquare(25),
          this.renderSquare(26),
          this.renderSquare(27),
          this.renderSquare(28),
          this.renderSquare(29),
          this.renderSquare(30),
          this.renderSquare(31)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(32),
          this.renderSquare(33),
          this.renderSquare(34),
          this.renderSquare(35),
          this.renderSquare(36),
          this.renderSquare(37),
          this.renderSquare(38),
          this.renderSquare(39)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(40),
          this.renderSquare(41),
          this.renderSquare(42),
          this.renderSquare(43),
          this.renderSquare(44),
          this.renderSquare(45),
          this.renderSquare(46),
          this.renderSquare(47)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(48),
          this.renderSquare(49),
          this.renderSquare(50),
          this.renderSquare(51),
          this.renderSquare(52),
          this.renderSquare(53),
          this.renderSquare(54),
          this.renderSquare(55)
        ),
        e(
          "div",
          {
            className: "board-row"
          },
          this.renderSquare(56),
          this.renderSquare(57),
          this.renderSquare(58),
          this.renderSquare(59),
          this.renderSquare(60),
          this.renderSquare(61),
          this.renderSquare(62),
          this.renderSquare(63)
        )
      )

      /**older JSX
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      */
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      e(
        "div",
        {
          className: "game"
        },
        e(
          "div",
          {
            className: "game-board"
          },
          e(
            Board,
            null
          )
        )
      )
      /**older JSX
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
      */
    );
  }
}


ReactDOM.render(
  e(Game),

  //older JSX: <Game />,
  document.getElementById('sweeper_container')
);

function calculateWinner(squares, squaresShow) {
  
  /**
    The calculateWinner function compares the number of squares that are showing and the number of squares that are bombs and
    returns "Won" or "Lost" based on the outcome of the game, or null if the game is not over yet.
    If the number of squares that are showing is equal to or greater than the number of squares that are NOT bombs, it means
    the game is over: either the player uncovered all the safe squares (and won) or the player chose a bomb square and lost (since 
    uncovering a bomb automatically reveals all squares).
    To see if the game was won or lost we check if the number of squares showing is exactly the same as the number of safe squares,
    in which case the game was won.
  */
  
  if (squaresShow.filter(Boolean).length >= (squares.length - squares.filter(i => i === "💣").length) ){
    return (squaresShow.filter(Boolean).length === (squares.length - squares.filter(i => i === "💣").length)) ? "Won" : "Lost";
  } else {
    return null;
  }
  
}



/********************************General Use functions********************************/


function handleClickWH(x, squares, squaresShow){
  /**
    This is a workhorse recursive function that returns an array which will replace squaresShow;
    it asks for an index x, squares, and squaresShow as inputs: starting from the index x,
    it modifies squaresShow to uncover all adjacent (existing) squares, as long as they have a value of zero
  */
  squaresShow[x] = true;
  const gap = Math.sqrt(squares.length);
  if(squares[x] === 0) {
    if(lookUp(x, gap) && !squaresShow[x - gap]) { squaresShow = handleClickWH(x - gap, squares, squaresShow) }

    if(lookRight(x, gap) && !squaresShow[x + 1]) { squaresShow = handleClickWH(x + 1, squares, squaresShow) }
    if(lookDown(x, gap) && !squaresShow[x + gap]) { squaresShow = handleClickWH(x + gap, squares, squaresShow) }
    if(lookLeft(x, gap) && !squaresShow[x - 1]) { squaresShow = handleClickWH(x - 1, squares, squaresShow) }
    if(lookUp(x, gap) && lookRight(x, gap) && !squaresShow[x - gap + 1]) { squaresShow = handleClickWH(x - gap + 1, squares, squaresShow) }
    if(lookDown(x, gap) && lookRight(x, gap) && !squaresShow[x + gap + 1]) { squaresShow = handleClickWH(x + gap + 1, squares, squaresShow) }
    if(lookDown(x, gap) && lookLeft(x, gap) && !squaresShow[x + gap - 1]) { squaresShow = handleClickWH(x + gap - 1, squares, squaresShow) }
    if(lookUp(x, gap) && lookLeft(x, gap) && !squaresShow[x - gap - 1]) { squaresShow = handleClickWH(x - gap - 1, squares, squaresShow) }
  }
  return squaresShow;
}



function genBoard(numSquares) {
  /**
    genBoard() creates, populates, and returns an array which will then be used for the squares property.

    numSquares is the total number of squares, and can be any perfect square.

    The array is randomly filled with bombs with a ratio of 0.15625, which in an 8x8 board would
    result in an average of 10 bombs
  */
  const ratio = 0.15625;
  const firstBoard = Array(numSquares).fill(0);
  for (let i = firstBoard.length - 1; i >= 0; i--) {
    if (Math.random() < ratio) {
      firstBoard[i] = "💣";
    }
  }
  
  /**
    gap is the gap between the index of a square and the index of the square above it; obviously this
    is just the length of one side of the Board, and since the Board is square we can calculate gap
    as the square root of the total length of the array
  */
  let gap = Math.sqrt(firstBoard.length);
  for (let j = 0; j < firstBoard.length; j++) {

    // activates when we have a bomb
    if (firstBoard[j] === "💣") {
      //check if it's at least on the second row, if so add 1 to the square on top (if it's not a bomb)
      if (lookUp(j, gap) && firstBoard[j - gap] !== "💣") {
        firstBoard[j - gap]++;
      }
      //check if it's not on the last row, if so add 1 to the square beneath it (if it's not a bomb)
      if (lookDown(j, gap) && firstBoard[j + gap] !== "💣") {
        firstBoard[j + gap]++;
      }
      //check if it's not on the last column, if so add 1 to the square on its right (if it's not a bomb)
      if (lookRight(j, gap) && firstBoard[j + 1] !== "💣") {
        firstBoard[j + 1]++;
      }
      //check if it's not on the first column, if so add 1 to the square on its left (if it's not a bomb)
      if (lookLeft(j, gap) && firstBoard[j - 1] !== "💣") {
        firstBoard[j - 1]++;
      }

      //same thing but diagonally
      if (lookUp(j, gap) && lookRight(j, gap) && firstBoard[j - gap + 1] !== "💣") {firstBoard[j - gap + 1]++;}
      if (lookDown(j, gap) && lookRight(j, gap) && firstBoard[j + gap + 1] !== "💣") {firstBoard[j + gap + 1]++;}
      if (lookDown(j, gap) && lookLeft(j, gap) && firstBoard[j + gap - 1] !== "💣") {firstBoard[j + gap - 1]++;}
      if (lookUp(j, gap) && lookLeft(j, gap) && firstBoard[j - gap - 1] !== "💣") {firstBoard[j - gap - 1]++;}
    }
  }
  return firstBoard;
}


/*************************LOOK Functions********************************/


/**
  These "look" functions act as helper functions telling if a certain position on the board can interact with
  one of its adjacent squares. Their aim is to stop outOfBounds and not letting squares on the edges of the board
  interact with squares that are next to it in the one-dimensional array but far away on the 2-D board.
  For instance, if a bomb is placed in a square on the last column of the board, the position in the squaresValues
  array right after it (i+1), which would be the first square on the next row, should not count this bomb as adjacent.

  These functions are not limited to 8x8 boards
*/

function lookUp(j, gap) {
  //If the index is bigger than gap it means the relative square is at least on the second row, so it's safe to look at the square on top
  if (j >= gap) {
    return true;
  }
  return false;
}
function lookDown(j, gap) {
  /**
    gap squared is just the total number of squares in the array, so if the index is smaller than the total number minus gap
    it means it is on the second to last row at most, making it safe to look at the square under it
  */
  if (j < gap*gap - gap) {
    return true;
  }
  return false;
}
function lookLeft(j, gap) {
  /**
    Since arrays are zero-indexed, we can use the modulus operator to identify the squares on the first column: their index
    has to be a multiple of gap (the length of a row), which means that if the index divided by gap leaves some remainder it
    is safe to look left
  */
  if (j % gap !== 0) {
    return true;
  }
  return false;
}
function lookRight(j, gap) {
  //To check that the square j is not on the last column we simply check that the next index (j+1) is not the index of a square on the first column
  if ((j + 1) % gap !== 0) {
    return true;
  }
  return false;
}
