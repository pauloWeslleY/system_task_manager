import { ButtonGroup, Flex } from '@chakra-ui/react'

export function BtnGroupHero({ children }) {
  return (
    <Flex justify="center" my={5}>
      <ButtonGroup spacing={1} w={['md']}>
        {children}
      </ButtonGroup>
    </Flex>
  )
}
