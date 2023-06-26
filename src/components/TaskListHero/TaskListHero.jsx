import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Flex, HStack, VStack } from '@chakra-ui/react'
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
import { TaskHeroBox } from '../TaskContainer/TaskHeroBox'
import { ButtonIcon } from '../Buttons/ButtonIcon'
import { InputTextLabel } from '../InputFieldHero/InputTextLabel'
import {
  closeEditModal,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onSetFilteredTask,
  onTasksOrderByCreationDate,
  onToggleTask,
  openEditModal,
} from '../../store/actions'
// Importando o idioma para o Day.js
import 'dayjs/locale/pt-br'

// Definindo o idioma padrão como português do Brasil
dayjs.locale('pt-br')

class TaskList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newTasks: {
        taskTitle: '',
        taskDescription: '',
      },
      formErrors: {
        taskTitle: '',
        taskDescription: '',
      },
    }
  }

  /**
   * @método para validar os campos do formulário
   */
  handleFormValidate = () => {
    const { taskTitle, taskDescription } = this.state.newTasks
    let formIsValid = true
    const errors = {
      title: '',
      description: '',
    }

    if (taskTitle.trim() === '') {
      formIsValid = false
      errors.title = 'O título é obrigatório.'
    }

    if (taskDescription.trim() === '') {
      formIsValid = false
      errors.description = 'A descrição é obrigatória.'
    }

    this.setState({
      formErrors: errors,
    })

    return formIsValid
  }

  /**
   * @método para adicionar a tarefa
   */
  handleAddTask = () => {
    const { taskTitle, taskDescription } = this.state.newTasks
    // Obtendo a data atual
    const currentDate = dayjs()

    if (this.handleFormValidate()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        date: currentDate.format('D [de] MMMM [de] YYYY [às] HH:mm:ss'),
      }
      this.props.onAddTask(newTask)
      // Limpar o formulário depois de adicionar uma nova tarefa
      this.setState({
        newTasks: {
          taskTitle: '',
          taskDescription: '',
        },
        formErrors: {
          title: '',
          description: '',
        },
      })
    }
  }

  /**
   * @método que excluir a tarefas por ID
   */
  handleDeleteTask = taskId => {
    this.props.onDeleteTask(taskId)
  }

  /**
   * @método que atualiza as tarefas por ID
   */
  handleUpdateTask = taskId => {
    this.props.openEditModal(taskId)
  }

  /**
   * @método que salva as informações do modal e atualiza os
   * atributos taskTitle e taskDescription
   */
  handleModalSave = () => {
    const updatedTask = {
      title: this.state.editTitle,
      description: this.state.editDescription,
    }
    this.props.onUpdateTask(this.props.updatedTaskId, updatedTask)
  }

  /**
   * @método que alterna as tarefas completadas e pendentes
   */
  handleToggleTasks = taskId => {
    this.props.onToggleTask(taskId)
  }

  /**
   * @Método que atualizar os atributo: taskTitle e taskDescription
   */
  handleInputTitleAndDescriptionChange = event => {
    const { name, value } = event.target

    this.setState(
      prevState => ({
        newTasks: {
          ...prevState.newTasks,
          [name]: value,
        },
      }),
      this.handleFormValidate
    )
  }

  /**
   * @Método para filtrar as tarefas completas ou pendentes
   */
  handleFilteredTasksChange = e => {
    const filter = e.target.value
    this.props.onSetFilteredTask(filter)
  }

  /**
   * @Método para ordenar as tarefas por data de criação
   */
  handleTasksOrderByCreationDate = e => {
    const sortOrder = e.target.value
    this.props.onTasksOrderByCreationDate(sortOrder)
  }

  /**
   * @Método para fechar o Modal
   */
  handleModalClose = () => {
    this.props.closeEditModal()
  }

  render() {
    const { tasks, filter, sortOrder, editModalOpen } = this.props
    const { newTasks, formErrors } = this.state

    // Estrutura condicional para filtrar as tarefas com base no filtro atual
    const filteredTasks =
      filter === 'completed'
        ? tasks.filter(task => task.completed)
        : filter === 'pending'
        ? tasks.filter(task => !task.completed)
        : tasks

    // Estrutura condicional que ordenar as tarefas com base na data de criação
    const sortedTasks =
      sortOrder === 'desc'
        ? filteredTasks.sort((a, b) => b.id - a.id)
        : sortOrder === 'asc'
        ? filteredTasks.sort((a, b) => a.id - b.id)
        : filteredTasks

    return (
      <TaskContainer>
        <NavBar>
          <TaskHeroBox>
            <InputFieldHero
              name="taskTitle"
              value={newTasks.taskTitle}
              onChange={this.handleInputTitleAndDescriptionChange}
              placeholder="Digite sua tarefa"
            />
            {formErrors.title && (
              <InputTextLabel>{formErrors.title}</InputTextLabel>
            )}
          </TaskHeroBox>

          <TaskHeroBox>
            <InputFieldHero
              name="taskDescription"
              value={newTasks.taskDescription}
              onChange={this.handleInputTitleAndDescriptionChange}
              placeholder="Digite a descrição da tarefa"
            />
            {formErrors.description && (
              <InputTextLabel>{formErrors.description}</InputTextLabel>
            )}
          </TaskHeroBox>
          <ButtonHero name="Adicionar Tarefa" onClick={this.handleAddTask} />
        </NavBar>

        <HStack justify="center" align="center">
          <CardSelectHero>
            <TitleHero title="Filtra por tarefas completadas" />
            <SelectHero
              value={filter}
              onChange={this.handleFilteredTasksChange}
            >
              <option value="all">Todas</option>
              <option value="completed">Completas</option>
              <option value="pending">Pendente</option>
            </SelectHero>
          </CardSelectHero>
          <CardSelectHero>
            <TitleHero title=" Filtra por Data de criação" />
            <SelectHero
              value={sortOrder}
              onChange={this.handleTasksOrderByCreationDate}
            >
              <option value="asc">Mais antigo</option>
              <option value="desc">Criado recentemente</option>
            </SelectHero>
          </CardSelectHero>
        </HStack>

        <VStack my={5}>
          {sortedTasks.map(task => (
            <TaskItemHero key={task.id} task={task}>
              <ButtonIcon
                label="Completed Task"
                icon={
                  task.completed ? <CheckIcon /> : <MdCheckBoxOutlineBlank />
                }
                onClick={() => this.handleToggleTasks(task.id)}
                color="green.600"
              />
              <ButtonIcon
                label="Updated Task"
                icon={<EditIcon />}
                onClick={() => this.handleUpdateTask(task.id)}
                color="blue.600"
              />
              <ButtonIcon
                label="Delete Task"
                icon={<DeleteIcon />}
                onClick={() => this.handleDeleteTask(task.id)}
                color="red.600"
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
  onSetFilteredTask: filter => dispatch(onSetFilteredTask(filter)),
  onTasksOrderByCreationDate: order =>
    dispatch(onTasksOrderByCreationDate(order)),
  onUpdateTask: (taskId, updatedTask) =>
    dispatch(onUpdateTask(taskId, updatedTask)),
  openEditModal: taskId => dispatch(openEditModal(taskId)),
  closeEditModal: () => dispatch(closeEditModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
