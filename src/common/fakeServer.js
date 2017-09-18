import * as actions from './actions'

export class FakeServer {
  constructor (latency) {
    this.latency = latency
    this.state = {
      nextId: 4,
      todos: [
        { id: 1, text: 'first to do', done: false },
        { id: 2, text: 'second to do', done: true },
        { id: 3, text: 'third to do', done: false }
      ]
    }
  }

  onAction (action) {
    return Promise.resolve((() => {
      if (!action || !action.type) return []

      switch (action.type) {
        case actions.addTodo.type: return this.onAddTodo(action)
        case actions.init.type: return this.onInit(action)
        default: return [] // Do nothing
      }
    })())
      .then(result => {
        if(this.latency > 0) {
          return new Promise((resolve, reject) => setTimeout(() => resolve(result), this.latency))
        } else {
          return result
        }
      })
  }

  onInit() {
    const data = JSON.parse(JSON.stringify(this.state.todos))
    return [actions.loadData(data)]
  }

  onAddTodo (action) {
    const newTodo = {
      id: this.state.nextId++,
      text: action.text,
      done: false
    }
    this.state.todos.push(newTodo)
    return [actions.todoFromServer(newTodo.text, newTodo.id, newTodo.done)]
  }
}