import { setLoading, showError } from './common/dataActions'

export class FetchWrapper {
  constructor (store, urlPrefix) {
    this.store = store
    this.urlPrefix = urlPrefix
    this.pending = 0
  }

  onAction (action) {
    // console.log('onAction :: action:', action)
    if (!action || !action.type || !action.sendToServer) return Promise.resolve([])

    this.store.dispatch(setLoading(true))

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
          console.log('Action failed:', action)
          return res.text().then(text => ({events: [showError(res.status + ' ' + text)]}))
        }
        else return res.json()
      })
      .then(response => {
        console.log('response.message:', response.message)
        this.pending--
        if (this.pending === 0) {
          response.events.unshift(setLoading(false))
        }
        return response.events
      })
      .then(events => {
        if (events && Array.isArray(events)) {
          events.forEach(event => {
            this.store.dispatch(event)
          })
        }
      })
  }
}