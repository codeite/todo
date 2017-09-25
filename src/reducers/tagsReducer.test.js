import { tagsReducer } from './reducers'
import * as dataActions from '../common/dataActions'

describe('tagsReducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = []
    const action = undefined

    expect(tagsReducer(before, action)).toEqual(after)
  })

  it('should be able to load data', () => {
    const before = []
    const after = [
      {name: 'tagOne'}
    ]

    const action = dataActions.loadData(
      [],
      [{name: 'tagOne'}]
    )

    expect(tagsReducer(before, action)).toEqual(after)
  })

  it('should set tags from server', () => {
    const before = []
    const after = [
      {name: 'tagOne'}
    ]

    const action = dataActions.tagListFromServer(
      [{name: 'tagOne'}]
    )

    expect(tagsReducer(before, action)).toEqual(after)
  })


})