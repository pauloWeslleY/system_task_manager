import { Flex, useColorModeValue } from '@chakra-ui/react'

export function Wrapper({ children }) {
  return (
    <Flex
      align="center"
      gap={3}
      p={5}
      bg={useColorModeValue('violet.200', 'blackAlpha.600')}
      rounded="md"
      shadow="md"
      flexDir={['column', 'row']}
      mb="4"
    >
      {children}
    </Flex>
  )
}
