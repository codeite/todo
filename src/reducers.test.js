import expect, { createSpy, spyOn, isSpy } from 'expect'
import { app, todos } from './reducers'

describe('app reducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = {
      todos: []
    }
    const action = undefined

    expect(app(before, action)).toEqual(after)
  })
})


describe('todos reducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = []
    const action = undefined

    expect(todos(before, action)).toEqual(after)
  })

  it('should add a todo', () => {
    const before = []
    const after = [
      {
        id: 0,
        text: 'a todo',
        done: false
      }
    ]
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'a todo'
    }

    expect(todos(before, action)).toEqual(after)
  })

  it('should be able to load data', () => {
    const before = []
    const after = [
      {id: 0, text: 'a todo', done: false}
    ]

    const action = {
      type: 'LOAD_DATA',
      data: [
        {id: 0, text: 'a todo', done: false}
      ]
    }

    expect(todos(before, action)).toEqual(after)
  })
})

