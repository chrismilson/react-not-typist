import { useState, useLayoutEffect } from 'react'
import { calculateMoves } from '../moves'
import { EditableString } from '../types/string'
import { MoveType } from '../types/moves'

class KeyPool {
  _free: number[]
  _next = 0

  free(key: number): void {
    this._free.push(key)
  }

  next(): number {
    if (this._free.length > 0) return this._free.pop()
    return this._next++
  }
}

/**
 * This hook takes a target string and will return an annotated string that
 * allows downstream observers to infer what changes have been made to the
 * target string.
 *
 * It does this by adding a key element to each character that will persist
 * through character changes.
 *
 * For example, if the target was initially 'abc' and then suddenly became
 * 'axc', if we assume the hook initially supplied:
 *
 * (read *x i* as {char: 'x', key: i})
 *
 * [a 0, b 1, c 2]
 *
 * it might then supply:
 *
 * [a 0, x 1, c 2]
 *
 * indicating that the b had been replaced by the x, OR
 *
 * [a 0, *empty string* 1, x 3, c 2]
 *
 * indicating that the b was removed and the x was added. In either case, what
 * happened is quite explicit.
 *
 * @param target The string to follow
 */
export default function useEdit(target: string): EditableString {
  const [display, setDisplay] = useState<EditableString>([])
  const keys = useState(new KeyPool())[0] // always the same.

  useLayoutEffect(() => {
    setDisplay(display => {
      // First we clean up display by removing any empty characters (that were
      // previously removed) and freeing their keys.
      display
        .filter(({ char }) => char === '')
        .forEach(({ key }) => keys.free(key))
      const current = display.filter(({ char }) => char !== '')

      // Then we calculate the moves from the currently displayed string to the
      // target string.
      calculateMoves(current.map(({ char }) => char).join(''), target).forEach(
        (move, idx) => {
          // The usage of index from the moves array is OK because a remove move
          // DO NOT reduce the length of the array. They are actually a
          // replacement by the empty character, and only appear to be removed.
          if (move.type === MoveType.ADD) {
            current.splice(idx, 0, {
              char: move.char,
              key: keys.next()
            })
          } else if (move.type === MoveType.REMOVE) {
            current[idx].char = ''
          } else if (move.type === MoveType.REPLACE) {
            current[idx].char = move.char
          }
        }
      )

      return current
    })
  }, [target])

  return display
}
