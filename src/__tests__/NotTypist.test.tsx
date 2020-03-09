import React from 'react'
import { render, Matcher } from '@testing-library/react'
import NotTypist from '../NotTypist'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

/**
 * Returns a matcher for testing-library that looks at the textcontent of nodes.
 * for example
 *
 * ```html
 * <div>
 *  Hello <strong>World!</strong>
 * </div>
 * ```
 *
 * ```js
 * getByText('Hello World!') // fails
 * getByText(/Hello World!/) // fails
 *
 * getByText(withMarkup('Hello World!')) // passes
 * getByText(withMarkup(/Hello World!/)) // passes
 * ```
 *
 * @param regexpOrString A regular expression or a string - if a string is
 * provided it will be transformed into a regular expression with new
 * RegExp(string)
 */
const withMarkup = (regexpOrString: string | RegExp): Matcher => {
  const regexp =
    typeof regexpOrString === 'string'
      ? new RegExp(regexpOrString)
      : regexpOrString
  const hasText = node => regexp.test(node.textContent)

  return (_content, node) => {
    const nodeHasText = hasText(node)
    const childrenDontHaveText = Array.from(node.children).every(
      child => !hasText(child)
    )
    return nodeHasText && childrenDontHaveText
  }
}

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
  const element = getByText(withMarkup(words[0]))
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
  const element = getByText(withMarkup(words[1]))
  expect(element).toBeInTheDocument()
})
