import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

//* Configuration Dark Mode on App
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  styles: {
    global: props => ({
      body: {
        bg: mode('whiteAlpha.800', 'blackAlpha.800')(props),
        color: mode('blackAlpha.900', 'whiteAlpha.900')(props),
        fontFamily: '"Poppins", sans-serif',
      },
    }),
  },
  fonts: {
    Poppins: '"Poppins", sans-serif',
    DMSans: '"DM Sans", sans-serif',
  },
  colors: {
    zinc: {
      950: '#09090b',
      900: '#18181b',
      800: '#27272a',
      700: '#3f3f46',
      600: '#52525b',
      500: '#71717a',
      400: '#a1a1aa',
      300: '#d4d4d8',
      200: '#e4e4e7',
      100: '#f4f4f5',
      50: '#fafafa',
    },
    violet: {
      950: '#2e1065',
      900: '#4c1d95',
      800: '#5b21b6',
      700: '#6d28d9',
      600: '#7c3aed',
      500: '#8b5cf6',
      400: '#a78bfa',
      300: '#c4b5fd',
      200: '#ddd6fe ',
      100: '#ede9fe',
      50: '#f5f3ff',
    },
    emerald: {
      950: '#022c22',
      900: '#064e3b',
      800: '#065f46',
      700: '#047857',
      600: '#059669',
      500: '#10b981',
      400: '#34d399',
      300: '#6ee7b7',
      200: '#a7f3d0',
      100: '#d1fae5',
      50: '#ecfdf5',
    },
    blue: {
      800: '#1e40af',
      700: '#1d4ed8',
      600: '#2563eb',
      500: '#0ea5e9',
      400: '#38bdf8',
    },
  },
})
