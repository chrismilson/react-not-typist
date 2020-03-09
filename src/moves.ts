import {
  MoveType,
  LeaveMove,
  AddMove,
  RemoveMove,
  ReplaceMove,
  Move,
  MoveListNode
} from './types/moves'

/* Some move action creators */
export const leave = (): LeaveMove => ({
  type: MoveType.LEAVE
})

export const add = (char: string): AddMove => ({
  type: MoveType.ADD,
  char
})

export const remove = (): RemoveMove => ({
  type: MoveType.REMOVE
})

export const replace = (char: string): ReplaceMove => ({
  type: MoveType.REPLACE,
  char
})

/**
 * Produces a list of moves to edit a given string into another string. The
 * order of the moves should follow the order of characters in the given string.
 *
 * for example, calculateMoves('horse', 'ros') should return an array of the
 * form:
 *
 * [replace 'r', leave, remove, leave, remove].
 *
 * This should be interpreted as:
 *
 * 1. replace h with r
 * 2. leave o
 * 3. remove r
 * 4. leave s
 * 5. remove e
 *
 * @param from The current string
 * @param to The target string
 */
export function calculateMoves(from: string, to: string): Move[] {
  /**
   * A two dimentional array that contains the moves to edit from a prefix of
   * from to a prefix of to. the value at partial[i][j] is an object
   * representing the edit sequence from the first i characters of from to the
   * first j characters of to.
   *
   * For example: partial[i][0] will always be cost i + 1 because it is the cost
   * of editing from a string to the empty string. This will just be a remove
   * for every character; the length of the string.
   */
  const partial: [[MoveListNode]] = [
    [
      {
        cost: 0,
        move: null,
        previous: null
      }
    ]
  ]

  // partial[i][0] represents from.substr(0, i) -> ''
  for (let i = 0; i < from.length; i++) {
    partial[i + 1] = [
      {
        cost: i + 1,
        move: remove(),
        previous: partial[i][0]
      }
    ]
  }
  // partial[0][j] represents '' -> to.substr(0, j)
  for (let j = 0; j < to.length; j++) {
    partial[0][j + 1] = {
      cost: j + 1,
      move: add(to[j]),
      previous: partial[0][j]
    }
  }

  // partial[i][j] represents from.substr(0, i) -> to.substr(0, j)
  for (let i = 0; i < from.length; i++) {
    for (let j = 0; j < to.length; j++) {
      if (from[i] === to[j]) {
        partial[i + 1][j + 1] = {
          cost: partial[i][j].cost,
          move: leave(),
          previous: partial[i][j]
        }
      } else {
        // To edit from.substr(0, i + 1) -> to.substr(0, j + 1) we can either
        //
        // - Do from.substr(0, i + 1) -> to.substr(0, j) and add to[j];
        // - Do from.substr(0, i + 1) -> to.substr(0, j + 1) and remove from[i];
        //   or,
        // - Do from.substr(0, i) -> to.substr(0, j) and replace from[i] with
        //   to[j].
        //
        // The move that will be chosen must have the minimum cost, however
        // there may be more than one move that does have the monimum cost.

        const minCost = Math.min(
          partial[i + 1][j].cost, // add
          partial[i][j + 1].cost, // remove
          partial[i][j].cost // replace
        )

        const possibleNextMoves = []

        if (partial[i + 1][j].cost === minCost) {
          possibleNextMoves.push({
            cost: minCost + 1,
            move: add(to[j]),
            previous: partial[i + 1][j]
          })
        }
        if (partial[i][j + 1].cost === minCost) {
          possibleNextMoves.push({
            cost: minCost + 1,
            move: remove(),
            previous: partial[i][j + 1]
          })
        }
        if (partial[i][j].cost === minCost) {
          possibleNextMoves.push({
            cost: minCost + 1,
            move: replace(to[j]),
            previous: partial[i][j]
          })
        }

        // Choose the next move from the possibles randomly.
        partial[i + 1][j + 1] =
          possibleNextMoves[
            Math.floor(Math.random() * possibleNextMoves.length)
          ]
      }
    }
  }

  // Now we create an array of moves from our partial array.
  const moves = []
  let current = partial[from.length][to.length]
  while (current.previous) {
    moves.unshift(current.move)
    current = current.previous
  }
  return moves
}
