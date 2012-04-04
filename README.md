Boggle Solver
=============

View the demo at
http://sds.github.com/boggle-solver/?rows=4&cols=4&text=boggleisafungame

After having played a couple of games of Boggle, I found myself frustrated by my
inability to conjure up words as quickly as my competitors. Thus I decided to
build something that would solve the puzzle for me. The unfortunate side effect
is that now my friends won't play Boggle with me.

Instructions
------------
Just fill in the puzzle and then click Solve, or hit Enter. You can also feed
data using query parameters, e.g. `...?rows=4&cols=4&text=somecharactershere`.
The characters will populate the puzzle one row at a time, filling columns from
left to right.

Dictionary Size
---------------
Note that the dictionary included in the demo contains words up to length 7.
This is so the demo loads quickly. There is an interesting article on storing
dictionaries efficiently at http://stevehanov.ca/blog/index.php?id=120. Perhaps
one day I'll implement that approach so that I can include a larger dictionary.

License
-------
WTFPL (http://en.wikipedia.org/wiki/WTFPL)
