
import * as allActions from './actions'

describe('allActions', () => {
  it('should only contain valid actions', () => {
    Object.keys(allActions).forEach(key => {
      let obj = allActions[key];

      expect(obj.type).toEqual(toUpperCase(key))
      expect(obj().type).toEqual(toUpperCase(key))
    })
  })
})

function toUpperCase(str) {
  if (!str) return ''

  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.toUpperCase())
    .join('_')
}