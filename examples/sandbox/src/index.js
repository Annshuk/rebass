/* eslint no-unused-vars: 0 */
import { createRoot } from 'react-dom/client'
import preset from '@rebass/preset'
import { styled, ThemeProvider } from 'styled-components'
import {
  Box,
  Flex,
} from 'reflexbox'

import {
  Heading,
  Button,
} from 'rebass/styled-components'

const theme = {
  ...preset,
}

const Wrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper flexDirection="column" as="section"><Box>1</Box><Box>2</Box></Wrapper>
      <Box variant='styles.root'>
        <Heading as='h1' mb={4}>
          rebass Sandbox
        </Heading>
        <Button variant='primary' mr={3}>
          Beep
        </Button>
        <Button variant='outline'>
          Boop
        </Button>
      </Box>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
