import useRotate from '../useRotate'
import { renderHook } from '@testing-library/react-hooks'

test('Rotates through words.', () => {
  const array = ['A', 'Bee', { message: 'C' }, 4]
  const { result } = renderHook(() => useRotate(array, 100))

  array.forEach(v => {
    expect(result.current).toBe(v)
    jest.advanceTimersToNextTimer()
  })
})

test('Rotates on time.', () => {
  const delay = 1000
  const array = ['A', 'B']
  const { result } = renderHook(() => useRotate(array, delay))

  expect(result.current).toBe(array[0])
  jest.advanceTimersByTime(delay)
  expect(result.current).toBe(array[1])
})

test('Returns to beginning', () => {
  const array = ['A', 'B']
  const { result } = renderHook(() => useRotate(array, 100))

  expect(result.current).toBe(array[0])
  jest.advanceTimersToNextTimer(array.length)
  expect(result.current).toBe(array[0])
})
