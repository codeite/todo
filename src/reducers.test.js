import { appReducer, todosReducer } from './reducers'
import * as actions from './common/actions'

describe('app reducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = {
      todos: []
    }
    const action = undefined

    expect(appReducer(before, action)).toEqual(after)
  })
})


describe('todos reducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = []
    const action = undefined

    expect(todosReducer(before, action)).toEqual(after)
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
    const action = actions.todoFromServer('a todo', 5, true)

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should delete a todo from the server', () => {
    const before = [
      {id: 4, text: 'four'},
      {id: 5, text: 'five'},
      {id: 6, text: 'six'}
    ]
    const after = [
      {id: 4, text: 'four'},
      {id: 6, text: 'six'}
    ]
    const action = actions.deleteTodoFromServer(5)

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should be able to load data', () => {
    const before = []
    const after = [
      {id: 0, text: 'a todo', done: false}
    ]

    const action = actions.loadData([
      {id: 0, text: 'a todo', done: false}
    ])

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should be set tags from server', () => {
    const before = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: false},
      {id: 14, text: 'a todo', done: false}
    ]
    const after = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: false, tags: ['tag1']},
      {id: 14, text: 'a todo', done: false},
    ]

    const action = actions.setTagsFromServer(13, ['tag1'])

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should set todo status from server', () => {
    const before = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: false},
      {id: 14, text: 'a todo', done: false}
    ]
    const after = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: true},
      {id: 14, text: 'a todo', done: false},
    ]

    const action = actions.setTodoStatusFromServer(13, true)

    expect(todosReducer(before, action)).toEqual(after)
  })
})

