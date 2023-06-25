import { Flex } from '@chakra-ui/react'

export function NavBar({ children }) {
  return (
    <Flex
      align="center"
      gap={3}
      p={5}
      bg="blackAlpha.600"
      rounded="md"
      shadow="md"
      flexDir={['column', 'row']}
    >
      {children}
    </Flex>
  )
}
