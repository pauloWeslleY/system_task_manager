import {
  ButtonGroup,
  Flex,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'

export function TaskItemHero({ task, children }) {
  const THEME = {
    TASK_COLORS_TITLE: useColorModeValue('violet.100', 'whiteAlpha.900'),
    TASK_COLORS_TITLE_COMPLETED: useColorModeValue('gray.600', 'zinc.800'),
    TASK_COLORS_SPAN: useColorModeValue('violet.100', 'violet.600'),
    TASK_COLORS_SPAN_COMPLETED: useColorModeValue('gray.600', 'emerald.900'),
    TASK_COLORS_CARD: useColorModeValue('purple.300', 'blackAlpha.500'),
    TASK_COLORS_CARD_COMPLETED: useColorModeValue('green.300', 'emerald.500'),
  }

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
      bg={
        task.completed
          ? THEME.TASK_COLORS_CARD_COMPLETED
          : THEME.TASK_COLORS_CARD
      }
    >
      <Flex
        flexDir="column"
        justify="space-around"
        textAlign={['center', 'left']}
      >
        <Text
          fontSize={['2xl', '3xl']}
          fontWeight="medium"
          color={
            task.completed
              ? THEME.TASK_COLORS_TITLE_COMPLETED
              : THEME.TASK_COLORS_TITLE
          }
        >
          Tarefa:{' '}
          <chakra.span
            color={
              task.completed
                ? THEME.TASK_COLORS_SPAN_COMPLETED
                : THEME.TASK_COLORS_SPAN
            }
          >
            {task.title}
          </chakra.span>
        </Text>
        <Text
          as="span"
          fontWeight="regular"
          fontSize={['md']}
          color={
            task.completed
              ? THEME.TASK_COLORS_TITLE_COMPLETED
              : THEME.TASK_COLORS_TITLE
          }
        >
          Descrição:{' '}
          <chakra.span
            color={
              task.completed
                ? THEME.TASK_COLORS_SPAN_COMPLETED
                : THEME.TASK_COLORS_SPAN
            }
          >
            {task.description}
          </chakra.span>
        </Text>
        <Text
          as="span"
          fontWeight="light"
          fontSize={['xs']}
          color={
            task.completed
              ? THEME.TASK_COLORS_TITLE_COMPLETED
              : THEME.TASK_COLORS_TITLE
          }
        >
          Data de criação:{' '}
          <chakra.span
            color={
              task.completed
                ? THEME.TASK_COLORS_SPAN_COMPLETED
                : THEME.TASK_COLORS_SPAN
            }
          >
            {task.date}
          </chakra.span>
        </Text>
      </Flex>

      <ButtonGroup spacing={2}>{children}</ButtonGroup>
    </Flex>
  )
}
