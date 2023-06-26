import { IconButton } from '@chakra-ui/react'

export function ButtonIcon({ label, icon, onClick, color }) {
  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={onClick}
      color={color}
      bg="transparent"
      transition="ease-in-out .4s 100ms"
      _hover={{
        bg: color,
        color: 'whiteAlpha.900',
        borderColor: color,
      }}
    />
  )
}
