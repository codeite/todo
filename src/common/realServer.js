import * as actions from './actions'

// const actionsToSendToServer = [
//   actions.init.type,
//   actions.addTodo.type,
//   actions.deleteTodo.type,
//   actions.addTag.type,
//   actions.deleteTag.type,
//   actions.setTodoStatus.type
// ]

export class RealServer {
  constructor (store, urlPrefix) {
    this.store = store
    this.urlPrefix = urlPrefix
    this.pending = 0
  }

  onAction (action) {
    // console.log('onAction :: action:', action)
    if (!action || !action.type || !action.sendToServer) return Promise.resolve([])

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
        if (!res.ok) {
          console.log('Action failed:', actions)
          return res.text().then(text => ({events: [actions.showError(res.status + ' ' + text)]}))
        }
        else return res.json()
      })
      .then(response => {
        console.log('response.message:', response.message)
        this.pending--
        if (this.pending === 0) {
          response.events.unshift(actions.setLoading(false))
        }
        return response.events
      })
  }
}