import { labelsReducer } from './reducers'
import * as dataActions from '../common/dataActions'

describe('labelsReducer', () => {
  it('should return correct initial state', () => {
    const before = undefined
    const after = []
    const action = undefined

    expect(labelsReducer(before, action)).toEqual(after)
  })

  it('should be able to load data', () => {
    const before = []
    const after = [
      {name: 'labelOne'}
    ]

    const action = dataActions.loadData(
      [],
      [{name: 'labelOne'}]
    )

    expect(labelsReducer(before, action)).toEqual(after)
  })

  it('should set labels from server', () => {
    const before = []
    const after = [
      {name: 'labelOne'}
    ]

    const action = dataActions.labelListFromServer(
      [{name: 'labelOne'}]
    )

    expect(labelsReducer(before, action)).toEqual(after)
  })


})