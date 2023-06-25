import { Flex, useColorModeValue } from '@chakra-ui/react'

export function CardSelectHero({ children }) {
  const THEME = {
    TASK_COLORS_SELECT: useColorModeValue('violet.200', 'blackAlpha.600'),
  }

  return (
    <Flex
      flexDir={['column']}
      w={['xl']}
      align="center"
      bg={THEME.TASK_COLORS_SELECT}
      p={5}
      rounded="md"
      shadow="md"
    >
      {children}
    </Flex>
  )
}
