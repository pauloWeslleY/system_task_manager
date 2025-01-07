import { TASK } from './actions'

export const generateId = () => crypto.randomUUID()

const initialState = {
  tasks: [
    {
      id: generateId(),
      title: 'Jogar',
      description: 'futebol de quadra',
      completed: false,
      date: '06/08/2024 às 12:00:00',
    },
    {
      id: generateId(),
      title: 'Andar',
      description: 'np parque',
      completed: true,
      date: '20/10/2022 às 15:00:00',
    },
  ],
  filter: 'all',
  sortOrder: 'desc',
  editModalOpen: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK.ADD:
      return { ...state, tasks: [...state.tasks, action.payload] }
    case TASK.UPDATE:
      return {
        ...state,
        editModalOpen: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
      }
    case TASK.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    case TASK.TOGGLE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }
    case TASK.FILTERED:
      return { ...state, filter: action.payload }
    case TASK.ORDER:
      return { ...state, sortOrder: action.payload }
    case TASK.OPEN_EDIT_MODAL:
      return { ...state, editModalOpen: action.payload }
    default:
      return state
  }
}
