import { Select } from '@chakra-ui/react'

export function SelectHero({ value, onChange, children }) {
  return (
    <Select
      variant="flushed"
      focusBorderColor="purple.600"
      value={value}
      onChange={onChange}
    >
      {children}
    </Select>
  )
}
