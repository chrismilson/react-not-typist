import React from 'react'
import { NotTypistProps as Props } from './types/props'
import PropTypes from 'prop-types'
import useRotate from './hooks/useRotate'

/**
 *
 * @param props
 */
const NotTypist: React.FC<Props> = props => {
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
