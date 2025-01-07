import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { useTheme } from './useTheme'

export function ThemeProvider({ children }) {
  const theme = useTheme()

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  )
}
