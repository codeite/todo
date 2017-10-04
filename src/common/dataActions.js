function setTodoStatusFromServer (id, newStatus) {
  return {type: setTodoStatusFromServer.type, id, newStatus}
}
setTodoStatusFromServer.type = 'SET_TODO_STATUS_FROM_SERVER'

const actions = {
  loadData: (todos, labels) => ({type: actions.loadData.type, todos, labels}),
  todoFromServer: (text, id, done) => ({type: actions.todoFromServer.type, text, id, done}),
  deleteTodoFromServer: id => ({type: actions.deleteTodoFromServer.type, id}),
  setLabelsFromServer: (id, labels) => ({type: actions.setLabelsFromServer.type, id, labels}),
  showError: errorText => ({type: actions.showError.type, errorText}),
  setLoading: loadingState => ({type: actions.setLoading.type, loadingState}),
  setTodoStatusFromServer: (id, newStatus) => ({type: actions.setTodoStatusFromServer.type, id, newStatus}),
  labelListFromServer: labels => ({type: actions.labelListFromServer.type, labels})
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