import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, HStack, VStack, IconButton } from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import dayjs from 'dayjs'
import { ButtonHero } from '../Buttons/ButtonHero'
import { CardSelectHero } from '../CardSelectHero/CardSelectHero'
import { TitleHero } from '../TitleHero/TitleHero'
import { NavBar } from '../NavBar/NavBar'
import { TaskItemHero } from './TaskItemHero'
import { ModalTaskHero } from '../ModalTaskHero/ModalTaskHero'
import { InputFieldHero } from '../InputFieldHero/InputFieldHero'
import { SelectHero } from '../CardSelectHero/SelectHero'
import { TaskContainer } from '../TaskContainer/TaskContainer'
import { BtnGroupHero } from '../Buttons/BtnGroupHero'
import {
  closeEditModal,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onSetFilter,
  onSortByCreationDate,
  onToggleTask,
  openEditModal,
} from '../../store/actions'
// Importando o idioma para o Day.js
import 'dayjs/locale/pt-br'

// Definindo o idioma padrão como português do Brasil
dayjs.locale('pt-br')

class TaskList extends Component {
  state = {
    taskTitle: '',
    taskDescription: '',
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
      this.props.onAddTask(newTask)
      this.setState({ taskTitle: '', taskDescription: '' })
    }
  }

  handleDeleteTask = taskId => {
    this.props.onDeleteTask(taskId)
  }

  handleUpdateTask = taskId => {
    this.props.openEditModal(taskId)
  }

  handleModalSave = () => {
    const updatedTask = {
      title: this.state.editTitle,
      description: this.state.editDescription,
    }
    this.props.onUpdateTask(this.props.updatedTaskId, updatedTask)
  }

  handleToggleTask = taskId => {
    this.props.onToggleTask(taskId)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFilteredChange = e => {
    const filter = e.target.value
    this.props.onSetFilter(filter)
  }

  handleSortByCreationDate = e => {
    const sortOrder = e.target.value
    this.props.onSortByCreationDate(sortOrder)
  }

  handleModalClose = () => {
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

    // Ordenar as tarefas com base na data de criação
    const sortedTasks =
      sortOrder === 'desc'
        ? filteredTasks.sort((a, b) => b.id - a.id)
        : sortOrder === 'asc'
        ? filteredTasks.sort((a, b) => a.id - b.id)
        : filteredTasks

    return (
      <TaskContainer>
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
            <SelectHero
              value={sortOrder}
              onChange={this.handleSortByCreationDate}
            >
              <option value="desc">Mais antigo</option>
              <option value="asc">Criado recentemente</option>
            </SelectHero>
          </CardSelectHero>
        </HStack>

        <VStack my={5}>
          {sortedTasks.map(task => (
            <TaskItemHero key={task.id} task={task}>
              <IconButton
                variant="ghost"
                colorScheme="green"
                aria-label="Completed Task"
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
                value={this.state.title}
                onChange={e => this.setState({ editTitle: e.target.value })}
              />
              <span>Descrição:</span>
              <InputFieldHero
                placeholder="Digite a descrição da tarefa"
                value={this.state.description}
                onChange={e =>
                  this.setState({ editDescription: e.target.value })
                }
              />
            </Flex>

            <BtnGroupHero>
              <ButtonHero name="Salvar Tarefa" onClick={this.handleModalSave} />
              <ButtonHero name="Fechar" onClick={this.handleModalClose} />
            </BtnGroupHero>
          </ModalTaskHero>
        )}
      </TaskContainer>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  filter: state.filter,
  sortOrder: state.sortOrder,
  editModalOpen: state.editModalOpen,
  updatedTaskId: state.updatedTaskId,
})

const mapDispatchToProps = dispatch => ({
  onAddTask: task => dispatch(onAddTask(task)),
  onDeleteTask: taskId => dispatch(onDeleteTask(taskId)),
  onToggleTask: taskId => dispatch(onToggleTask(taskId)),
  onSetFilter: filter => dispatch(onSetFilter(filter)),
  onSortByCreationDate: order => dispatch(onSortByCreationDate(order)),
  onUpdateTask: (taskId, updatedTask) =>
    dispatch(onUpdateTask(taskId, updatedTask)),
  openEditModal: taskId => dispatch(openEditModal(taskId)),
  closeEditModal: () => dispatch(closeEditModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
