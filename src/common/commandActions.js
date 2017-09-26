const actions = {}

function sendToServerAction(name, func) {
  const type = toUpperCase(name)
  const sendToServer = true
  actions[name] = (...args) => {
    const action =func(...args)
    action.type = type
    action.sendToServer = sendToServer
    return action
  }
  actions[name].type = type
}

sendToServerAction('init', () => ({}))
sendToServerAction('addTodo', (text) => ({text}))
sendToServerAction('deleteTodo', (id) => ({id}))
sendToServerAction('addTag', (id, tagName) => ({id, tagName}))
sendToServerAction('removeTag', (id, tagName) => ({id, tagName}))
sendToServerAction('setTodoStatus', (id, newStatus) => ({id, newStatus}))

function toUpperCase(str) {
  if (!str) return ''

  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.toUpperCase())
    .join('_')
}

module.exports = actions