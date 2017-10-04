const commandActions = require('../../src/common/commandActions')
const dataActions = require('../../src/common/dataActions')
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

  calcTags({todos = [], tags = []}) {
    // console.log('calcTags: todos', todos)
    const tagCounts = todos
      .reduce((p, c) => {
        (c.tags||[]).forEach(tag => p[tag] = (p[tag] || 0) + 1)
        return p
      }, {})
    // console.log('calcTags: tagCounts', tagCounts)
    tags.forEach(tag => tagCounts[tag.name] = tagCounts[tag.name] || 0)
    this.logger('tagCounts:', tagCounts)
    return Object.keys(tagCounts).map(name => {
      return {name, count: tagCounts[name]}
    })
  }
}

TodoServer.prototype[commandActions.init.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      user.tags = this.calcTags(user)
      return [dataActions.loadData(user.todos, user.tags)]
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
      user.tags = this.calcTags(user)
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
      user.tags = this.calcTags(user)
      return this.userStore.saveUser(username, user).then(() => user)
    })
    .then(user => {
      return [
        dataActions.deleteTodoFromServer(action.id),
        dataActions.tagListFromServer(user.tags)
      ]
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[commandActions.addTag.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.tags = todo.tags.filter(x => x !== action.tagName)
        todo.tags.unshift(action.tagName)
        user.tags = this.calcTags(user)
        return this.userStore.saveUser(username, user)
          .then(() => ({newTags: todo.tags, user}))
      } else {
        return {}
      }
    })
    .then(({newTags, user}) => {
      if (newTags) {
        return [
          dataActions.setTagsFromServer(action.id, newTags),
          dataActions.tagListFromServer(user.tags)
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

TodoServer.prototype[commandActions.removeTag.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.tags = todo.tags.filter(x => x !== action.tagName)
        user.tags = this.calcTags(user)
        return this.userStore.saveUser(username, user).then(() => ({newTags: todo.tags, user}))
      }
    })
    .then(({newTags, user}) => {
      if (newTags) {
        return [
          dataActions.setTagsFromServer(action.id, newTags),
          dataActions.tagListFromServer(user.tags)
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

TodoServer.prototype[commandActions.deleteTag.type] = function (action, username) {
  return this.userStore.getUser(username)
    .then(user => {
      const todos = user.todos.filter(x => x.tags.includes(action.tagName))
      todos.forEach(todo => {
        todo.tags = todo.tags.filter(x => x !== action.tagName)
      })

      user.tags = user.tags.filter(x => x.name !== action.tagName)
      return this.userStore.saveUser(username, user).then(() => ({todos, user}))
    })
    .then(({todos, user}) => {
      const response = [dataActions.tagListFromServer(user.tags)]
      todos.forEach(todo => {
        response.push(dataActions.setTagsFromServer(todo.id, todo.tags))
      })
      return response
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

module.exports = TodoServer
