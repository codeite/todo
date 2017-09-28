export class ServerClient {
  constructor (store, server) {
    this.store = store
    const oldDispatch = store.dispatch.bind(store)
    store.dispatch = action => {
      oldDispatch(action)
      server.onAction(action)
    }
  }
}
