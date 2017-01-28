var game = {
  width: 25,
  height: 25,
  gameState: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, null]],

  setupBoard: function() {
    this.gameState = this.setInitialState();
    console.log("gamestate", this.gameState)
    game.drawBoard();
  },
  drawBoard: function() {
    //Draw 4x4 grid and set cells to the initial game state
    for (var i in this.gameState) {
      for (var j in this.gameState[i]) {
        var id = i + '-' + j;
        var td = document.getElementById(id);
        if(td.hasChildNodes()) {
          td.removeChild(td.firstChild);
        }
        var textNode = document.createTextNode(this.gameState[i][j]);
        td.addEventListener("click", this.moveTile);
        td.appendChild(textNode);
        //If the cell has a tile, it gets a background color
        if (this.gameState[i][j] !== null) {
          td.style.backgroundColor = '#2edeed';
        //If a cell has no tile, it gets no text
        } else {
          td.style.background = "#fff";
          td.removeChild(td.childNodes[0]);
        }
      }
    }
  },
  setInitialState: function() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    var state = [[],[],[],[]];
    numbers = game.shuffle(numbers);

    for(var j = 0; j < 4; j++) {
      for(var i = 0; i < 4; i++) {
        if (numbers.pop() === 0){
          state[j][i] = null;
        } else {
          state[j][i] = numbers.pop();
        }
      }
    }
    return state;
  },
  shuffle: function(array) {
    var i = 0
    var j = 0
    var temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  },
  moveTile: function() {
    // if target is in a row or column with null, move as appropriate
    var rowId = parseInt(this.getAttribute('id').split('-')[0]);
    var colId = parseInt(this.getAttribute('id').split('-')[1]);
    var rowOfClick = game.gameState[rowId];
    var indexOfNull = rowOfClick.indexOf(null);
    var indexOfClick = rowOfClick.indexOf(parseInt(this.textContent));

    if (this.textContent.length < 1) {
      return;
    }
    //If null square is in the same row as the click
    if (indexOfNull !== -1) {
      game.shiftInRow(indexOfClick, indexOfNull, rowOfClick);
    //If the null square is in the same column as the click
    } else {
      game.shiftInColumn(rowId, colId, rowOfClick);
    }
    console.log(game.gameState);
    game.drawBoard();
  },

  shiftInRow: function(indexOfClick, indexOfNull, rowOfClick) {
    if (indexOfClick < indexOfNull) {
      rowOfClick.splice(indexOfClick, 0, null);
      rowOfClick.splice(indexOfNull + 1, 1);
    } else if (indexOfClick > indexOfNull) {
      rowOfClick.splice(indexOfNull, 1);
      rowOfClick.splice(indexOfClick, 0, null);
    }
  },
  shiftInColumn: function(rowId, colId, rowOfClick) {
    //Loop through tiles until we find null
    for (var rowWithNull = 0; rowWithNull < game.gameState.length; rowWithNull++) {
      for (var colWithNull = 0; colWithNull < game.gameState[rowWithNull].length; colWithNull++) {
        if (game.gameState[rowWithNull][colId] === null) {
          //If we find null in a row after the clicked row
          if (rowId < rowWithNull) {
            var temp = rowOfClick[colId];
            for (var k = rowId + 1; k <= rowWithNull; k++) {
              var newTemp = game.gameState[k][colId];
              game.gameState[k][colId] = temp;
              temp = newTemp;
            }
            game.gameState[rowId][colId] = null;

          //If we find null in a row before the row clicked
        } else if (rowId > rowWithNull) {
           var temp = rowOfClick[colId];
          for (var k = rowId - 1; k >= rowWithNull; k--) {
            var newTemp = game.gameState[k][colId];
            game.gameState[k][colId] = temp;
            temp = newTemp;
          }
          game.gameState[rowId][colId] = null;
          }
          break;
        }
      }
    }
  }
}

game.setupBoard();
