
import * as dataActions from './dataActions'

describe('dataActions.js', () => {
  it('should only contain valid actions', () => {
    Object.keys(dataActions).filter(x => x !== 'default').forEach(key => {
      let obj = dataActions[key];

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