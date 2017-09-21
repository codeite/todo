import { createStore } from 'redux';

import { ServerClient } from './serverClient'
import * as actions from './common/actions'
import { RealServer } from './common/realServer'

describe('ServerClient', () => {
  it('should ignore unknown events', () => {
    const store = createStore(() => {})
    const server = new ServerClient(store, new RealServer(store))

    store.dispatch({type: 'UNKNOWN_EVENT'})
  })

  ;[
    actions.init,
    actions.addTodo,
    actions.deleteTodo,
    actions.addTag,
    actions.deleteTag,
    actions.setTodoStatus,

  ].forEach(event => {
    it(`should send ${event.type} event to server`, () => {
      const store = createStore(() => {})
      const server = new ServerClient(store, new RealServer(store))
      const spy = jest.fn()

      window.fetch = (...args) => {return new Promise(
        (resolve, reject) => { spy() }
      )}

      store.dispatch(event())
      expect(spy.mock.calls.length).toBe(1);
    })
  })
})

const fakeFetch = {

}