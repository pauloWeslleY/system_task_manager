import { Flex, Input, Text } from '@chakra-ui/react'

export function TextField({
  onChange,
  value = '',
  placeholder = '',
  name = '',
  defaultValue = '',
  error = '',
}) {
  return (
    <Flex flexDir={['column']} w={['full', 'lg']} gap={4}>
      <Input
        type="text"
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        _placeholder={{ opacity: 1, color: 'zinc.700' }}
        focusBorderColor="purple.600"
        variant="filled"
        p="1"
        w="full"
      />
      {error && (
        <Text color="red.600" fontWeight="semibold">
          {error}
        </Text>
      )}
    </Flex>
  )
}
