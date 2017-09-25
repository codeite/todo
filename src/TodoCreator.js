import React from 'react';
import createReactClass from 'create-react-class'

import { addTodo } from './common/commandActions'

export const TodoCreator = createReactClass({
  getInitialState() {
    return {
      newTodoText: ''
    }
  },

  onSubmit (e) {
    e.preventDefault()
    if (this.state.newTodoText.trim()) {
      this.props.store.dispatch(addTodo(this.state.newTodoText))
      this.setState({newTodoText: ''})
    }
  },

  render () {
    return <form onSubmit={this.onSubmit}>
      <input
        placeholder='New todo...'
        value={this.state.newTodoText}
        onChange={e => this.setState({newTodoText: e.target.value})}
      />
      <button>Add</button>
    </form>
  }
})