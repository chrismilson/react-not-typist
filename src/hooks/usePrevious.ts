import { useRef } from 'react'

/**
 * Returns the previous value of a given property.
 *
 * @param target The value to trail
 * @param initial The initial value
 */
export default function usePrevious<T>(target: T, initial: T): T {
  const { current } = useRef({ value: initial, target })

  if (current.target !== target) {
    current.value = current.target
    current.target = target
  }

  return current.value
}
