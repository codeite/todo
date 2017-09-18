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