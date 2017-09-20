import * as actions from './actions'

const actionsToSendToServer = [
  actions.init.type,
  actions.addTodo.type,
  actions.deleteTodo.type,
  actions.addTag.type,
  actions.deleteTag.type,
  actions.setTodoStatus.type
]

export class RealServer {
  constructor (store, urlPrefix) {
    this.store = store
    this.urlPrefix = urlPrefix
    this.pending = 0
  }

  onAction (action) {
    if (!action || !action.type) return Promise.resolve([])

    if (!actionsToSendToServer.includes(action.type)) {
      return Promise.resolve([])
    }

    this.store.dispatch(actions.setLoading(true))

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(action)
    }
    this.pending++
    return window.fetch(this.urlPrefix + '/redux', options)
      .then(res => {
        if (!res.ok) return res.text().then(text => [showError(res.status + ' ' + text)])
        else return res.json()
      })
      .then(events => {
        this.pending--
        if (this.pending === 0) {
          events.unshift(setLoading(false))
        }
        return events
      })
  }
}