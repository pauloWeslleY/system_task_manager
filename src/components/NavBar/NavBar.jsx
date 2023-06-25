import { Flex, useColorModeValue } from '@chakra-ui/react'

export function NavBar({ children }) {
  const THEME = {
    TASK_COLORS_NAVBAR: useColorModeValue('violet.200', 'blackAlpha.600'),
  }

  return (
    <Flex
      align="center"
      gap={3}
      p={5}
      bg={THEME.TASK_COLORS_NAVBAR}
      rounded="md"
      shadow="md"
      flexDir={['column', 'row']}
    >
      {children}
    </Flex>
  )
}
