var game = {
  width: 25,
  height: 25,
  gameState: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, null]],

  setupBoard: function() {
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
          td.style.backgroundColor = '#2edeed'
        //If a cell has no tile, it gets no text
        } else {
          td.removeChild(td.childNodes[0]);
        }
      }
    }
  },
  moveTile: function() {
    // if target is in a row or column with null, move as appropriate
    var rowId = this.getAttribute('id').split('-')[0]
    var colId = this.getAttribute('id').split('-')[1];
    var rowOfClick = game.gameState[rowId];
    var indexOfNull = rowOfClick.indexOf(null);
    var indexOfClick = rowOfClick.indexOf(parseInt(this.textContent));


    //If null square is in the same row as the click
    if (indexOfNull !== -1) {
      if (indexOfClick < indexOfNull) {
        //What was null is set to the value of clicked
        rowOfClick.splice(indexOfClick, 0, null);
        rowOfClick.splice(indexOfNull + 1, 1);
      } else if (indexOfClick > indexOfNull) {
        rowOfClick.splice(indexOfNull, 1);
        rowOfClick.splice(indexOfClick, 0, null);
      }
    //If the null square is in the same column as the click
    } else {
      for (var i in game.gameState) {
        for (var j in game.gameState) {
          if (game.gameState[i][colId] === null) {
            window.alert("column contains null!")
            break;
          }
        }
      }
    }
    console.log(game.gameState);
    game.setupBoard();
  }
}

game.setupBoard();
