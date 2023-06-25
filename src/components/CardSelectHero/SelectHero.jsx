import { Select } from '@chakra-ui/react'

export function SelectHero({ value, onChange, children }) {
  return (
    <Select variant="flushed" value={value} onChange={onChange}>
      {children}
    </Select>
  )
}
