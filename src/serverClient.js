export class ServerClient {
  constructor (store, server) {
    this.store = store
    const oldDispatch = store.dispatch.bind(store)
    store.dispatch = action => {
      // console.log('action:', action)
      oldDispatch(action)
      server.onAction(action)
        .then(events => {
          if (events && Array.isArray(events)) {
            events.forEach(event => {
              this.store.dispatch(event)
            })
          }
        })
    }
    // this.store.subscribe(this.onAction)
  }
}