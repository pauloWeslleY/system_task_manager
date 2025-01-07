import { Flex, useColorModeValue } from '@chakra-ui/react'

export function SelectField({ children }) {
  return (
    <Flex
      bg={useColorModeValue('violet.200', 'blackAlpha.600')}
      flexDir={['column']}
      w={['xl']}
      align="center"
      gap="2"
      p="5"
      rounded="md"
      shadow="md"
    >
      {children}
    </Flex>
  )
}
