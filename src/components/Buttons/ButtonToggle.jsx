import { Button, useColorMode } from '@chakra-ui/react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'

export function ButtonToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: 'none' }}
      w="fit-content"
      color="violet.500"
      bg="transparent"
      borderColor="violet.500"
      borderWidth="2px"
      transition="ease-in-out .4s 100ms"
      _hover={{
        bg: 'violet.500',
        color: 'whiteAlpha.900',
        borderColor: 'violet.500',
      }}
    >
      {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  )
}
