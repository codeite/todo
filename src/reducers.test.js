import { app, todos } from './reducers'
import { addTodo, todoFromServer } from '../common/actions'

describe('app reducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = {
      loading: false,
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

  it('should add a todo from the server', () => {
    const before = []
    const after = [
      {
        id: 5,
        text: 'a todo',
        done: true
      }
    ]
    const action = todoFromServer('a todo', 5, true)

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

