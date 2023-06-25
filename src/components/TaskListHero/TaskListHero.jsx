import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Flex,
  HStack,
  IconButton,
  ButtonGroup,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import dayjs from 'dayjs'
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
import { CardSelectHero } from '../CardSelectHero/CardSelectHero'
import { TitleHero } from '../TitleHero/TitleHero'
import { NavBar } from '../NavBar/NavBar'
import { TaskItemHero } from './TaskItemHero'
import { ModalTaskHero } from '../ModalTaskHero/ModalTaskHero'

import 'dayjs/locale/pt-br' // Importando o idioma para o Day.js
import { InputFieldHero } from '../InputFieldHero/InputFieldHero'
import { SelectHero } from '../CardSelectHero/SelectHero'
// Definindo o idioma padrão como português do Brasil
dayjs.locale('pt-br')

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskTitle: '',
      taskDescription: '',
    }
  }

  handleAddTask = () => {
    const { taskTitle, taskDescription } = this.state
    // Obtendo a data atual
    const currentDate = dayjs()

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
    const task = this.props.tasks.find(tasks => tasks.id === taskId)

    if (task) {
      this.setState({
        editTitle: task.title,
        editDescription: task.description,
      })

      this.props.openEditModal(taskId)
    }
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
    const { editedTaskId, editTitle, editDescription } = this.props
    const updatedTask = {
      id: editedTaskId,
      title: editTitle,
      description: editDescription,
    }

    this.props.editTask(updatedTask)
    this.props.closeEditModal()
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
        <NavBar>
          <InputFieldHero
            name="taskTitle"
            value={taskTitle}
            onChange={this.handleChange}
            placeholder="Digite sua tarefa de hoje"
          />
          <InputFieldHero
            name="taskDescription"
            value={taskDescription}
            onChange={this.handleChange}
            placeholder="Digite a descrição da tarefa"
          />
          <ButtonHero name="Adicionar Tarefa" onClick={this.handleAddTask} />
        </NavBar>

        <HStack justify="center" align="center">
          <CardSelectHero>
            <TitleHero title="Filtra por tarefas completadas" />
            <SelectHero value={filter} onChange={this.handleFilteredChange}>
              <option value="all">Todas</option>
              <option value="completed">Completas</option>
              <option value="pending">Pendente</option>
            </SelectHero>
          </CardSelectHero>
          <CardSelectHero>
            <TitleHero title=" Filtra por Data de criação" />
            <SelectHero value={sortOrder} onChange={this.handleSortOrderChange}>
              <option value="desc">Mais antigo</option>
              <option value="asc">Criado recentemente</option>
            </SelectHero>
          </CardSelectHero>
        </HStack>

        <VStack my={5}>
          {sortedTasks.map(task => (
            <TaskItemHero key={task.id} task={task}>
              <ButtonGroup spacing={2}>
                <IconButton
                  variant="ghost"
                  colorScheme="green"
                  aria-label="Updated Task"
                  icon={
                    task.completed ? <CheckIcon /> : <MdCheckBoxOutlineBlank />
                  }
                  onClick={() => this.handleToggleTask(task.id)}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Updated Task"
                  icon={<EditIcon />}
                  onClick={() => this.handleUpdateTask(task.id)}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Delete Task"
                  icon={<DeleteIcon />}
                  onClick={() => this.handleDeleteTask(task.id)}
                />
              </ButtonGroup>
            </TaskItemHero>
          ))}
        </VStack>

        {/* Modal de edição */}
        {editModalOpen && (
          <ModalTaskHero>
            <Flex flexDir={['column']} gap={3}>
              <span>Tarefa:</span>
              <InputFieldHero
                placeholder="Digite sua tarefa de hoje"
                value={this.state.editTitle}
                onChange={e => this.setState({ editTitle: e.target.value })}
              />
              <span>Descrição:</span>
              <InputFieldHero
                placeholder="Digite a descrição da tarefa"
                value={this.state.editDescription}
                onChange={e =>
                  this.setState({ editDescription: e.target.value })
                }
              />
            </Flex>

            <Flex justify="center" my={5}>
              <ButtonGroup spacing={1} w={['md']}>
                <ButtonHero
                  name="Salvar Tarefa"
                  onClick={this.handleModalSave}
                />
                <ButtonHero name="Cancelar" onClick={this.handleModalClose} />
              </ButtonGroup>
            </Flex>
          </ModalTaskHero>
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
  editTask: updatedTask => dispatch(onEditTask(updatedTask)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
