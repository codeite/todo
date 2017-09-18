import React from 'react';
import createReactClass from 'create-react-class'

export const TodoCreator = createReactClass({
  getInitialState() {
    return {
      newTodoText: ''
    }
  },

  onSubmit (e) {
    e.preventDefault()
    this.props.store.dispatch({type: 'ADD_TODO', id:1, text: this.state.newTodoText})
    this.setState({newTodoText: ''})
  },

  render () {
    return <form onSubmit={this.onSubmit}>
      <input
        value={this.state.newTodoText}
        onChange={e => this.setState({newTodoText: e.target.value})}
      />
      <button>Add</button>
    </form>
  }
})