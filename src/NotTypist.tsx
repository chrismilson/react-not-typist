import React from 'react'
import { NotTypistProps } from './types/props'
import PropTypes from 'prop-types'
import useRotate from './hooks/useRotate'

/**
 * A text carousel that performs different character operations on strings to
 * transform them from one into another.
 *
 * When supplied with an array of strings,
 * it will rotate through displaying each of the strings, and the transition
 * between the strings is based on the Levenshtein distance between the strings.
 */
const NotTypist: React.FC<NotTypistProps> = props => {
  const { words, speed, delay } = props

  const display = useRotate(words, speed + delay)

  return <span className="NotTypist">{display}</span>
}

NotTypist.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  speed: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired
}

NotTypist.defaultProps = {
  words: ['this was', 'made by', 'chris milson'],
  speed: 1000,
  delay: 1000
}

export default NotTypist
