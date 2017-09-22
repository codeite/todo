import * as actions from '../common/actions'

export const appReducer = (state = {}, action = {}) => {
  switch (action) {
    case actions.setLoading.type:
      return {...state, loading: action.loadingState }
    default: break;
  }

  return {
    ...state,
    todos: todosReducer(state.todos, action),
    tags: tagsReducer(state.tags, action),
    error: action && action.errorText
  }
}

export const todosReducer = (todos = [], action = {}) => {
  const newTodos = todos.map(todo => todoReducer(todo, action))

  switch(action.type) {
    case actions.todoFromServer.type: return [
      ...newTodos,
      {
        id: action.id,
        text: action.text,
        done: action.done
      }
    ]
    case actions.deleteTodoFromServer.type: return newTodos.filter(x => x.id !== action.id)
    case actions.loadData.type: return action.todos
    default: break
  }
  return newTodos
}

export const tagsReducer = (tags = [], action = {}) => {
  switch(action.type) {
    case actions.loadData.type: return action.tags
    case actions.tagListFromServer.type: return action.tags
    default: break
  }

  return tags
}

const todoReducer = (todo = {}, action = {}) => {
  if (!(action.id === todo.id || action.todoId === todo.id)) return todo
  switch (action.type) {
    case actions.setTodoStatusFromServer.type:
      return {...todo, done: action.newStatus}
    case actions.setTagsFromServer.type:
      return {...todo, tags: action.tags}
    default: return todo
  }
}