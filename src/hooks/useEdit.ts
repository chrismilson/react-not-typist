import { useState, useLayoutEffect } from 'react'
import { calculateMoves } from '../moves'
import { EditableString } from '../types/string'
import { MoveType } from '../types/moves'

class KeyPool {
  _free: number[]
  _next: number

  free(key: number): void {
    this._free.push(key)
  }

  next(): number {
    if (this._free.length > 0) return this._free.pop()
    return this._next++
  }
}

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
