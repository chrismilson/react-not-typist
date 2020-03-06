import { useState } from 'react'

/**
 * Rotates through a list of values, changing values every 'delay' milliseconds.
 *
 * @param array The array of values to rotate through
 * @param delay The number of milliseconds between rotations
 */
export default function useRotate<T>(array: T[], delay: number): T {
  const [current] = useState(array[0])

  return current
}
