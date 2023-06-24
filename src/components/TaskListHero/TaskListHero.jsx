/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // Importando o idioma para o Day.js
import {
  closeEditModal,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onSetFilter,
  onSetSortOrder,
  onToggleTask,
  // onUpdateTask,
  openEditModal,
} from '../../store/actions'
import { ButtonHero } from '../Buttons/ButtonHero'
// Definindo o idioma padrão como português do Brasil
dayjs.locale('pt-br')

// Obtendo a data atual
const currentDate = dayjs()

class TaskList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    taskTitle: '',
    taskDescription: '',
  }

  handleAddTask = () => {
    const { taskTitle, taskDescription } = this.state

    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        date: currentDate.format('DD/MM/YYYY'),
      }
      this.props.addTask(newTask)
      this.setState({ taskTitle: '', taskDescription: '' })
    }
  }

  handleDeleteTask = taskId => {
    this.props.deleteTask(taskId)
  }

  handleUpdateTask = taskId => {
    this.props.openEditModal(taskId)
  }

  handleToggleTask = taskId => {
    this.props.toggleTask(taskId)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFilteredChange = e => {
    const filter = e.target.value
    this.props.setFilter(filter)
  }

  handleSortOrderChange = e => {
    const sortOrder = e.target.value
    this.props.setSortOrder(sortOrder)
  }

  handleModalClose = () => {
    this.props.closeEditModal()
  }

  handleModalSave = () => {
    const updatedTask = {
      title: this.state.editTitle,
      description: this.state.editDescription,
    }
    this.props.editTask(this.props.editedTaskId, updatedTask)
  }

  render() {
    const { tasks, filter, sortOrder, editModalOpen } = this.props
    const { taskTitle, taskDescription } = this.state
    // Filtrar as tarefas com base no filtro atual
    const filteredTasks =
      filter === 'completed'
        ? tasks.filter(task => task.completed)
        : filter === 'pending'
        ? tasks.filter(task => !task.completed)
        : tasks

    // Ordenar as tarefas com base na ordem de classificação atual
    const sortedTasks =
      sortOrder === 'desc'
        ? filteredTasks.sort((a, b) => b.id - a.id)
        : sortOrder === 'asc'
        ? filteredTasks.sort((a, b) => a.id - b.id)
        : filteredTasks

    return (
      <Stack spacing={5}>
        <Flex
          align="center"
          gap={3}
          p={5}
          bg="blackAlpha.600"
          rounded="md"
          shadow="md"
          flexDir={['column', 'row']}
        >
          <Input
            type="text"
            name="taskTitle"
            value={taskTitle}
            onChange={this.handleChange}
            placeholder="Digite sua tarefa de hoje"
            _placeholder={{ opacity: 1, color: 'zinc.700' }}
            variant="flushed"
            p={1}
          />
          <Input
            type="text"
            name="taskDescription"
            value={taskDescription}
            onChange={this.handleChange}
            placeholder="Digite a descrição da tarefa"
            _placeholder={{ opacity: 1, color: 'zinc.700' }}
            variant="flushed"
            p={1}
          />
          <ButtonHero name="Adicionar Tarefa" onClick={this.handleAddTask} />
        </Flex>

        <HStack justify="center" align="center">
          <Flex
            flexDir={['column']}
            w={['xl']}
            align="center"
            bg="blackAlpha.500"
            p={5}
            rounded="md"
            shadow="md"
          >
            <Text as="h3" fontSize={['xl']}>
              Filtra por tarefas completadas
            </Text>
            <Select
              variant="flushed"
              value={filter}
              onChange={this.handleFilteredChange}
            >
              <option value="all">Todas</option>
              <option value="completed">Completas</option>
              <option value="pending">Pendente</option>
            </Select>
          </Flex>
          <Flex
            flexDir={['column']}
            align="center"
            w={['xl']}
            bg="blackAlpha.500"
            p={5}
            rounded="md"
            shadow="md"
          >
            <Text as="h3" fontSize={['xl']}>
              Filtra por Data de criação
            </Text>
            <Select
              variant="flushed"
              value={sortOrder}
              onChange={this.handleSortOrderChange}
            >
              <option value="desc">Mais antigo</option>
              <option value="asc">Criado recentemente</option>
            </Select>
          </Flex>
        </HStack>

        <VStack my={5}>
          {sortedTasks.map(task => (
            <Flex
              key={task.id}
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
              <Flex gap={2} align="center">
                <Checkbox onChange={() => this.handleToggleTask(task.id)} />
                <Flex
                  flexDir="column"
                  justify="space-around"
                  textAlign={['center', 'left']}
                >
                  <Text fontSize={['2xl', '3xl']} fontWeight="medium">
                    Titulo:{' '}
                    <chakra.span color="violet.600">{task.title}</chakra.span>
                  </Text>
                  <Text as="span" fontWeight="regular" fontSize={['md']}>
                    Descrição:{' '}
                    <chakra.span color="violet.600">
                      {task.description}
                    </chakra.span>
                  </Text>
                  <Text as="span" fontWeight="light" fontSize={['xs']}>
                    Data de criação:{' '}
                    <chakra.span color="violet.600">{task.date}</chakra.span>
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <IconButton
                  variant="outline"
                  colorScheme="green"
                  aria-label="Updated Task"
                  icon={<DeleteIcon />}
                  onClick={() => this.handleUpdateTask(task.id)}
                />
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete Task"
                  icon={<DeleteIcon />}
                  onClick={() => this.handleDeleteTask(task.id)}
                />
              </Flex>
            </Flex>
          ))}
        </VStack>

        {editModalOpen && (
          <div>
            <div>
              <div>Title:</div>
              <input
                type="text"
                value={this.state.editTitle}
                onChange={e => this.setState({ editTitle: e.target.value })}
              />
            </div>
            <div>
              <div>Description:</div>
              <input
                type="text"
                value={this.state.editDescription}
                onChange={e =>
                  this.setState({ editDescription: e.target.value })
                }
              />
            </div>
            <ButtonHero name="Salvar Tarefa" onClick={this.handleModalSave} />
            <ButtonHero name="Cancelar" onClick={this.handleModalClose} />
          </div>
        )}
      </Stack>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  filter: state.filter,
  sortOrder: state.sortOrder,
  editModalOpen: state.editModalOpen,
  editedTaskId: state.editedTaskId,
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(onAddTask(task)),
  deleteTask: taskId => dispatch(onDeleteTask(taskId)),
  toggleTask: taskId => dispatch(onToggleTask(taskId)),
  setFilter: filter => dispatch(onSetFilter(filter)),
  setSortOrder: order => dispatch(onSetSortOrder(order)),
  openEditModal: taskId => dispatch(openEditModal(taskId)),
  closeEditModal: () => dispatch(closeEditModal()),
  editTask: (taskId, updatedTask) => dispatch(onEditTask(taskId, updatedTask)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
