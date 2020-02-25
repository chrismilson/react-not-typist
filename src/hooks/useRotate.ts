import { useEffect, useState } from 'react'

/**
 * When given a delay in milliseconds, rotates through supplying different
 * values of the given array.
 *
 * @param array
 * @param delay
 */
export default function useRotate<T>(array: T[], delay: number): T {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    // this function will generate the next index given the previous index.
    const nextIdx = (prev: number): number => {
      return (prev + 1) % array.length
    }

    // we update state every 'delay' miliseconds
    const interval = setInterval(() => setIdx(nextIdx), delay)

    // If the array OR the delay value change, we clear the current interval
    // before the new one is created.
    return (): void => clearInterval(interval)
  }, [array, delay])

  return array[idx]
}
