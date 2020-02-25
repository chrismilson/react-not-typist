import { useEffect, useRef, useState } from 'react'
import { Move } from '../moves'
import edit from '../edit'

/**
 * When provided with a string and an initial value, returns an array of {from,
 * to} pairs that align the changes from one string to the other so that the
 * changes are solely character based.
 *
 * e.g. The strings 'hot' and 'o' are different lengths, so this would
 * return an array:
 *
 * [{ from: 'h', to: '' }, { from: 'o', to: 'o' }, { from: 't', to: '' }]
 *
 * Notice that two of the characters would be replaced with the empty string,
 * accounting for the length difference in the strings.
 *
 * @param next
 */
export default function useEdit(next: string): Move[] {
  const [sequence, setSequence] = useState<Move[]>([])
  const prev = useRef('')

  useEffect(() => {
    const sequence = edit(prev.current, next)
    prev.current = next

    setSequence(sequence)
  }, [next])

  return sequence
}
