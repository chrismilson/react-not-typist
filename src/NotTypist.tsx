import React from 'react'
import useEdit from './hooks/useEdit'
import Changer from './Changer'
import './NotTypist.scss'

export interface NotTypistProps {
  /** The list of strings to rotate through. */
  readonly text: string
  /** The time taken for the transition between words to complete. */
  readonly speed?: number
}

/**
 * A text carousel that performs different character operations on strings to
 * transform them from one into another.
 *
 * When supplied with an array of strings,
 * it will rotate through displaying each of the strings, and the transition
 * between the strings is based on the Levenshtein distance between the strings.
 */
const NotTypist: React.FC<NotTypistProps> = ({ text, speed = 1000 }) => {
  const displayChars = useEdit(text)

  return (
    <span className="NotTypist">
      {displayChars.map(({ key, char }) => (
        <Changer key={key} char={char} speed={speed} />
      ))}
    </span>
  )
}

export default NotTypist
