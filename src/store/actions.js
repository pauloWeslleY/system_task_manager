// Action para adicionar uma nova tarefa
const onAddTask = task => ({
  type: 'ADD_TASK',
  payload: task,
})
// Action para excluir uma tarefa
const onDeleteTask = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId,
})
// Action para atualizar uma tarefa
const onEditTask = updatedTask => ({
  type: 'UPDATE_TASK',
  payload: updatedTask,
})
// Action para marcar/desmarcar uma tarefa como concluída
const onToggleTask = taskId => ({
  type: 'TOGGLE_TASK',
  payload: taskId,
})

const onSetFilter = filter => ({
  type: 'SET_FILTER',
  payload: filter,
})

const onSetSortOrder = order => ({
  type: 'SET_SORT_ORDER',
  payload: order,
})

const openEditModal = taskId => ({
  type: 'OPEN_EDIT_MODAL',
  payload: taskId,
})

const closeEditModal = () => ({
  type: 'CLOSE_EDIT_MODAL',
})

export {
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onSetFilter,
  onSetSortOrder,
  openEditModal,
  closeEditModal,
}
