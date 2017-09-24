const fetch = require('node-fetch')
const actions = require('../../src/common/actions')

const database = 'http://localhost:5984'

class TodoServer {
  constructor (latency) {
    this.latency = latency
  }

  onAction (action, username) {
    return Promise.resolve()
      .then(() => {
        console.log('action:', action)
        if (!(action && action.type && action.sendToServer)) return {message: `Should not send ${action.type} to server`, events: []}

        action.type = action.type.toUpperCase()
        if (!this[action.type]) {
          return {message: `Don't know how to process ${action.type} yet`, events: []} // Do nothing
        }

        return this[action.type](action, username)
      })
      .then(result => {
        if(this.latency > 0) {
          return new Promise((resolve, reject) => setTimeout(() => resolve(result), this.latency))
        } else {
          return result
        }
      })
  }

  getUser(username) {
    const path = database + '/todo/' + username
    return fetch(path)
      .then(res => {
        if (res.status === 404) {
          return {nextId: 1, todos: []}
        } else {
          return res.json().then(user => {
            if (!user.nextId > 0) user.nextId = 1
            if (!Array.isArray(user.todos)) user.todos = []
            user.todos.forEach(todo => {
              if (!Array.isArray(todo.tags)) todo.tags = []
            })
            if (!Array.isArray(user.tags)) user.tags = []
            return user
          })
        }
      })
  }

  saveUser (username, user) {
    const path = database + '/todo/' + username
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    return fetch(path, options)
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {throw new Error('Error: ' + res.status + ' ' + text)})
        }
      })
  }
}

function calcTags({todos = [], tags = []}) {
  const tagCounts = todos
    .reduce((p, c) => {
      c.tags.forEach(tag => p[tag] = (p[tag] || 0) + 1)
      return p
    }, {})
  tags.forEach(tag => tagCounts[tag.name] = tagCounts[tag.name] || 0)
  console.log('tagCounts:', tagCounts)
  return Object.keys(tagCounts).map(name => {
    return {name, count: tagCounts[name]}
  })
}

TodoServer.prototype[actions.init.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      user.tags = calcTags(user)
      return [actions.loadData(user.todos, user.tags)]
    })
}

TodoServer.prototype[actions.addTodo.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      const newTodo = {
        id: user.nextId++,
        text: action.text,
        done: false
      }
      user.todos.push(newTodo)
      user.tags = calcTags(user)
      return this.saveUser(username, user).then(() => newTodo)
    })
    .then(newTodo => {
      return [actions.todoFromServer(newTodo.text, newTodo.id, newTodo.done)]
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[actions.deleteTodo.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      user.todos = user.todos.filter(x => x.id !== action.id)
      user.tags = calcTags(user)
      return this.saveUser(username, user).then(() => ({id: action.id, user}))
    })
    .then((id, user) => {
      return [
        actions.deleteTodoFromServer(id),
        actions.tagListFromServer(calcTags(user.todos))
      ]
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

TodoServer.prototype[actions.addTag.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.tags = todo.tags.filter(x => x !== action.tagName)
        todo.tags.unshift(action.tagName)
        user.tags = calcTags(user)
        return this.saveUser(username, user)
          .then(() => ({newTags: todo.tags, user}))
      }
    })
    .then(({newTags, user}) => {
      if (newTags) {
        return [
          actions.setTagsFromServer(action.id, newTags),
          actions.tagListFromServer(user.tags)
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

TodoServer.prototype[actions.deleteTag.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.tags = todo.tags.filter(x => x !== action.tagName)
        return this.saveUser(username, user).then(() => ({newTags: todo.tags, user}))
      }
    })
    .then(({newTags, user}) => {
      if (newTags) {
        return [
          actions.setTagsFromServer(action.id, newTags),
          actions.tagListFromServer(calcTags(user.todos))
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

TodoServer.prototype[actions.setTodoStatus.type] = function (action, username) {
  return this.getUser(username)
    .then(user => {
      const todo = user.todos.find(x => x.id == action.id)
      if (todo) {
        todo.done = action.newStatus
        return this.saveUser(username, user).then(() => todo)
      }
    })
    .then(changedTodo => {
      if (changedTodo) {
        return [actions.setTodoStatusFromServer(action.id, changedTodo.done)]
      } else {
        return []
      }
    })
    .catch(err => {
      console.log('Error while adding todo:', err)
      throw err
    })
}

module.exports = TodoServer
