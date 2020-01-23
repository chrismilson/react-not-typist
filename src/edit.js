/**
 * The different moves each encode a specific way to edit a single character.
 */

const leave = () => ({ type: 'leave' })

const add = char => ({ type: 'add', char })

const replaceWith = char => ({ type: 'replace', char })

const remove = () => ({ type: 'remove' })

/**
 * Calculates a sequence of moves (add a char, remove a char, replace a char -
 * each with cost 1, and leave a char with cost 0) with minimal cost; equal to
 * the Levenshtein distance between the strings.
 *
 * Returns an array of objects detaining the sequence of moves for each
 * character.
 *
 * @example
 * // returns [
 * //  { type: 'replace', char: 'r' },
 * //   { type: 'leave' },
 * //   { type: 'remove' },
 * //   { type: 'leave' },
 * //   { type: 'remove' }
 * // ]
 * edit('horse', 'ros')
 *
 * @param {string} from
 * @param {string} to
 * @returns {Move[]}
 */
function edit (from, to) {
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
      move: remove(from[i - 1])
    }
  }
  // The row dp[0][j] corresponds to the number of moves from the empty string
  // to the 'to' string, this will consist only of Add moves.
  for (j = 1; j < to.length + 1; j++) {
    dp[0][j] = {
      move: add(to[j - 1]),
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
          move: leave()
        }
      } else {
        // The minimum cost of strings that are 1 move away
        var min = Math.min(
          dp[i - 1][j - 1].cost,
          dp[i - 1][j].cost,
          dp[i][j - 1].cost
        )
        // If there are multiple ways to do the move, we will choose randomly.
        var validMoves = []
        if (min === dp[i - 1][j - 1].cost) {
          validMoves.push(replaceWith(to[j - 1]))
        }
        if (min === dp[i - 1][j].cost) {
          validMoves.push(remove())
        }
        if (min === dp[i][j - 1].cost) {
          validMoves.push(add(to[j - 1]))
        }
        dp[i][j] = {
          cost: min + 1,
          move: validMoves[Math.floor(Math.random() * validMoves.length)]
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
    const move = dp[i][j].move
    moves.push(move)

    if (move.type === 'add') i++ // only decrement j
    else if (move.type === 'remove') j++ // only decrement i
  }
  return moves.reverse()
}

export default edit
