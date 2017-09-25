function setTodoStatusFromServer (id, newStatus) {
  return {type: setTodoStatusFromServer.type, id, newStatus}
}
setTodoStatusFromServer.type = 'SET_TODO_STATUS_FROM_SERVER'

const actions = {
  loadData: (todos, tags) => ({type: actions.loadData.type, todos, tags}),
  todoFromServer: (text, id, done) => ({type: actions.todoFromServer.type, text, id, done}),
  deleteTodoFromServer: id => ({type: actions.deleteTodoFromServer.type, id}),
  setTagsFromServer: (id, tags) => ({type: actions.setTagsFromServer.type, id, tags}),
  showError: errorText => ({type: actions.showError.type, errorText}),
  setLoading: loadingState => ({type: actions.setLoading.type, loadingState}),
  setTodoStatusFromServer: (id, newStatus) => ({type: actions.setTodoStatusFromServer.type, id, newStatus}),
  tagListFromServer: tags => ({type: actions.tagListFromServer.type, tags})
}

Object.keys(actions).forEach(k => {
  actions[k].type = toUpperCase(k)
})

function toUpperCase(str) {
  if (!str) return ''

  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.toUpperCase())
    .join('_')
}

module.exports = actions