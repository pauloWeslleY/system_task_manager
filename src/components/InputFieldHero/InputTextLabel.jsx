import { Text } from '@chakra-ui/react'

export function InputTextLabel({ children }) {
  return (
    <Text color="red.600" fontWeight="semibold">
      {children}
    </Text>
  )
}
