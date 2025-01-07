export const TASK = {
  ADD: 'ADD_TASK',
  DELETE: 'DELETE_TASK',
  UPDATE: 'UPDATE_TASK',
  TOGGLE: 'TOGGLE_TASK',
  FILTERED: 'FILTERED',
  ORDER: 'ORDER',
  OPEN_EDIT_MODAL: 'OPEN_EDIT_MODAL',
}

export const TaskActions = {
  addTask: task => ({
    type: TASK.ADD,
    payload: task,
  }),
  deleteTask: taskId => ({
    type: TASK.DELETE,
    payload: taskId,
  }),
  updateTask: (taskId, updatedTask) => ({
    type: TASK.UPDATE,
    payload: { taskId, updatedTask },
  }),
  toggleTask: taskId => ({
    type: TASK.TOGGLE,
    payload: taskId,
  }),
  filteredTask: filter => ({
    type: TASK.FILTERED,
    payload: filter,
  }),
  orderTask: order => ({
    type: TASK.ORDER,
    payload: order,
  }),
  openModalTaskEdit: open => ({
    type: TASK.OPEN_EDIT_MODAL,
    payload: open,
  }),
}
