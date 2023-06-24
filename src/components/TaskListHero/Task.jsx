import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  toggleTask,
  setFilter,
  setSortOrder,
  openEditModal,
  closeEditModal,
  editTask,
} from './actions'

class TaskList extends Component {
  // código existente

  handleEditClick = taskId => {
    this.props.openEditModal(taskId)
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
    const { tasks, filter, sortOrder, editModalOpen, editedTaskId } = this.props

    // Restante do código

    return (
      <div>
        {/* Restante do código */}
        <ul>
          {sortedTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.title}</span>
              <button
                type="button"
                onClick={() => this.props.toggleTask(task.id)}
              >
                Mark as Completed
              </button>
              <button
                type="button"
                onClick={() => this.handleEditClick(task.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        {editModalOpen && (
          <div>
            <div>
              <span>Title:</span>
              <input
                type="text"
                value={this.state.editTitle}
                onChange={e => this.setState({ editTitle: e.target.value })}
              />
            </div>
            <div>
              <span>Description:</span>
              <input
                type="text"
                value={this.state.editDescription}
                onChange={e =>
                  this.setState({ editDescription: e.target.value })
                }
              />
            </div>
            <button type="button" onClick={this.handleModalSave}>
              Save
            </button>
            <button type="button" onClick={this.handleModalClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
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
  toggleTask: taskId => dispatch(toggleTask(taskId)),
  setFilter: filter => dispatch(setFilter(filter)),
  setSortOrder: order => dispatch(setSortOrder(order)),
  openEditModal: taskId => dispatch(openEditModal(taskId)),
  closeEditModal: () => dispatch(closeEditModal()),
  editTask: (taskId, updatedTask) => dispatch(editTask(taskId, updatedTask)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
