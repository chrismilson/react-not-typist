import React, { useLayoutEffect, useRef, useState } from 'react'
import usePrevious from './hooks/usePrevious'
import './Changer.scss'

export interface ChangerProps {
  /** The current character to display. */
  readonly char: string
  /** The time taken in miliseconds for the transition to complete */
  readonly speed: number
}

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
      width.from < width.to ? 0 : Math.floor((2 * speed) / 3)
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

export default Changer
