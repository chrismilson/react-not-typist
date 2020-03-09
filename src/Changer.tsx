import React from 'react'
import PropTypes from 'prop-types'
import { ChangerProps } from './types/props'

const Changer: React.FC<ChangerProps> = props => {
  const { char } = props
  return <span className="Changer">{char}</span>
}

Changer.propTypes = {
  char: PropTypes.string.isRequired
}

export default Changer
