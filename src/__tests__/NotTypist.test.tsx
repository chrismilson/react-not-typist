import React from 'react'
import { render } from '@testing-library/react'
import NotTypist from '../NotTypist'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

test.each([
  ['Hello World!'],
  [
    'Is this the real life?',
    'Is this just fantasy?',
    'Caught in a landslide;',
    'No escape from reality.'
  ]
])('Renders first word supplied', (...words) => {
  const { getByText } = render(<NotTypist words={words} />)
  const element = getByText(words[0])
  expect(element).toBeInTheDocument()
})

test.each([
  [100, 100],
  [1000, 100],
  [100, 1000]
])('Renders second word after delay', (speed, delay) => {
  const words = ['first', 'second']
  const { getByText } = render(
    <NotTypist words={words} speed={speed} delay={delay} />
  )
  // the time taken for the first word to appear
  act(() => jest.advanceTimersByTime(speed))
  // the time until the second word should appear
  act(() => jest.advanceTimersByTime(delay))
  const element = getByText(words[1])
  expect(element).toBeInTheDocument()
})
