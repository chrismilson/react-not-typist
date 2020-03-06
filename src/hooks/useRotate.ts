import { useState, useLayoutEffect } from 'react'

/**
 * Rotates through a list of values, changing values every 'delay' milliseconds.
 *
 * @param array The array of values to rotate through
 * @param delay The number of milliseconds between rotations
 */
export default function useRotate<T>(array: T[], delay: number): T {
  const [idx, setIdx] = useState(0)

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      // every delay ms, the index will increase.
      setIdx(i => (i + 1) % array.length)
    }, delay)
    return () => {
      clearInterval(interval)
    }
  }, [array, delay])

  return array[idx]
}
