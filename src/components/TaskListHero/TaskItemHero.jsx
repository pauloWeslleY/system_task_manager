import {
  ButtonGroup,
  Flex,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { connect } from 'react-redux'
import { ButtonIcon } from '../Buttons/ButtonIcon'
import { TaskActions } from '../../store/actions'

function TaskItemHero({ task, toggleTask, onDeleteTask, openEditModal }) {
  const THEME = {
    TASK_COLORS_TITLE: useColorModeValue('zinc.700', 'whiteAlpha.900'),
    TASK_COLORS_TITLE_COMPLETED: useColorModeValue('zinc.800', 'zinc.950'),
    TASK_COLORS_SPAN: useColorModeValue('violet.700', 'violet.600'),
    TASK_COLORS_SPAN_COMPLETED: useColorModeValue('green.800', 'emerald.900'),
    TASK_COLORS_CARD: useColorModeValue('violet.100', 'blackAlpha.500'),
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
          fontWeight="semibold"
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
          fontWeight="medium"
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
          fontWeight="medium"
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

      <ButtonGroup spacing={2}>
        <ButtonIcon
          label="Completed Task"
          icon={task.completed ? <CheckIcon /> : <MdCheckBoxOutlineBlank />}
          onClick={() => toggleTask(task.id)}
          color="green.600"
        />
        <ButtonIcon
          label="Updated Task"
          icon={<EditIcon />}
          onClick={() => openEditModal(true)}
          color="blue.600"
        />
        <ButtonIcon
          label="Delete Task"
          icon={<DeleteIcon />}
          onClick={() => onDeleteTask(task.id)}
          color="red.600"
        />
      </ButtonGroup>
    </Flex>
  )
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  openModalTaskEdit: open => dispatch(TaskActions.openModalTaskEdit(open)),
  deleteTask: taskId => dispatch(TaskActions.deleteTask(taskId)),
  toggleTask: taskId => dispatch(TaskActions.toggleTask(taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemHero)
