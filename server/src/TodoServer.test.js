const TodoServer = require('./TodoServer');
const fakeUserStore = {
  users: {},
  getUser(username) {
    return Promise.resolve(
      JSON.parse(JSON.stringify(fakeUserStore.users[username]))
    )
  },
  saveUser(username, user) {
    fakeUserStore.users[username] = JSON.parse(JSON.stringify(user))
    return Promise.resolve()
  }
}
const todoServer = new TodoServer(fakeUserStore)

describe('TodoServer', () => {
  beforeEach(() => {
    Object.keys(fakeUserStore.users).forEach(key => {
      delete fakeUserStore.users[key]
    })

    fakeUserStore.users['validUser'] = {todos: [], labels: [], nextId: 1}
    fakeUserStore.users['userWithOneTodo'] = {todos: [{id: 1, labels: ['presetLabel1']}], labels: [{count: 1, name: 'presetLabel1'}], nextId: 2}
  })

  ;[
    {desc: 'with null action', action: null},
    {desc: 'without type set', action: {}},
    {desc: 'without sendToServer flag set', action: {type: 'type'}},
  ].forEach(({desc, action}) => {
    it(`should reject messages ${desc}`, () => {
      expect.hasAssertions()

      return todoServer.onAction(action, 'validUser').then(response => {
        expect(response.message).toBe('Should not send messages without sendToServer')
        expect(response.events).toHaveLength(0)
      })
    })
  })

  it('should reject unknown messages', () => {
    expect.hasAssertions()

    return todoServer.onAction({type: 'UNKNOWN', sendToServer: true}, 'validUser').then(response => {
      expect(response.message).toBe("Don't know how to process UNKNOWN yet")
      expect(response.events).toHaveLength(0)
    })
  })

  describe('messages', () => {
    it('should respond to INIT with LOAD_DATA containg users data', () => {
      expect.hasAssertions()
      const action = {type: 'INIT', sendToServer: true}

      return todoServer['INIT']({}, 'userWithOneTodo').then(response => {
        expect(response).toHaveLength(1)
        expect(getAction(response, 'LOAD_DATA'))
          .toMatchObject({type:'LOAD_DATA', todos: [{labels: ['presetLabel1']}], labels: [{count: 1, name: 'presetLabel1'}]})
      })
    })

    it('should respond to ADD_TODO with TODO_FROM_SERVER', () => {
      expect.hasAssertions()

      const addTodoAction = {type: 'ADD_TODO', sendToServer: true, text: 'todo1'}
      const expectedTodoFromServer =
        {done: false, id: 2, text: 'todo1', type: 'TODO_FROM_SERVER'}

      return todoServer['ADD_TODO'](addTodoAction, 'userWithOneTodo').then(response => {
        expect(response).toHaveLength(1)
        expect(getAction(response, 'TODO_FROM_SERVER'))
          .toMatchObject(expectedTodoFromServer)

        expect(fakeUserStore.users.userWithOneTodo.nextId).toBe(3)
      })
    })

    it('should respond to DELETE_TODO with DELETE_TODO_FROM_SERVER and LABEL_LIST_FROM_SERVE', () => {
      expect.hasAssertions()
      const action = {type: 'DELETE_TODO', sendToServer: true, id: 1}

      return todoServer[action.type](action, 'userWithOneTodo')
        .then(response => {
          const deleteTodoFromServer = getAction(response, 'DELETE_TODO_FROM_SERVER')
          expect(deleteTodoFromServer.id).toBe(1)

          const labelListFromServer = getAction(response, 'LABEL_LIST_FROM_SERVER')
          expect(labelListFromServer.labels).toMatchObject([{count: 0, name: 'presetLabel1'}])
        })
    })

    it('should respond to ADD_LABEL with SET_LABELS_FROM_SERVER and LABEL_LIST_FROM_SERVER', () => {
      expect.hasAssertions()
      const action = {type: 'ADD_LABEL', sendToServer: true, id: 1, labelName: 'newLabel1'}

      return todoServer[action.type](action, 'userWithOneTodo')
        .then(response => {
          const setLabelsFromServer = getAction(response, 'SET_LABELS_FROM_SERVER')
          expect(setLabelsFromServer.id).toBe(1)
          expect(setLabelsFromServer.labels).toContain('newLabel1')
          expect(setLabelsFromServer.labels).toContain('presetLabel1')

          const labelListFromServer = getAction(response, 'LABEL_LIST_FROM_SERVER')
          expect(labelListFromServer.labels.map(x=>x.name+':'+x.count)).toContain('newLabel1:1')
          expect(labelListFromServer.labels.map(x=>x.name+':'+x.count)).toContain('presetLabel1:1')
        })
    })

    it('should respond to REMOVE_LABEL with SET_LABELS_FROM_SERVER and LABEL_LIST_FROM_SERVER', () => {
      expect.hasAssertions()
      const action = {type: 'REMOVE_LABEL', sendToServer: true, id: 1, labelName: 'presetLabel1'}

      return todoServer[action.type](action, 'userWithOneTodo')
        .then(response => {
          const setLabelsFromServer = getAction(response, 'SET_LABELS_FROM_SERVER')
          expect(setLabelsFromServer.id).toBe(1)
          expect(setLabelsFromServer.labels).toHaveLength(0)

          const labelListFromServer = getAction(response, 'LABEL_LIST_FROM_SERVER')
          expect(labelListFromServer.labels).toMatchObject([{count: 0, name: 'presetLabel1'}])
        })
    })

    it('should respond to SET_TODO_STATUS with SET_TODO_STATUS_FROM_SERVER', () => {
      expect.hasAssertions()
      const action = {type: 'SET_TODO_STATUS', sendToServer: true, id: 1, newStatus: true}

      return todoServer[action.type](action, 'userWithOneTodo')
        .then(response => {
          const setTodoStatusFromServer = getAction(response, 'SET_TODO_STATUS_FROM_SERVER')
          expect(setTodoStatusFromServer.id).toBe(1)
          expect(setTodoStatusFromServer.newStatus).toBe(true)
        })
    })

    it('should respond to DELETE_LABEL with SET_LABELS_FROM_SERVER and LABEL_LIST_FROM_SERVER', () => {
      expect.hasAssertions()
      const action = {type: 'DELETE_LABEL', sendToServer: true, labelName: 'presetLabel1'}

      return todoServer[action.type](action, 'userWithOneTodo')
        .then(response => {
          const setLabelsFromServer = getAction(response, 'SET_LABELS_FROM_SERVER')
          expect(setLabelsFromServer.id).toBe(1)
          expect(setLabelsFromServer.labels).toHaveLength(0)

          const labelListFromServer = getAction(response, 'LABEL_LIST_FROM_SERVER')
          expect(labelListFromServer.labels).toHaveLength(0)
        })
    })
  })
})

function getAction(actions, type) {
  const action = actions.find(a => a.type === type)
  if (!action) {
    throw new Error(`Could not find acton ${type} in response`)
  }
  return action
}