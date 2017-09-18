export const app = (state = {}, action) => {
  const newState = {
    ...state,
    todos: todos(state.todos, action)
  }
  // console.log('reducer:app newState:', newState)
  return newState
}

export const todos = (state = [], action = {}) => {
  switch(action.type) {
    case 'ADD_TODO': return [
      ...state,
      {
        id: action.id,
        text: action.text,
        done: false
      }
    ]
    case 'LOAD_DATA': return action.data
    default: return state
  }
}