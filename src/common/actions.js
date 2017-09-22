function setTodoStatusFromServer (id, newStatus) {
  return {type: setTodoStatusFromServer.type, id, newStatus}
}
setTodoStatusFromServer.type = 'SET_TODO_STATUS_FROM_SERVER'

const actions = {
  init: () => ({type: actions.init.type, sendToServer: true}),
  loadData: (todos, tags) => ({type: actions.loadData.type, todos, tags}),
  addTodo: text => ({type: actions.addTodo.type, sendToServer: true, text}),
  todoFromServer: (text, id, done) => ({type: actions.todoFromServer.type, text, id, done}),
  deleteTodo: id => ({type: actions.deleteTodo.type, sendToServer: true, id}),
  deleteTodoFromServer: id => ({type: actions.deleteTodoFromServer.type, id}),
  addTag: (id, tagName) => ({type: actions.addTag.type, sendToServer: true, id, tagName}),
  deleteTag: (id, tagName) => ({type: actions.deleteTag.type, sendToServer: true, id, tagName}),
  setTagsFromServer: (id, tags) => ({type: actions.setTagsFromServer.type, id, tags}),
  showError: errorText => ({type: actions.showError.type, errorText}),
  setLoading: loadingState => ({type: actions.setLoading.type, loadingState}),
  setTodoStatus: (id, newStatus) => ({type: actions.setTodoStatus.type, sendToServer: true, id, newStatus}),
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