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
const onUpdateTask = (taskId, updatedTask) => ({
  type: 'UPDATE_TASK',
  payload: { taskId, updatedTask },
})

// Action para marcar/desmarcar uma tarefa como concluída
const onToggleTask = taskId => ({
  type: 'TOGGLE_TASK',
  payload: taskId,
})

// Action para filtrar uma tarefa como completada ou pendente
const onSetFilteredTask = filter => ({
  type: 'SET_FILTER_TASK',
  payload: filter,
})

// Action para ordenar uma tarefa por data de criação
const onTasksOrderByCreationDate = order => ({
  type: 'SET_TASK_ORDER',
  payload: order,
})

// Action para editar Modal
const openEditModal = taskId => ({
  type: 'OPEN_EDIT_MODAL',
  payload: taskId,
})

// Action para fechar Modal
const closeEditModal = () => ({
  type: 'CLOSE_EDIT_MODAL',
})

export {
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  onSetFilteredTask,
  onTasksOrderByCreationDate,
  openEditModal,
  closeEditModal,
}
