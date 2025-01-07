import React, { Component } from 'react'
import { ButtonGroup, Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { TextField } from './TextField'
import { ButtonHero } from './Buttons/ButtonHero'
import { TaskActions } from '../store/actions'

class ModalEditTask extends Component {
  state = {
    editTask: { title: '', description: '' },
  }

  componentDidMount() {
    const { task } = this.props

    this.setState({
      editTask: { title: task.title, description: task.description },
    })
  }

  handleModalSave = taskId => {
    this.props.onUpdateTask(taskId, {
      title: this.state.editTask.title,
      description: this.state.editTask.description,
    })
  }

  handleEditInputTitleAndDescriptionChange = event => {
    const { name, value } = event.target

    this.setState(prevState => ({
      editTask: { ...prevState.editTask, [name]: value },
    }))
  }

  render() {
    const { editModalOpen, taskId } = this.props
    const { editTask } = this.state

    return (
      <div>
        {editModalOpen && (
          <div className="hero_modal__overlay">
            <div className="hero_modal">
              <Flex flexDir={['column']} gap={3} w="full">
                <span>Tarefa:</span>
                <TextField
                  name="title"
                  value={editTask.title}
                  onChange={this.handleEditInputTitleAndDescriptionChange}
                  placeholder="Digite sua tarefa de hoje"
                />
                <span>Descrição:</span>
                <TextField
                  name="description"
                  value={editTask.description}
                  onChange={this.handleEditInputTitleAndDescriptionChange}
                  placeholder="Digite a descrição da tarefa"
                />
              </Flex>

              <Flex justify="center" my={5}>
                <ButtonGroup spacing={1} w={['md']}>
                  <ButtonHero
                    name="Salvar Tarefa"
                    onClick={() => this.handleModalSave(taskId)}
                  />
                  <ButtonHero
                    name="Fechar"
                    onClick={() => this.props.openEditModal(false)}
                  />
                </ButtonGroup>
              </Flex>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  onUpdateTask: (taskId, updatedTask) => {
    dispatch(TaskActions.UPDATE(taskId, updatedTask))
  },
  openEditModal: open => dispatch(TaskActions.OPEN_EDIT_MODAL(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTask)
