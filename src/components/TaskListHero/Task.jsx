import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openEditModal, closeEditModal, editTask } from './actions'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editTitle: '',
      editDescription: '',
    }
  }

  handleEditClick = taskId => {
    const task = this.props.tasks.find(task => task.id === taskId)

    if (task) {
      this.setState({
        editTitle: task.title,
        editDescription: task.description,
      })

      this.props.openEditModal(taskId)
    }
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

  handleModalClose = () => {
    this.props.closeEditModal()
  }

  render() {
    const { tasks, editedTaskId, editModalOpen } = this.props

    return (
      <div>
        {/* Renderização das tarefas */}
        {tasks.map(task => (
          <div key={task.id}>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <button onClick={() => this.handleEditClick(task.id)}>
              Editar
            </button>
          </div>
        ))}

        {/* Modal de edição */}
        {editModalOpen && (
          <div>
            <div>
              <label>Título:</label>
              <input
                type="text"
                value={this.state.editTitle}
                onChange={e => this.setState({ editTitle: e.target.value })}
              />
            </div>
            <div>
              <label>Descrição:</label>
              <input
                type="text"
                value={this.state.editDescription}
                onChange={e =>
                  this.setState({ editDescription: e.target.value })
                }
              />
            </div>
            <button onClick={this.handleModalSave}>Salvar</button>
            <button onClick={this.handleModalClose}>Cancelar</button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  editedTaskId: state.editedTaskId,
  editTitle: state.editTitle,
  editDescription: state.editDescription,
  editModalOpen: state.editModalOpen,
})

export default connect(mapStateToProps, {
  openEditModal,
  closeEditModal,
  editTask,
})(TaskList)
