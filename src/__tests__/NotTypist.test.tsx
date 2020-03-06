import React from 'react'
import { render } from '@testing-library/react'
import NotTypist from '../NotTypist'

test('Renders words supplied.', () => {
  const { getByText } = render(<NotTypist words={['Hello World!']} />)
  const element = getByText('Hello World!')
  expect(element).toBeInTheDocument()
})
