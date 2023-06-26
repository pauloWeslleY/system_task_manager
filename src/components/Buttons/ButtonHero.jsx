import { Button, useColorModeValue } from '@chakra-ui/react'

export function ButtonHero({ name, onClick }) {
  const THEME = {
    BUTTON_COLORS: useColorModeValue('purple.300', 'violet.600'),
  }

  return (
    <Button
      type="button"
      bg={THEME.BUTTON_COLORS}
      px={8}
      color="violet.100"
      rounded="md"
      size="md"
      w={['xs', 'sm']}
      maxW={['md']}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}
