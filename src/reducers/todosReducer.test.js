import { todosReducer } from './reducers'
import * as dataActions from '../common/dataActions'

describe('todosReducer', () => {
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
    const action = dataActions.todoFromServer('a todo', 5, true)

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
    const action = dataActions.deleteTodoFromServer(5)

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should be able to load data', () => {
    const before = []
    const after = [
      {id: 0, text: 'a todo', done: false}
    ]

    const action = dataActions.loadData(
      [{id: 0, text: 'a todo', done: false}],
      []
    )

    expect(todosReducer(before, action)).toEqual(after)
  })

  it('should be set labels from server', () => {
    const before = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: false},
      {id: 14, text: 'a todo', done: false}
    ]
    const after = [
      {id: 12, text: 'a todo', done: false},
      {id: 13, text: 'a todo', done: false, labels: ['label1']},
      {id: 14, text: 'a todo', done: false},
    ]

    const action = dataActions.setLabelsFromServer(13, ['label1'])

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

    const action = dataActions.setTodoStatusFromServer(13, true)

    expect(todosReducer(before, action)).toEqual(after)
  })
})