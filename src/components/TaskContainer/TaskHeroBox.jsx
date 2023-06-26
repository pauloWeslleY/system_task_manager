import { Flex } from '@chakra-ui/react'

export function TaskHeroBox({ children }) {
  return (
    <Flex flexDir={['column']} w="lg" gap={4}>
      {children}
    </Flex>
  )
}
