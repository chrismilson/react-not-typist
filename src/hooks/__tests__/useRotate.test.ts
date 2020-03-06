import useRotate from '../useRotate'
import { renderHook, act } from '@testing-library/react-hooks'

jest.useFakeTimers()

test('Rotates through words.', () => {
  const array = ['A', 'Bee', { message: 'C' }, 4]
  const { result } = renderHook(() => useRotate(array, 100))
  act(() => jest.advanceTimersByTime(1))

  array.forEach(v => {
    expect(result.current).toBe(v)
    act(() => jest.advanceTimersToNextTimer())
  })
})

test('Rotates on time.', () => {
  const delay = 1000
  const array = ['A', 'B']
  const { result } = renderHook(() => useRotate(array, delay))

  expect(result.current).toBe(array[0])
  act(() => jest.advanceTimersByTime(delay))
  expect(result.current).toBe(array[1])
})

test('Returns to beginning', () => {
  const array = ['A', 'B']
  const { result } = renderHook(() => useRotate(array, 100))
  act(() => jest.advanceTimersByTime(1))

  expect(result.current).toBe(array[0])
  act(() => jest.advanceTimersToNextTimer(array.length))
  expect(result.current).toBe(array[0])
})
