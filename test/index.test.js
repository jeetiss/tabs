/* eslint-env jest */

import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Panel, Tab, Tabs } from '../src'

const Button = ({ isActive, onClick, children }) => (
  <button disabled={isActive} onClick={onClick}>
    {children}
  </button>
)

const Testing = () => (
  <Tabs>
    <div>
      <Tab>
        <Button>tab 1</Button>
      </Tab>
      <Tab>
        <Button>tab 2</Button>
      </Tab>
    </div>

    <Panel>content 1</Panel>
    <Panel>content 2</Panel>
  </Tabs>
)

test('renders and change tabs', () => {
  const { container, queryByText } = render(<Testing />)

  expect(container).toHaveTextContent('content 1')
  expect(container).not.toHaveTextContent('content 2')

  fireEvent.click(queryByText('tab 2'))

  expect(container).not.toHaveTextContent('content 1')
  expect(container).toHaveTextContent('content 2')
})
