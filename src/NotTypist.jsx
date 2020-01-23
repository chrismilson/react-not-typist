import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Changer from './Changer'
import edit from './edit'
import './style.css'

function KeyPool () {
  this._freed = []
  this._next = 0
}

KeyPool.prototype = {
  next: function () {
    if (this._freed.length) return this._freed.pop()
    return this._next++
  },
  free: function (key) {
    this._freed.push(key)
  }
}

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
 * @param {string} next
 */
function useEdit (next) {
  const [sequence, setSequence] = useState([])
  const prev = useRef('')

  useEffect(() => {
    const sequence = edit(prev.current, next)
    prev.current = next

    setSequence(sequence)
  }, [next])

  return sequence
}

/**
 * When given a delay in milliseconds, rotates through supplying different
 * values of the given array.
 *
 * @param {any[]} array
 * @param {number} delay
 */
function useRotate (array, delay) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const nextIdx = idx => (idx + 1) % array.length
    const interval = setInterval(() => setIdx(nextIdx), delay)
    return () => clearInterval(interval)
  }, [array, delay])

  return array[idx]
}

/**
 * A text carousel that performs different character operations on strings
 * to transform them from one into another. When supplied with an array of
 * strings, it will rotate through displaying each of the strings, and the
 * transition between the strings is based on the Levenshtein distance between
 * the strings.
 */
function NotTypist ({ words, speed, delay }) {
  const word = useRotate(words, speed + delay)
  const keys = useState(new KeyPool())[0] // set on mount only

  // Stores props for each of the changer objects that will be displayed.
  const [chars, setChars] = useState([])

  // An array of edit moves from the previous word to the current.
  const edit = useEdit(word, '')
  useEffect(() => {
    setChars(oldChars => {
      // remove empty strings and free the unused keys.
      const newChars = oldChars.filter(({ char }) => char !== '')
      oldChars
        .filter(({ char }) => char === '')
        .forEach(({ key }) => keys.free(key))

      // newChars.length is the same as edit.length minus the number of add
      // edits, therefore we can use the same index.
      edit.forEach(({ type, char }, idx) => {
        if (type === 'add') {
          newChars.splice(idx, 0, { char, key: keys.next() })
        } else if (type === 'replace') newChars[idx].char = char
        else if (type === 'remove') newChars[idx].char = ''
        // else leave
      })
      return newChars
    })
  }, [edit, keys])

  return <span className='NotTypist'>{
    chars.map(({ key, char }) => <Changer {...{ key, char, speed }} />)
  }</span>
}

NotTypist.propTypes = {
  /**
   * The array of words to rotate through.
   */
  words: PropTypes.arrayOf(PropTypes.string),
  /**
   * The time in milliseconds that the transition between words takes.
   */
  speed: PropTypes.number,
  /**
   * The time in milliseconds from the end of one transition to the start of the
   * next.
   */
  delay: PropTypes.number
}

NotTypist.defaultProps = {
  words: 'This text will rotate'.split(' '),
  speed: 1000,
  delay: 1000
}

export default NotTypist
