import * as actions from './common/actions'

export const app = (state = {}, action) => {
  const loading = (
    ((action && action.type) === actions.setLoading.type) ?
      action.loadingState :
      state.loading
  )

  const newState = {
    ...state,
    loading,
    todos: todos(state.todos, action),
    error: action && action.errorText
  }
  // console.log('reducer:app newState:', newState)
  return newState
}

export const todos = (state = [], action = {}) => {
  switch(action.type) {
    case actions.todoFromServer.type: return [
      ...state,
      {
        id: action.id,
        text: action.text,
        done: action.done
      }
    ]
    case actions.deleteTodoFromServer.type: return state.filter(x => x.id !== action.id)
    case actions.setTagsFromServer.type:
      const todo = state.find(x => x.id === action.id)
      if (!todo) return state
      return [
        ...state.filter(x => x.id < action.id),
        {...todo, tags: action.tags},
        ...state.filter(x => x.id > action.id)
      ]
    case 'LOAD_DATA': return action.data
    default: return state
  }
}