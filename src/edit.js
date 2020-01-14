/**
 * Gives information about a certain operation.
 *
 * When animating the character change, the type of change is not considered,
 * and all different types (leave, add, replace, remove) are considered
 * replacement moves, where add is seen as replacing the empty string with a
 * character, remove is replacing a character with the empty string and leave is
 * replacing a character with itself.
 */
class Move {
  constructor (type, from, to) {
    this.type = type
    this.from = from
    this.to = to
  }
}

/**
 * Corresponds to leaving the current character as is.
 */
class Leave extends Move {
  constructor (char) {
    super('leave', char, char)
  }
}

/**
 * Corresponds to adding a new character.
 */
class Add extends Move {
  constructor (char) {
    super('add', '', char)
  }
}

/**
 * Corresponds to replacing a character with another.
 */
class Replace extends Move {
  constructor (from, to) {
    super('replace', from, to)
  }
}

/**
 * Corresponds to removing a given character.
 */
class Remove extends Move {
  constructor (char) {
    super('remove', char, '')
  }
}

/**
 * Calculates a sequence of moves (add a char, remove a char, replace a char -
 * each with cost 1, and leave a char with cost 0) with minimal cost; equal to
 * the Levenshtein distance between the strings.
 *
 * @param {string} from
 * @param {string} to
 * @returns {Move[]}
 */
export default function edit (from, to) {
  /**
   * dp is a |from| x |to| sized 2d array, where dp[i][j] is
   *
   * 1. The minimum cost to edit the first i characters of the from string to
   *    the first j characters of the to string.
   * 2. The final move of a minimum length sequence of moves to edit the 'from'
   *    string to the 'to' string.
   */
  const dp = new Array(from.length + 1)
  var i, j

  // The row dp[i][0] corresponds to the number of moves from the 'from' string
  // to the empty string, this will only consist of Remove moves.
  dp[0] = new Array(to.length + 1)
  dp[0][0] = { cost: 0 } // there are no moves from '' to ''
  for (i = 1; i < from.length + 1; i++) {
    dp[i] = new Array(to.length + 1)
    dp[i][0] = {
      cost: i,
      move: new Remove(from[i - 1])
    }
  }
  // The row dp[0][j] corresponds to the number of moves from the empty string
  // to the 'to' string, this will consist only of Add moves.
  for (j = 1; j < to.length + 1; j++) {
    dp[0][j] = {
      move: new Add(to[j - 1]),
      cost: j
    }
  }

  /*
    Now we will complete the rest of the array.

    Suppose the first i - 1 characters of 'from' is f, and the ith character x
    and the first j - 1 characters of 'to' is t and the next character is y.

    If x = y, the minumum cost of editing fx to ty will be the same as the the
    cost of editing f to t, which is dp[i - 1][j - 1].cost

    Otherwise, the minimum cost of editing fx to ty will be the minimum of:

    - The cost of f to t plus the cost of replacing x with y
        dp[i - 1][j - 1] + 1

    - The cost of f to ty plus the cost of removing x
        dp[i - 1][j] + 1

    - The cost of fx to t plus the cost of adding y
        dp[i][j - 1] + 1
  */
  for (i = 1; i < from.length + 1; i++) {
    for (j = 1; j < to.length + 1; j++) {
      if (from[i - 1] === to[j - 1]) {
        dp[i][j] = {
          cost: dp[i - 1][j - 1].cost,
          move: new Leave(from[i - 1])
        }
      } else {
        // The minimum cost of strings that are 1 move away
        var min = Math.min(
          dp[i - 1][j - 1].cost,
          dp[i - 1][j].cost,
          dp[i][j - 1].cost
        )
        // If there are multiple ways to do the move, we will choose randomly.
        var valid = []
        if (min === dp[i - 1][j - 1].cost) {
          valid.push(new Replace(from[i - 1], to[j - 1]))
        }
        if (min === dp[i - 1][j].cost) {
          valid.push(new Remove(from[i - 1]))
        }
        if (min === dp[i][j - 1].cost) {
          valid.push(new Add(to[j - 1]))
        }
        dp[i][j] = {
          cost: min + 1,
          move: valid[Math.floor(Math.random() * valid.length)]
        }
      }
    }
  }

  /**
   * Now we want to go back through the array and build up the sequence of moves
   * from the end to the beginning and then return them in order.
   */
  var moves = []
  for (i = from.length, j = to.length; i > 0 || j > 0; i--, j--) {
    moves.push(dp[i][j].move)
    if (dp[i][j].move.type === 'add') i++ // only decrement j
    else if (dp[i][j].move.type === 'remove') j++ // only decrement i
  }
  return moves.reverse()
}
