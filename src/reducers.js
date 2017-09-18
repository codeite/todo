import { init, addTodo, todoFromServer, loadData } from '../common/actions'

export const app = (state = {}, action) => {
  const loading = (action => {
    action = action || {}
    switch(action.type) {
      case init.type:
      case addTodo.type:
        return true;
      case undefined:
      case todoFromServer.type:
      case loadData.type:
        return false;
      default:
        return null;
    }
  })(action)

  const newState = {
    ...state,
    loading: loading !== null ? loading : state.loading,
    todos: todos(state.todos, action)
  }
  // console.log('reducer:app newState:', newState)
  return newState
}

export const todos = (state = [], action = {}) => {
  switch(action.type) {
    case todoFromServer.type: return [
      ...state,
      {
        id: action.id,
        text: action.text,
        done: action.done
      }
    ]
    case 'LOAD_DATA': return action.data
    default: return state
  }
}