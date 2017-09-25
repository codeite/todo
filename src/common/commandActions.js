const actions = {
  init: () => ({type: actions.init.type, sendToServer: true}),
  addTodo: text => ({type: actions.addTodo.type, sendToServer: true, text}),
  deleteTodo: id => ({type: actions.deleteTodo.type, sendToServer: true, id}),
  addTag: (id, tagName) => ({type: actions.addTag.type, sendToServer: true, id, tagName}),
  removeTag: (id, tagName) => ({type: actions.removeTag.type, sendToServer: true, id, tagName}),
  setTodoStatus: (id, newStatus) => ({type: actions.setTodoStatus.type, sendToServer: true, id, newStatus}),
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