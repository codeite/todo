import { setLoading } from './common/dataActions'
// const WebSocket = require('ws')

export class SocketWrapper {
  constructor (store, uriPrefix ) {
    this.store = store
    this.eventQueue = []

    const loc = window.location
    const webSocketUri = uriPrefix ||
      ((loc.protocol === 'https:' ? 'wss://' : 'ws://') + loc.host);

    console.log('webSocketUri:', webSocketUri)
    var socket = new WebSocket(webSocketUri + '/', "a");

    socket.onopen = event => {
      this.socket = socket

      if (this.eventQueue.length) {
        this.eventQueue.forEach(action => {
          this.socket.send(JSON.stringify(action))
        })
        this.store.dispatch(setLoading(false))
      }
    }

    socket.onmessage = wsMessage => {
      const message = JSON.parse(wsMessage.data)
      if (message.events && Array.isArray(message.events)) {
        message.events.forEach(event => {
          this.store.dispatch(event)
        })
      }
    }

  }

  onAction (action) {
    if (!action || !action.type || !action.sendToServer) return

    this.store.dispatch(setLoading(true))

    if (this.socket) {
      this.pending++
      this.socket.send(JSON.stringify(action))
      this.store.dispatch(setLoading(false))
    } else {
      this.eventQueue.push(action)
    }

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify(action)
    // }
    // this.pending++
    // return window.fetch(this.urlPrefix + '/redux', options)
    //   .then(res => {
    //     if (!res.ok) {
    //       console.log('Action failed:', action)
    //       return res.text().then(text => ({events: [showError(res.status + ' ' + text)]}))
    //     }
    //     else return res.json()
    //   })
    //   .then(response => {
    //     console.log('response.message:', response.message)
    //     this.pending--
    //     if (this.pending === 0) {
    //       response.events.unshift(setLoading(false))
    //     }
    //     return response.events
    //   })
  }
}