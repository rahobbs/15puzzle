
var initialState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, null]];

var game = {
  width: 25,
  height: 25,
  gameState: initialState,

  setupBoard: function() {
    //FOR ARRAY IN gameState
    //for int in ARRAY
    //set table cell to int
    for(var i in this.gameState) {
      for(var j in this.gameState[i]) {
        var id = i + "-" + j;
        var td = document.getElementById(id);
        td.appendChild(document.createTextNode(this.gameState[i][j]));
      }
    }
  }

}

game.setupBoard();
