import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ChangerProps } from './types/props'
import usePrevious from './hooks/usePrevious'

const Changer: React.FC<ChangerProps> = props => {
  const { char: to, speed } = props
  const from = usePrevious(to, '')

  const widthRef = useRef<HTMLSpanElement>()
  const [width, setWidth] = useState({ from: 0, to: 0 })
  useLayoutEffect(() => {
    setWidth(({ to }) => {
      return {
        from: to,
        to: widthRef.current.offsetWidth
      }
    })
  }, [to])

  const [fading, setFading] = useState(false)
  useLayoutEffect(() => {
    setFading(true)
  }, [to])

  const styles = {
    '--speed': `${Math.floor(speed / 3)}ms`,
    '--widen-delay': `${
      width.from > width.to ? 0 : Math.floor((2 * speed) / 3)
    }ms`,
    width: width.to
  }

  return (
    <span className={'Changer' + (fading ? ' fading' : '')} style={styles}>
      <span className="from" onAnimationEnd={() => setFading(false)}>
        {from}
      </span>
      <span ref={widthRef} className="to">
        {to}
      </span>
    </span>
  )
}

Changer.propTypes = {
  char: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

export default Changer
