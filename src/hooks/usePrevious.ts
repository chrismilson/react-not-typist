import { useEffect, useRef } from 'react'

/**
 * Returns the previous value of a given property.
 *
 * @param current The current value
 * @param initial The initial value
 */
export default function usePrevious<T>(current: T, initial: T): T {
  const previous = useRef(initial)

  // When there is a new current value, the cleanup will set the previous value
  // to what it should be.
  useEffect(() => {
    const memo = current
    return () => {
      previous.current = memo
    }
  }, [current])

  return previous.current
}
