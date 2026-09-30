import React from 'react'
import { render } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox
} from '../src'

expect.extend(matchers)

describe('Label', () => {
  test('renders', () => {
    const { container } = render(
      <Label />
    )
    expect(container.firstChild.tagName).toBe('LABEL')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Label ref={ref} />
    )
    expect(ref.current.tagName).toBe('LABEL')
  })
})

describe('Input', () => {
  test('renders', () => {
    const { container } = render(
      <Input />
    )
    expect(container.firstChild.tagName).toBe('INPUT')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Input ref={ref} />
    )
    expect(ref.current.tagName).toBe('INPUT')
  })
})

describe('Select', () => {
  test('renders', () => {
    const { getByRole } = render(
      <Select />
    )
    expect(getByRole('combobox').tagName).toBe('SELECT')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Select ref={ref} />
    )
    expect(ref.current.tagName).toBe('SELECT')
  })

  test('margin props are applied to the wrapping element', () => {
    const { container } = render(
      <Select mb={3} mt={2} />
    )
    expect(container.firstChild).toHaveStyleRule('margin-top', '8px')
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '16px')
  })
})

describe('Textarea', () => {
  test('renders', () => {
    const { container } = render(
      <Textarea />
    )
    expect(container.firstChild.tagName).toBe('TEXTAREA')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Textarea ref={ref} />
    )
    expect(ref.current.tagName).toBe('TEXTAREA')
  })
})

describe('Radio', () => {
  test('renders', () => {
    const { getByRole } = render(
      <Radio />
    )
    expect(getByRole('radio').type).toBe('radio')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Radio ref={ref} />
    )
    expect(ref.current.tagName).toBe('INPUT')
    expect(ref.current.type).toBe('radio')
  })
})

describe('Checkbox', () => {
  test('renders', () => {
    const { getByRole } = render(
      <Checkbox />
    )
    expect(getByRole('checkbox').type).toBe('checkbox')
  })
  test('passes ref', () => {
    const ref = React.createRef(null)
    render(
      <Checkbox ref={ref} />
    )
    expect(ref.current.tagName).toBe('INPUT')
    expect(ref.current.type).toBe('checkbox')
  })
})
