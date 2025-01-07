import { Component } from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { Wrapper } from './wrapper'
import { TextField } from './TextField'
import { ButtonHero } from './Buttons/ButtonHero'
import { generateId } from '../store/reducers'
import { TaskActions } from '../store/actions'

class AddTask extends Component {
  state = {
    newTasks: { taskTitle: '', taskDescription: '' },
    formErrors: { taskTitle: '', taskDescription: '' },
  }

  handleFormValidate = () => {
    let formIsValid = true
    const errors = { title: '', description: '' }

    if (this.state.taskTitle.trim() === '') {
      formIsValid = false
      errors.title = 'O título é obrigatório.'
    }

    if (this.state.taskDescription.trim() === '') {
      formIsValid = false
      errors.description = 'A descrição é obrigatória.'
    }

    this.setState({ formErrors: errors })

    return formIsValid
  }

  handleAddTask = () => {
    if (!this.handleFormValidate()) return
    const currentDate = new Date()

    this.props.addTask({
      id: generateId(),
      title: this.state.taskTitle,
      description: this.state.taskDescription,
      completed: false,
      date: dayjs(currentDate).format('DD/MM/YYYY [às] HH:mm:ss'),
    })

    this.setState({
      newTasks: { taskTitle: '', taskDescription: '' },
      formErrors: { title: '', description: '' },
    })
  }

  handleInputTitleAndDescriptionChange = event => {
    const { name, value } = event.target

    this.setState(prevState => ({
      newTasks: { ...prevState.newTasks, [name]: value },
    }))
  }

  render() {
    const { newTasks, formErrors } = this.state

    return (
      <Wrapper>
        <TextField
          name="taskTitle"
          value={newTasks.taskTitle}
          onChange={this.handleInputTitleAndDescriptionChange}
          placeholder="Digite sua tarefa"
          error={formErrors.title}
        />

        <TextField
          name="taskDescription"
          value={newTasks.taskDescription}
          onChange={this.handleInputTitleAndDescriptionChange}
          placeholder="Digite a descrição da tarefa"
          error={formErrors.description}
        />

        <ButtonHero name="Adicionar Tarefa" onClick={this.handleAddTask} />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(TaskActions.addTask(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)
