// const commandActions = require('../../src/common/commandActions')
// const dataActions = require('../../src/common/dataActions')
const {commandActions, dataActions} = require('../../src/common')
const UserStore = require('./UserStore')

class TodoServer {
  constructor (userStore, logger) {
    this.userStore = userStore
    this.logger = logger || (() => {})
  }

  onAction (action, username) {
    return Promise.resolve()
      .then(() => {
        this.logger('action:', action)
        if (!(action && action.type && action.sendToServer)) {
          return {message: 'Should not send messages without sendToServer', events: []}
        }

        action.type = action.type.toUpperCase()
        if (!this[action.type]) {
          return {message: `Don't know how to process ${action.type} yet`, events: []} // Do nothing
        }

        return this[action.type](action, username)
      })
  }

  calcLabels({todos = [], labels = []}) {
    // console.log('calcLabels: todos', todos)
    const labelCounts = todos
      .reduce((p, c) => {
        (c.labels||[]).forEach(label => p[label] = (p[label] || 0) + 1)
        return p
      }, {})
    // console.log('calcLabels: labelCounts', labelCounts)
    labels.forEach(label => labelCounts[label.name] = labelCounts[label.name] || 0)
    this.logger('labelCounts:', labelCounts)
    return Object.keys(labelCounts).map(name => {
      return {name, count: labelCounts[name]}
    })
  }
}

TodoServer.prototype[commandActions.init.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      user.labels = this.calcLabels(user)
      return [dataActions.loadData(user.todos, user.labels)]
    })
}

TodoServer.prototype[commandActions.addTodo.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const newTodo = {
        id: user.nextId++,
        text: action.text,
        done: false
      }
      user.todos.push(newTodo)
      user.labels = this.calcLabels(user)
      return this.userStore.saveUser(username, user).then(() => newTodo)
    })
    .then(newTodo => {
      return [dataActions.todoFromServer(newTodo.text, newTodo.id, newTodo.done)]
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.deleteTodo.type] = function (action, username) {
  action.id = parseInt(action.id)
  return this.userStore.getUser(username)
    .then(user => {
      user.todos = user.todos.filter(x => x.id !== action.id)
      user.labels = this.calcLabels(user)
      return this.userStore.saveUser(username, user).then(() => user)
    })
    .then(user => {
      return [
        dataActions.deleteTodoFromServer(action.id),
        dataActions.labelListFromServer(user.labels)
      ]
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.addLabel.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.labels = todo.labels.filter(x => x !== action.labelName)
        todo.labels.unshift(action.labelName)
        user.labels = this.calcLabels(user)
        return this.userStore.saveUser(username, user)
          .then(() => ({newLabels: todo.labels, user}))
      } else {
        return {}
      }
    })
    .then(({newLabels, user}) => {
      if (newLabels) {
        return [
          dataActions.setLabelsFromServer(action.id, newLabels),
          dataActions.labelListFromServer(user.labels)
        ]
      } else {
        return []
      }
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.removeLabel.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.labels = todo.labels.filter(x => x !== action.labelName)
        user.labels = this.calcLabels(user)
        return this.userStore.saveUser(username, user).then(() => ({newLabels: todo.labels, user}))
      }
    })
    .then(({newLabels, user}) => {
      if (newLabels) {
        return [
          dataActions.setLabelsFromServer(action.id, newLabels),
          dataActions.labelListFromServer(user.labels)
        ]
      } else {
        return []
      }
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.setTodoStatus.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.done = action.newStatus
        return this.userStore.saveUser(username, user).then(() => todo)
      }
    })
    .then(changedTodo => {
      if (changedTodo) {
        return [dataActions.setTodoStatusFromServer(action.id, changedTodo.done)]
      } else {
        return []
      }
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.deleteLabel.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todos = user.todos.filter(x => x.labels.includes(action.labelName))
      todos.forEach(todo => {
        todo.labels = todo.labels.filter(x => x !== action.labelName)
      })

      user.labels = user.labels.filter(x => x.name !== action.labelName)
      return this.userStore.saveUser(username, user).then(() => ({todos, user}))
    })
    .then(({todos, user}) => {
      const response = [dataActions.labelListFromServer(user.labels)]
      todos.forEach(todo => {
        response.push(dataActions.setLabelsFromServer(todo.id, todo.labels))
      })
      return response
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

module.exports = TodoServer
