import { Input } from '@chakra-ui/react'

export function InputFieldHero({ onChange, value, placeholder, name }) {
  return (
    <Input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ opacity: 1, color: 'zinc.700' }}
      variant="flushed"
      p={1}
    />
  )
}
