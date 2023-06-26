const initialState = {
  tasks: [],
  filter: 'all',
  sortOrder: 'desc',
  editModalOpen: false,
  updatedTaskId: null,
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
        updatedTaskId: null,
      }
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        editModalOpen: true,
        updatedTaskId: action.payload,
      }
    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        editModalOpen: false,
        updatedTaskId: null,
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
    case 'SET_FILTER_TASK':
      return {
        ...state,
        filter: action.payload,
      }
    case 'SET_TASK_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
      }

    default:
      return state
  }
}
