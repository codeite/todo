import {init, addTodo, deleteTodo} from './actions'

const actionsToSendToServer = [
  init.type,
  addTodo.type,
  deleteTodo.type
]

export class RealServer {
  constructor (urlPrefix) {
    this.urlPrefix = urlPrefix
  }

  onAction (action) {
    if (!action || !action.type) return Promise.resolve([])

    if (!actionsToSendToServer.includes(action.type)) {
      return Promise.resolve([])
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(action)
    }
    return window.fetch(this.urlPrefix + '/redux', options)
      .then(res => {
        if (!res.ok) throw new Error()
        else return res.json()
      })
      .then(events => {
        return events
      })
  }
}