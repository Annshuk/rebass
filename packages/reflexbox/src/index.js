import { forwardRef } from 'react'
import styled from '@emotion/styled'
import {
  compose,
  space,
  layout,
  typography,
  color,
  flexbox,
} from 'styled-system'
import css, { get } from '@styled-system/css'
import shouldForwardProp from '@styled-system/should-forward-prop'

const sx = props => css(props.sx)(props.theme)
const base = props => css(props.__css)(props.theme)
const variant = ({
  theme,
  variant,
  tx = 'variants',
}) =>
  css(
    get(theme, tx + '.' + variant,
      get(theme, variant)
    )
  )(theme)

const styledDiv = styled('div');

const styledWithForwardProp = styledDiv.withConfig
  ? styledDiv.withConfig({ shouldForwardProp })
  : styled('div', { shouldForwardProp })

export const Box = styledWithForwardProp({
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
},
  base,
  variant,
  sx,
  props => props.css,
  compose(
    space,
    layout,
    typography,
    color,
    flexbox,
  ),
)

export const Flex = styled(Box)({
  display: 'flex'
})


export const Image = forwardRef((props, ref) =>
  <Box
    ref={ref}
    as='img'
    {...props}
    __css={{
      maxWidth: '100%',
      height: 'auto',
    }}
  />
)