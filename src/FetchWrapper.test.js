import { createStore } from 'redux';

import { ServerClient } from './serverClient'
import * as commandActions from './common/commandActions'
import { FetchWrapper } from './FetchWrapper'

describe('ServerClient', () => {
  it('should ignore unknown events', () => {
    const store = createStore(() => {})
    const server = new ServerClient(store, new FetchWrapper(store))

    store.dispatch({type: 'UNKNOWN_EVENT'})
  })

  ;[
    commandActions.init,
    commandActions.addTodo,
    commandActions.deleteTodo,
    commandActions.addTag,
    commandActions.removeTag,
    commandActions.setTodoStatus
  ].forEach(event => {
    it(`should send ${event.type} event to server`, () => {
      const store = createStore(() => {})
      const server = new ServerClient(store, new FetchWrapper(store))
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