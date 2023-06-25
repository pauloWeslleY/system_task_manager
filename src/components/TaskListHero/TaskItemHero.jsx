import { Flex, Text, chakra } from '@chakra-ui/react'

export function TaskItemHero({ task, children }) {
  return (
    <Flex
      flexDir={['column', 'row']}
      align="center"
      justify="space-between"
      gap={2}
      rounded="md"
      shadow="md"
      w="full"
      p={3}
      bg={task.completed ? 'whiteAlpha.100' : 'blackAlpha.500'}
    >
      <Flex
        flexDir="column"
        justify="space-around"
        textAlign={['center', 'left']}
      >
        <Text fontSize={['2xl', '3xl']} fontWeight="medium">
          Tarefa: <chakra.span color="violet.600">{task.title}</chakra.span>
        </Text>
        <Text as="span" fontWeight="regular" fontSize={['md']}>
          Descrição:{' '}
          <chakra.span color="violet.600">{task.description}</chakra.span>
        </Text>
        <Text as="span" fontWeight="light" fontSize={['xs']}>
          Data de criação:{' '}
          <chakra.span color="violet.600">{task.date}</chakra.span>
        </Text>
      </Flex>

      {children}
    </Flex>
  )
}
