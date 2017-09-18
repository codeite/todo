import React, { Component } from 'react';
import createReactClass from 'create-react-class'
import './App.css';

import { Todos } from './Todos';

export class App extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
    this.state = props.store ? props.store.getState() : {}
  }

  componentWillMount () { if (this.store) { this.unsubscribe = this.store.subscribe(() => this.setState(this.store.getState())) } }
  componentWillUnmount () { this.unsubscribe && this.unsubscribe() }

  render() {
    // console.log('JSON.stringify(this.state):', JSON.stringify(this.state))
    return (
      <div className="App">
        <TodoCreator store={this.props.store} />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

const TodoCreator = createReactClass({
  getInitialState() {
    return {
      newTodoText: ''
    }
  },

  onSubmit (e) {
    e.preventDefault()
    this.props.store.dispatch({action: 'ADD_TODO', id:1, text: this.state.newTodoText})
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