import React from 'react'
import { render } from '@testing-library/react'
import Space from '../src'

test('renders', () => {
  const { container } = render(<Space />)
  expect(container.childElementCount).toBe(0)
})

test('renders children', () => {
  const { container } = render(
    <Space>
      <div>Hello</div>
      <h2>hi</h2>
    </Space>
  )
  expect(container.children).toHaveLength(2)
  expect(container.children[0].textContent).toBe('Hello')
  expect(container.children[1].textContent).toBe('hi')
})

test('adds classNames to children', () => {
  const { container } = render(
    <Space mx={2}>
      <div>Hello</div>
      <h2>hi</h2>
    </Space>
  )
  const [firstChild, secondChild] = container.children
  expect(firstChild.className.length).toBeGreaterThan(0)
  expect(secondChild.className).toBe(firstChild.className)
})

test('merges with existing child classNames', () => {
  const { container } = render(
    <Space mx={2}>
      <div className='beep'>Hello</div>
      <h2>hi</h2>
    </Space>
  )
  expect(container.children[0].className).toMatch(/^beep\s/)
})
