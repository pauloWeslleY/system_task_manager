import { Flex } from '@chakra-ui/react'

export function CardSelectHero({ children }) {
  return (
    <Flex
      flexDir={['column']}
      w={['xl']}
      align="center"
      bg="blackAlpha.500"
      p={5}
      rounded="md"
      shadow="md"
    >
      {children}
    </Flex>
  )
}
