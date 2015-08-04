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

  var createExampleBoard = function (div) {
    var board = createBoard(6, 6, div);
    // board.charAt(0, 0, 'B');
    // board.charAt(0, 1, 'L');
    // board.charAt(0, 2, 'E');
    $('.cell[data-row=0][data-col=0]').val('B');
    $('.cell[data-row=0][data-col=1]').val('L');
    $('.cell[data-row=0][data-col=2]').val('E');
    $('.cell[data-row=0][data-col=3]').val('T');
    $('.cell[data-row=0][data-col=4]').val('A');
    $('.cell[data-row=0][data-col=5]').val('G');
    $('.cell[data-row=1][data-col=0]').val('B');
    $('.cell[data-row=1][data-col=1]').val('I');
    $('.cell[data-row=1][data-col=2]').val('D');
    $('.cell[data-row=1][data-col=3]').val('E');
    $('.cell[data-row=1][data-col=4]').val('L');
    $('.cell[data-row=1][data-col=5]').val('T');
    $('.cell[data-row=2][data-col=0]').val('C');
    $('.cell[data-row=2][data-col=1]').val('T');
    $('.cell[data-row=2][data-col=2]').val('O');
    $('.cell[data-row=2][data-col=3]').val('A');
    $('.cell[data-row=2][data-col=4]').val('L');
    $('.cell[data-row=2][data-col=5]').val('A');
    $('.cell[data-row=3][data-col=0]').val('H');
    $('.cell[data-row=3][data-col=1]').val('T');
    $('.cell[data-row=3][data-col=2]').val('C');
    $('.cell[data-row=3][data-col=3]').val('C');
    $('.cell[data-row=3][data-col=4]').val('O');
    $('.cell[data-row=3][data-col=5]').val('H');
    $('.cell[data-row=4][data-col=0]').val('L');
    $('.cell[data-row=4][data-col=1]').val('L');
    $('.cell[data-row=4][data-col=2]').val('A');
    $('.cell[data-row=4][data-col=3]').val('H');
    $('.cell[data-row=4][data-col=4]').val('Y');
    $('.cell[data-row=4][data-col=5]').val('C');
    $('.cell[data-row=5][data-col=0]').val('L');
    $('.cell[data-row=5][data-col=1]').val('E');
    $('.cell[data-row=5][data-col=2]').val('A');
    $('.cell[data-row=5][data-col=3]').val('R');
    $('.cell[data-row=5][data-col=4]').val('N');
    $('.cell[data-row=5][data-col=5]').val('S');
    $('.cell').trigger('change');
    return board;
  };

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
    createExampleBoard: createExampleBoard,
    solve: solve,
    Board: Board,
  };
})();
