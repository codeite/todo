
import * as commandActions from './commandActions'

describe('commandActions.js', () => {
  it('should only contain valid actions', () => {
    Object.keys(commandActions).filter(x => x !== 'default').forEach(key => {
      let obj = commandActions[key];

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