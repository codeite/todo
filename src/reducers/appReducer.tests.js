import { appReducer } from './reducers'

describe('appReducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = {
      todos: [],
      tags: []
    }
    const action = undefined

    expect(appReducer(before, action)).toEqual(after)
  })
})