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

    var words = new Array();

    var findWordsInRow = function (row, node) {
      for (var c = 0; c < cols; c++) {
        var rowNode = node;
        var charStack = new Array();
        for (var dc = c; dc < cols; dc++) {
          if (!rowNode || !rowNode.has(boggle.charAt(row, dc))) break;
          rowNode = rowNode.next(boggle.charAt(row, dc));
          charStack.push(boggle.charAt(row, dc));
          if (rowNode.isEndOfWord) {
            var s = "";
            for (var i = 0; i < charStack.length; i++) {
              s = s + charStack[i];
            }
            words.push(s);
          }
        }
      }
    }

    var findWordsInColumn = function (col, node) {
      for (var r = 0; r < rows; r++) {
        var colNode = node;
        var charStack = new Array();
        for (var dr = r; dr < rows; dr++) {
          if (!colNode || !colNode.has(boggle.charAt(dr, col))) break;
          colNode = colNode.next(boggle.charAt(dr, col));
          charStack.push(boggle.charAt(dr, col));
          if (colNode.isEndOfWord) {
            var s = "";
            for (var i = 0; i < charStack.length; i++) {
              s = s + charStack[i];
            }
            words.push(s);
          }
        }
      }
    }

    for (var r = 0; r < rows; r++) {
      findWordsInRow(r, trie);
    }

    for (var c = 0; c < cols; c++) {
      findWordsInColumn(c, trie);
    }

    return words;
  };

  return {
    createBoard: createBoard,
    solve: solve,
    Board: Board,
  };
})();
