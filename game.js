var game = {
  width: 25,
  height: 25,
  initialState: null,
  gameState: null,

  /* Create the initial game.gameState and draw it. */
  setupBoard: function() {
    this.initialState = this.createInitialState();
    // Using converting to JSON and back to create a deep clone of the state
    this.gameState = JSON.parse(JSON.stringify(this.initialState));
    game.drawBoard();
  },
  /* Create a game board from the current game.gameState. */
  drawBoard: function() {
    for (var row = 0; row < this.gameState.length; row++) {
      for (var col = 0; col < this.gameState[row].length; col++) {
        var id = row + '-' + col;
        var td = document.getElementById(id);

        // Clear old gameState from DOM when drawing a new one.
        while (td.hasChildNodes()) {
          td.removeChild(td.firstChild);
        }

        if (this.gameState[row][col] === null) {
            td.style.background = '#fff';
            continue;
        }

        var textNode = document.createTextNode(this.gameState[row][col]);
        td.style.backgroundColor = '#986de4';
        td.addEventListener('click', this.moveTile);
        td.appendChild(textNode);
      }
    }
  },
  createInitialState: function() {
    // Initialize the numbers that will be on the board and an empty 2d array.
    var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
    var newState = [[], [], [], []];
    tiles = game.shuffle(tiles);

    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        var num = tiles.pop();
        newState[row][col] = num;
      }
    }
    return newState;
  },
  shuffle: function(array) {
    //For each element i in the array, shuffle it in place with a random jth element
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
  /* If the clicked tile is in a row or column with an empty space, move it */
  moveTile: function() {
    var rowId = parseInt(this.getAttribute('id').split('-')[0], 10);
    var colId = parseInt(this.getAttribute('id').split('-')[1], 10);
    var rowOfClick = game.gameState[rowId];
    var indexOfNull = rowOfClick.indexOf(null);
    var indexOfClick = rowOfClick.indexOf(parseInt(this.textContent, 10));

    // If the empty space is clicked, do nothing and exit the fuction
    if (this.textContent.length < 1) {
      return;
    }

    // If null square is in the same row as the click
    if (indexOfNull !== -1) {
      game.shiftInRow(indexOfClick, indexOfNull, rowOfClick);

    // If the null square is in the same column as the click
    } else {
      game.shiftInColumn(rowId, colId, rowOfClick);
    }

    // Redraw the board now that gameState has been updated
    game.drawBoard();
  },

  shiftInRow: function(indexOfClick, indexOfNull, rowOfClick) {
    // If the clicked tile comes before the empty space, shift the array right
    if (indexOfClick < indexOfNull) {
      rowOfClick.splice(indexOfClick, 0, null);
      rowOfClick.splice(indexOfNull + 1, 1);

    // If the clicked tile comes after the empty space, shift the array left
    } else if (indexOfClick > indexOfNull) {
      rowOfClick.splice(indexOfNull, 1);
      rowOfClick.splice(indexOfClick, 0, null);
    }
  },
  shiftInColumn: function(rowId, colId, rowOfClick) {
    // Loop through tiles until we find the empty space
    for (var rowWithNull = 0; rowWithNull < game.gameState.length; rowWithNull++) {
      for (var colWithNull = 0; colWithNull < game.gameState[rowWithNull].length; colWithNull++) {
        if (game.gameState[rowWithNull][colId] === null) {
          // If we find the empty space in a row after the clicked row
          if (rowId < rowWithNull) {
            var temp = rowOfClick[colId];
            /* For every tile in that column between the click and the empty
            space, move the tile down a row */
            for (var k = rowId + 1; k <= rowWithNull; k++) {
              var newTemp = game.gameState[k][colId];
              game.gameState[k][colId] = temp;
              temp = newTemp;
            }
            // The clicked title is the new empty space
            game.gameState[rowId][colId] = null;

            // If we find null in a row before the row clicked
          } else if (rowId > rowWithNull) {
            var temp = rowOfClick[colId];
            // Move every tile between the click and empty space up a row
            for (var k = rowId - 1; k >= rowWithNull; k--) {
              var newTemp = game.gameState[k][colId];
              game.gameState[k][colId] = temp;
              temp = newTemp;
            }
            // The clicked tile is the new empty space
            game.gameState[rowId][colId] = null;
          }
          break;
        }
      }
    }
  }
}

// On window load, set up the board with initial gameState and button click listeners
window.onload = function() {
  game.setupBoard();
  document.getElementById('newGame-button').addEventListener('click', function() {
    game.setupBoard();
  });
  document.getElementById('reset-game-button').addEventListener('click', function() {
    game.gameState = JSON.parse(JSON.stringify(game.initialState));
    game.drawBoard();
  })
}
