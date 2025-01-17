import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export function useTheme() {
  return extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: true,
    },
    styles: {
      global: props => ({
        body: {
          bg: mode('gray.300', 'zinc.900')(props),
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
        950: '#172554',
        900: '#1e3a8a',
        800: '#1e40af',
        700: '#1d4ed8',
        600: '#2563eb',
        500: '#0ea5e9',
        400: '#38bdf8',
        300: '#93c5fd',
        200: '#bfdbfe',
        100: '#dbeafe',
        50: '#eff6ff',
      },
      red: {
        950: '#450a0a',
        900: '#7f1d1d',
        800: '#991b1b',
        700: '#b91c1c',
        600: '#dc2626',
        500: '#ef4444',
        400: '#f87171',
        300: '#fca5a5',
        200: '#fecaca',
        100: '#fee2e2',
        50: '#fef2f2',
      },
    },
  })
}
