function Trie () {
  var ALPHABET_SIZE = 26;
  var ASCII_OFFSET = 'A'.charCodeAt();

  this.children = null;
  this.isEndOfWord = false;

  this.contains = function (str) {
    var curNode = this;

    for (var i = 0; i < str.length; i++) {
      var idx = str.charCodeAt(i) - ASCII_OFFSET;
      if (curNode.children && curNode.children[idx]) {
        curNode = curNode.children[idx];
      } else {
        return false;
      }
    }

    return curNode.isEndOfWord;
  }

  this.has = function (ch) {
    if (this.children) {
      return this.children[ch.charCodeAt() - ASCII_OFFSET] != undefined;
    }
    return false;
  }

  this.next = function (ch) {
    if (this.children) {
      return this.children[ch.charCodeAt() - ASCII_OFFSET];
    }
    return undefined;
  }

  this.insert = function (str) {
    var curNode = this;

    for (var i = 0; i < str.length; i++) {
      var idx = str.charCodeAt(i) - ASCII_OFFSET;

      if (curNode.children == null) {
        curNode.children = new Array(ALPHABET_SIZE);
        curNode = curNode.children[idx] = new Trie();
      } else if (curNode.children[idx]) {
        curNode = curNode.children[idx];
      } else {
        curNode = curNode.children[idx] = new Trie();
      }
    }

    curNode.isEndOfWord = true;
    return curNode;
  }
}
