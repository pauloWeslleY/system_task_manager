import { Box, Flex, Icon, chakra } from '@chakra-ui/react'
import { IoMdCheckmarkCircle } from 'react-icons/io'

export function AlertSuccess() {
  return (
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      rounded="lg"
      overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
        <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color="green.500"
            _dark={{ color: 'green.400' }}
            fontWeight="bold"
          >
            Success
          </chakra.span>
          <chakra.p
            color="gray.600"
            _dark={{ color: 'gray.200' }}
            fontSize="sm"
          >
            Your account was registered!
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  )
}
