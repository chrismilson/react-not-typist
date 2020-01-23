import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
* A changer is given a character and a speed value.
* When its character prop is changed, it will animate the change from the
* previous character to the new character in 'speed' milliseconds.
*
* @param {Object} props
* @param {string} props.char
* @param {number} props.speed
*/
export default function Changer ({ char, speed }) {
  // when the character updates, the cleanup on the effect will be called,
  // setting the prev to the memorised value.
  const [[curr, prev], setDisplay] = useState(['', ''])
  useEffect(() => {
    // the current character becomes the previous
    setDisplay(([curr, prev]) => [char, curr])
  }, [char])

  // CSS will not transition auto-width elements, so we will measure the width
  // of the absolutely positioned child and set it as the width of the parent.
  const widthRef = useRef()
  const [[width, isWider], setWidth] = useState([0, false])
  useEffect(() => {
    // the current width becomes the previous
    setWidth(([oldWidth, wasWider]) => [
      widthRef.current.offsetWidth,
      oldWidth < widthRef.current.offsetWidth
    ])
  }, [curr])

  // there are two animations to complete:
  // - The widening of the parent (a transition), and;
  // - The fading or appearing (an animation) of the character.
  //
  // We want to control both the widen transition timing and the fade transition
  // independantly.
  const [fading, setFading] = useState(false)
  useEffect(() => {
    setFading(true)
  }, [char])

  return (
    <span
      className={'Changer' + (fading ? ' fading' : '')}
      style={{
        '--speed': `${Math.floor(speed / 3)}ms`,
        '--widen-delay': isWider ? `0ms` : `${Math.floor(2 * speed / 3)}ms`,
        width
      }}
    >
      <span className='previous' onAnimationEnd={() => setFading(false)}>{ prev }</span>
      <span
        ref={widthRef}
        className='current'
      >{ curr }</span>
    </span>
  )
}

Changer.propTypes = {
  char: PropTypes.string,
  speed: PropTypes.number
}

Changer.defaultProps = {
  char: '',
  speed: 0
}
