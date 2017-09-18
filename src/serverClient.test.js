import { createStore } from 'redux';

import { ServerClient } from './serverClient'
import { addTodo } from '../common/actions'
import { RealServer } from '../common/realServer'

describe('ServerClient', () => {
  it('should ignore unknown events', () => {
    const store = createStore(() => {})
    const server = new ServerClient(store, new RealServer())

    store.dispatch({type: 'UNKNOWN_EVENT'})
  })

  it('should send ADD_TODO event to server', () => {
    const store = createStore(() => {})
    const server = new ServerClient(store, new RealServer())
    const spy = jest.fn()

    window.fetch = (...args) => {return new Promise(
      (resolve, reject) => { spy() }
    )}

    store.dispatch(addTodo('todo1'))
    expect(spy.mock.calls.length).toBe(1);
  })
})

const fakeFetch = {

}