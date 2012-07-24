var Boggle = (function () {
  /**
   * Creates the underlying model of a Boggle board.
   */
  var Board = function (rows, cols) {
    var board = new Array(rows);
    for (var i = 0; i < rows; i++) {
      board[i] = new Array(cols);
      for (var j = 0; j < cols; j++) {
        board[i][j] = '';
      }
    };

    this.getNumRows = function () {
      return rows;
    };

    this.getNumCols = function () {
      return cols;
    };

    this.charAt = function (row, col, val) {
      if (val != undefined) {
        board[row][col] = val.toUpperCase();
      }
      return board[row][col];
    };
  };

  /**
   * Creates a Boggle board with the specified number of columns and
   * rows inside the given div element.
   */
  var createBoard = function (rows, cols, div) {
    var board = new Board(rows, cols);

    var count = 0;
    for (var r = 0; r < rows; r++) {
      var row = $('<div class="row"></div>');
      for (var c = 0; c < cols; c++) {
        var cell = $('<input type="text" ' +
                             'id="cell' + (count++) + '" ' +
                             'class="cell" ' +
                             'maxlength="1" ' +
                             'data-row="' + r + '" ' +
                             'data-col="' + c + '" ' +
                     '/>');

        row.append(cell);
      }
      div.append(row);
    }

    var onCellChanged = function () {
      var row = $(this).data('row'), col = $(this).data('col');
      board.charAt(row, col, $(this).val().toUpperCase());
    };

    // Update model when cell letter changed
    $('.boggle-board .cell').keyup(onCellChanged)
                            .change(onCellChanged);
    $('.boggle-board .cell').keyup(function () {
    });

    return board;
  }

  /**
   * Solves a Boggle board using the given trie as a dictionary.
   */
  var solve = function (boggle, trie) {
    var rows = boggle.getNumRows();
    var cols = boggle.getNumCols();

    var charStack = new Array();
    var words = new Array();

    var findWords = function (row, col, node) {
      if (visited[row][col]) return;
      if (!node || !node.has(boggle.charAt(row, col))) return;
      node = node.next(boggle.charAt(row, col));

      charStack.push(boggle.charAt(row, col));
      visited[row][col] = true;

      for (var dx = -1; dx <= 1; dx++) {
        var c = col + dx;
        if (c < 0 || c >= cols) continue;

        for (var dy = -1; dy <= 1; dy++) {
          var r = row + dy;
          if (r < 0 || r >= rows) continue;
          if (dx == 0 && dy == 0) continue;

          findWords(r, c, node);
        }
      }

      if (node.isEndOfWord) {
        var s = "";
        for (var i = 0; i < charStack.length; i++) {
          s = s + charStack[i];
        }
        words.push(s);
      }

      visited[row][col] = false;
      charStack.pop();
    };

    var visited = new Array(rows);
    for (var row = 0; row < rows; row++) {
      visited[row] = new Array(cols);
      for (var col = 0; col < cols; col++) {
        visited[row][col] = false;
      }
    }

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        findWords(r, c, trie);
      }
    }

    return words;
  };

  return {
    createBoard: createBoard,
    solve: solve,
    Board: Board,
  };
})();
