import { renderHook, act } from '@testing-library/react-hooks'
import usePrevious from '../usePrevious'

const cases = [
  ['initial', 'first', 'second', 'third'],
  ['horse', 'house', 'beast', 'clean', 'mouse', 'special']
]

test.each(cases)('Provides correct initial value', (initial, ...values) => {
  const { result } = renderHook(() => usePrevious(values[0], initial))

  expect(result.current).toBe(initial)
})

test.each(cases)(
  'Provides correct value after changes',
  (initial, ...values) => {
    let current = values[0]
    const { result, rerender } = renderHook(() => usePrevious(current, initial))

    for (let i = 1; i < values.length; i++) {
      act(() => {
        current = values[i]
        rerender()
      })

      expect(result.current).toBe(values[i - 1])
    }
  }
)

test.each(cases)(
  'Provides correct value after rerender and no change',
  (initial, ...values) => {
    const current = values[0]
    const { result, rerender } = renderHook(() => usePrevious(current, initial))

    expect(result.current).toBe(initial)
    rerender() // no change - only update
    expect(result.current).toBe(initial)
  }
)
