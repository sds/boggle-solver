var boardPanel = $('#boggle-panel'),
    boardDiv = $('#board'),
    board,
    numRows = 4,
    numCols = 4,
    wordPanel = $('#words-panel'),
    wordList = $('#word-list'),
    dict = new Trie(),
    urlParams = {};
(function () {
  var e,
      a = /\+/g,  // Regex for replacing addition symbol with a space
      r = /([^&=]+)=?([^&]*)/g,
      d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
      q = window.location.search.substring(1);

  while (e = r.exec(q)) {
    urlParams[d(e[1])] = d(e[2]);
  }
})();

wordPanel.hide();

var boardSizeChanged = function (evt) {
  boardDiv.empty();
  board = Boggle.createBoard(numRows, numCols, boardDiv);
};

$.get('data/length-up-to-7.txt')
.success(function (data) {
  var words = data.split('\n');
  for (var i = words.length - 1; i >= 0; i--) {
    dict.insert(words[i]);
  }

  $('#loading-message').hide();
  boardSizeChanged();

  if (urlParams.text) {
    var rows = numRows,
        cols = numCols,
        count = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        $('#cell' + count).val(urlParams.text[count]);
        $('#cell' + count).change();
        count++;
      }
    }
    $('#solve-button').click();
  }
})
.error(function () {
  $('#loading-message').text("There was a problem loading the dictionary");
});

$('#solve-button').click(function () {
  var rows = numRows, cols = numCols, count = 0;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      if ($('#cell' + count).val() == "") {
        return;
      }
      count++;
    }
  }

  wordList.empty();
  $("#solving-message").show();
  wordPanel.show();

  // Find and sort words by longest first
  var words = Boggle.solve(board, dict).sort(function (a, b) {
    if (a.length == b.length) {
      return (a < b) ? 1 : -1;
    }
    return b.length - a.length;
  });

  // Remove duplicates
  words = words.filter(function (item, idx, arr){
    return idx == arr.indexOf(item);
  });

  $("#solving-message").hide();

  $('#num-words').text(words.length + " words");
  for (var i = 0; i < words.length; i++) {
    wordList.append('<li>' + words[i] + '</li>');
  }
});

$('#create-example-board-button').click(function () {
  numRows = 6;
  numCols = 6;
  boardDiv.empty();
  board = Boggle.createExampleBoard(boardDiv);
});

// Hitting Enter solves puzzle
$(document).keyup(function (evt) {
  if (evt.keyCode == 13) {
    $('#solve-button').click();
  }
});
