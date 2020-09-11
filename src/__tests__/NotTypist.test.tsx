import React from 'react'
import { render, Matcher } from '@testing-library/react'
import NotTypist from '../NotTypist'
import { act } from 'react-dom/test-utils'

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

it.todo('changes text in the specified time')
