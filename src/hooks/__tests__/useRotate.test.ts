import useRotate from '../useRotate'
import { renderHook } from '@testing-library/react-hooks'

test('Rotates through words.', () => {
  const array = ['A', 'Bee', { message: 'C' }, 4]
  const { result } = renderHook(() => useRotate(array, 100))

  for (let i = 0; i < 5; i++) {
    array.forEach(v => {
      expect(result.current).toBe(v)
      jest.advanceTimersToNextTimer()
    })
  }
})
