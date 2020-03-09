import React from 'react'
import { render } from '@testing-library/react'
import NotTypist from '../NotTypist'

const testCases = [
  ['Hello World!'],
  [
    'Is this the real life?',
    'Is this just fantasy?',
    'Caught in a landslide;',
    'No escape from reality.'
  ]
]

test.each(testCases)('Renders first word supplied', (...words) => {
  const { getByText } = render(<NotTypist words={words} />)
  const element = getByText(words[0])
  expect(element).toBeInTheDocument()
})
