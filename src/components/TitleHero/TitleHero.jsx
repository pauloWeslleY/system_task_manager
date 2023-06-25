import { Text } from '@chakra-ui/react'

export function TitleHero({ title }) {
  return (
    <Text as="h3" fontSize={['xl']}>
      {title}
    </Text>
  )
}
