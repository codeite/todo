// export function init () {
//   return {type: init.type}
// }
// init.type = 'INIT'

// export function loadData (data) {
//   return {type: loadData.type, data}
// }
// loadData.type = 'LOAD_DATA'

// export function addTodo (text) {
//   return {type: addTodo.type, text,}
// }
// addTodo.type = 'ADD_TODO'

// export function todoFromServer (text, id, done) {
//   return {type: todoFromServer.type, text, id, done}
// }
// todoFromServer.type = 'TODO_FROM_SERVER'

// export function deleteTodo (id) {
//   return {type: deleteTodo.type, id}
// }
// deleteTodo.type = 'DELETE_TODO'

// export function deleteTodoFromServer (id) {
//   return {type: deleteTodoFromServer.type, id}
// }
// deleteTodoFromServer.type = 'DELETE_TODO_FROM_SERVER'

function init () {
  return {type: init.type, sendToServer: true}
}
init.type = 'INIT'

function loadData (data) {
  return {type: loadData.type, data}
}
loadData.type = 'LOAD_DATA'

function addTodo (text) {
  return {type: addTodo.type, sendToServer: true, text}
}
addTodo.type = 'ADD_TODO'

function todoFromServer (text, id, done) {
  return {type: todoFromServer.type, text, id, done}
}
todoFromServer.type = 'TODO_FROM_SERVER'

function deleteTodo (id) {
  return {type: deleteTodo.type, sendToServer: true, id}
}
deleteTodo.type = 'DELETE_TODO'

function deleteTodoFromServer (id) {
  return {type: deleteTodoFromServer.type, id}
}
deleteTodoFromServer.type = 'DELETE_TODO_FROM_SERVER'

function addTag (id, tagName) {
  return {type: addTag.type, sendToServer: true, id, tagName}
}
addTag.type = 'ADD_TAG'

function deleteTag (id, tagName) {
  return {type: deleteTag.type, sendToServer: true, id, tagName}
}
deleteTag.type = 'DELETE_TAG'

function setTagsFromServer (id, tags) {
  return {type: setTagsFromServer.type, id, tags}
}
setTagsFromServer.type = 'SET_TAGS_FROM_SERVER'

function showError (errorText) {
  return {type: showError.type, errorText}
}
showError.type = 'SHOW_ERROR'

function setLoading (loadingState) {
  return {type: setLoading.type, loadingState}
}
setLoading.type = 'SET_LOADING'

function setTodoStatus (id, newStatus) {
  return {type: setTodoStatus.type, sendToServer: true, id, newStatus}
}
setTodoStatus.type = 'SET_TODO_STATUS'

function setTodoStatusFromServer (id, newStatus) {
  return {type: setTodoStatusFromServer.type, id, newStatus}
}
setTodoStatusFromServer.type = 'SET_TODO_STATUS_FROM_SERVER'

module.exports = {
  init,
  loadData,
  addTodo,
  todoFromServer,
  deleteTodo,
  deleteTodoFromServer,
  addTag,
  deleteTag,
  setTagsFromServer,
  showError,
  setLoading,
  setTodoStatus,
  setTodoStatusFromServer
}