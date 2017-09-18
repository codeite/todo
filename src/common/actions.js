export function init () {
  return {type: init.type}
}
init.type = 'INIT'

export function loadData (data) {
  return {type: loadData.type, data}
}
loadData.type = 'LOAD_DATA'

export function addTodo (text) {
  return {type: addTodo.type, text,}
}
addTodo.type = 'ADD_TODO'

export function todoFromServer (text, id, done) {
  return {type: todoFromServer.type, text, id, done}
}
todoFromServer.type = 'TODO_FROM_SERVER'

export function deleteTodo (id) {
  return {type: deleteTodo.type, id}
}
deleteTodo.type = 'DELETE_TODO'

export function deleteTodoFromServer (id) {
  return {type: deleteTodoFromServer.type, id}
}
deleteTodoFromServer.type = 'DELETE_TODO_FROM_SERVER'