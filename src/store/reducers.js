const initialState = {
  tasks: [],
  filter: 'all',
  sortOrder: 'desc',
  editModalOpen: false,
  editedTaskId: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
        editModalOpen: false,
        editedTaskId: null,
      }
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
      }
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        editModalOpen: true,
        editedTaskId: action.payload,
      }
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        editModalOpen: false,
        editedTaskId: null,
      }
    default:
      return state
  }
}
