import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import {
  Text,
  Heading,
  Button,
  Link,
  Image,
  Card,
} from '../src'

describe('Text', () => {
  test('renders', () => {
    const { container } = render(
      <Text textAlign='center' fontWeight='bold' fontStyle='italic' />
    )
    expect(container.firstChild.tagName).toBe('DIV')
    expect(container.firstChild).toHaveStyleRule('text-align', 'center')
    expect(container.firstChild).toHaveStyleRule('font-weight', 'bold')
    expect(container.firstChild).toHaveStyleRule('font-style', 'italic')
  })

  test('renders with text variants', () => {
    const { container } = render(
      <Text
        theme={{
          text: {
            caps: {
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }
          }
        }}
        variant='caps'
      />
    )
    expect(container.firstChild).toHaveStyleRule('text-transform', 'uppercase')
    expect(container.firstChild).toHaveStyleRule('letter-spacing', '0.2em')
  })
})

describe('Heading', () => {
  test('renders', () => {
    const { container } = render(
      <Heading />
    )
    expect(container.firstChild.tagName).toBe('H2')
    expect(container.firstChild).toHaveStyleRule('font-size', '24px')
    expect(container.firstChild).toHaveStyleRule('font-weight', 'heading')
  })

  test('renders with text variants', () => {
    const { container } = render(
      <Heading
        theme={{
          text: {
            display: {
              fontSize: 64,
              fontWeight: 900,
            }
          }
        }}
        variant='display'
      />
    )
    expect(container.firstChild).toHaveStyleRule('font-size', '64px')
    expect(container.firstChild).toHaveStyleRule('font-weight', '900')
  })
})

describe('Button', () => {
  test('renders', () => {
    const { container } = render(
      <Button />
    )
    expect(container.firstChild.tagName).toBe('BUTTON')
    expect(container.firstChild).toHaveStyleRule('color', 'white')
    expect(container.firstChild).toHaveStyleRule('background-color', 'primary')
  })

  test('renders as <a>', () => {
    const { container } = render(
      <Button as='a' />
    )
    expect(container.firstChild.tagName).toBe('A')
  })
})

describe('Link', () => {
  test('renders', () => {
    const { container } = render(
      <Link />
    )
    expect(container.firstChild.tagName).toBe('A')
  })

  test('renders with theme', () => {
    const { container } = render(
      <Link
        theme={{
          variants: {
            link: {
              color: 'primary',
            }
          }
        }}
      />
    )
    expect(container.firstChild).toHaveStyleRule('color', 'primary')
  })
})

describe('Image', () => {
  test('renders', () => {
    const { container } = render(
      <Image />
    )
    expect(container.firstChild.tagName).toBe('IMG')
    expect(container.firstChild).toHaveStyleRule('max-width', '100%')
  })
})

describe('Card', () => {
  test('renders', () => {
    const { container } = render(
      <Card
        p={3}
        bg='tomato'
        sx={{
          borderRadius: 8,
          boxShadow: '0 0 48px tomato',
        }}
      />
    )
    expect(container.firstChild.tagName).toBe('DIV')
    expect(container.firstChild).toHaveStyleRule('padding', '16px')
    expect(container.firstChild).toHaveStyleRule('background-color', 'tomato')
    expect(container.firstChild).toHaveStyleRule('border-radius', '8px')
    expect(container.firstChild).toHaveStyleRule('box-shadow', '0 0 48px tomato')
  })

  test('renders with default variant', () => {
    const { container } = render(
      <Card
        theme={{
          variants: {
            card: {
              p: 3,
              bg: 'tomato',
              borderRadius: 4,
            }
          }
        }}
      />
    )
    expect(container.firstChild).toHaveStyleRule('padding', '16px')
    expect(container.firstChild).toHaveStyleRule('background-color', 'tomato')
    expect(container.firstChild).toHaveStyleRule('border-radius', '4px')
  })
})
