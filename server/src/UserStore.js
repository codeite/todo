

class UserStore {
  constructor (database, fetch, logger) {
    this.database = database
    this.fetch = fetch || require('node-fetch')
    this.logger = logger || (() => {})
  }

  getUser(username) {
    const path = this.database + 'todo/' + username
    return this.fetch(path)
      .then(res => {
        if (res.status === 404) {
          return {nextId: 1, todos: []}
        } else {
          return res.json().then(user => {
            if (!user.nextId > 0) user.nextId = 1
            if (!Array.isArray(user.todos)) user.todos = []
            user.todos.forEach(todo => {
              if (!Array.isArray(todo.labels)) todo.labels = []
            })
            if (!Array.isArray(user.labels)) user.labels = []
            return user
          })
        }
      })
  }

  saveUser (username, user) {
    const path = this.database + 'todo/' + username
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    return this.fetch(path, options)
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {throw new Error('Error: ' + res.status + ' ' + text)})
        }
      })
  }
}

module.exports = UserStore
