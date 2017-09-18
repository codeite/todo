import {init, addTodo} from './actions'

const actionsToSendToServer = [
  init.type,
  addTodo.type
]

export class RealServer {
  constructor () {
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
      body: JSON.stringify(action)
    }
    return window.fetch('/redux', options)
      .then(res => {
        if (!res.ok()) throw new Error()
        else return res.json()
      })
      .then(events => {
        return events
      })
  }
}