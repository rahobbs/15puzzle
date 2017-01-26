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
    var row = this.getAttribute('id').split('-')[0];
    var col = this.getAttribute('id').split('-')[1];
    
  }
}

game.setupBoard();
