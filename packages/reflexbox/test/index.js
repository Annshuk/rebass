import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import {
  Box,
  Flex,
} from '../src'

describe('Box', () => {
  test('renders', () => {
    const { container } = render(
      <Box />
    )
    expect(container.firstChild.tagName).toBe('DIV')
  })

  test('renders with as prop', () => {
    const { container } = render(
      <Box as='header' />
    )
    expect(container.firstChild.tagName).toBe('HEADER')
  })

  test('renders with style props', () => {
    const { container } = render(
      <Box width={1} />
    )
    expect(container.firstChild).toHaveStyleRule('width', '100%')
  })

  test('renders with layout props', () => {
    const { container } = render(
      <Box
        display='inline-block'
        height={256}
        maxWidth={768}
      />
    )
    expect(container.firstChild).toHaveStyleRule('display', 'inline-block')
    expect(container.firstChild).toHaveStyleRule('height', '256px')
    expect(container.firstChild).toHaveStyleRule('max-width', '768px')
  })

  test('renders with color props', () => {
    const { container } = render(
      <Box
        color='tomato'
        bg='black'
      />
    )
    expect(container.firstChild).toHaveStyleRule('color', 'tomato')
    expect(container.firstChild).toHaveStyleRule('background-color', 'black')
  })

  test('renders with typography props', () => {
    const { container } = render(
      <Box
        fontSize={3}
        lineHeight={1.5}
        fontWeight='bold'
        letterSpacing='0.2em'
      />
    )
    expect(container.firstChild).toHaveStyleRule('font-size', '20px')
    expect(container.firstChild).toHaveStyleRule('line-height', '1.5')
    expect(container.firstChild).toHaveStyleRule('font-weight', 'bold')
    expect(container.firstChild).toHaveStyleRule('letter-spacing', '0.2em')
  })

  test('renders with flexbox props', () => {
    const { container } = render(
      <Box
        flex='1 1 auto'
        alignSelf='flex-start'
      />
    )
    expect(container.firstChild).toHaveStyleRule('flex', '1 1 auto')
    expect(container.firstChild).toHaveStyleRule('align-self', 'flex-start')
  })

  test('renders with box-sizing', () => {
    const { container } = render(
      <Box />
    )
    expect(container.firstChild).toHaveStyleRule('box-sizing', 'border-box')
  })

  test('renders with sx prop', () => {
    const { container } = render(
      <Box
        sx={{
          borderRadius: 2,
          border: '1px solid cyan',
        }}
      />
    )
    expect(container.firstChild).toHaveStyleRule('border-radius', '2px')
    expect(container.firstChild).toHaveStyleRule('border', '1px solid cyan')
  })

  test('renders with css prop', () => {
    const { container } = render(
      <Box
        css={{
          margin: 4,
          padding: 16,
          color: 'tomato',
        }}
      />
    )
    expect(container.firstChild).toHaveStyleRule('margin', '4px')
    expect(container.firstChild).toHaveStyleRule('padding', '16px')
    expect(container.firstChild).toHaveStyleRule('color', 'tomato')
  })

  test('removes style props', () => {
    const { container } = render(
      <Box
        color='blue'
        fontSize={2}
        width={1}
      />
    )
    expect(container.firstChild.hasAttribute('color')).toBe(false)
    expect(container.firstChild.hasAttribute('fontSize')).toBe(false)
    expect(container.firstChild.hasAttribute('width')).toBe(false)
  })

  test('renders with variants', () => {
    const { container } = render(
      <Box
        theme={{
          variants: {
            card: {
              p: 4,
              border: '1px solid tomato',
              borderRadius: 2,
            }
          }
        }}
        variant='card'
      />
    )
    expect(container.firstChild).toHaveStyleRule('padding', '32px')
    expect(container.firstChild).toHaveStyleRule('border', '1px solid tomato')
    expect(container.firstChild).toHaveStyleRule('border-radius', '2px')
  })

  test('renders with keyed variants', () => {
    const { container } = render(
      <Box
        theme={{
          buttons: {
            primary: {
              color: 'white',
              bg: 'tomato',
            }
          }
        }}
        tx='buttons'
        variant='primary'
      />
    )
    expect(container.firstChild).toHaveStyleRule('color', 'white')
    expect(container.firstChild).toHaveStyleRule('background-color', 'tomato')
  })

})

describe('Flex', () => {
  test('renders with display flex', () => {
    const { container } = render(
      <Flex />
    )
    expect(container.firstChild).toHaveStyleRule('display', 'flex')
  })

  test('renders with Box props', () => {
    const { container } = render(
      <Flex color='tomato' />
    )
    expect(container.firstChild).toHaveStyleRule('color', 'tomato')
  })

  test('as prop does not break Box props', () => {
    const { container } = render(
      <Flex
        as='footer'
        width={1 / 2}
        fontSize={3}
        color='tomato'
      />
    )
    expect(container.firstChild.tagName).toBe('FOOTER')
    expect(container.firstChild).toHaveStyleRule('width', '50%')
    expect(container.firstChild).toHaveStyleRule('font-size', '20px')
    expect(container.firstChild).toHaveStyleRule('color', 'tomato')
  })
})
