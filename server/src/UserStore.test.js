const UserStore = require('./UserStore');
const desc = 1
const mockData = {}
const mockFetch = (url, options) => {
  const match = mockData[url]
  if (!match) throw 'no url matching: ' + url
  else {
    if (!options || options.method === 'GET') {
      return Promise.resolve({ok: true, json: () => Promise.resolve(match)})
    } else if (options.method === 'PUT') {
      mockData[url] = JSON.parse(options.body)
      return Promise.resolve({ok: true, json: () => Promise.resolve({})})
    }
  }
}
const userStore = new UserStore('db', mockFetch);

describe('UserStore', () => {
  beforeEach(() => {
    Object.keys(mockData).forEach(key => {
      delete mockData[key]
    })

    mockData['db/todo/validUser'] = {todos: [], labels: [], nextId: 1}
    mockData['db/todo/userWithOneTodo'] = {todos: [{}], labels: [], nextId: 2}
  })

  it('should be able to get a user', () => {
    expect.assertions(1)

    return userStore.getUser('validUser').then(user => {
      expect(user).toMatchObject({todos: [], labels: [], nextId: 1})
    })
  })

  it('should be able to save a user', () => {
    expect.assertions(1)

    const newUser = {
      todos: [{}],
      labels: [{}],
      nextId: 3
    }

    return userStore.saveUser('validUser', newUser).then(() => {
      const savedUser = mockData['db/todo/validUser']
      expect(savedUser.nextId).toBe(3)

    })
  })

})