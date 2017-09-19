import React, { Component } from 'react';
//import createReactClass from 'create-react-class'
import './App.css';

import { Todos } from './Todos';
import { TodoCreator } from './TodoCreator';

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
        <div>Loading: {this.state.loading ? 'Loading' : '_'}</div>
        <div>Error: {this.state.error || '_'}</div>
        <TodoCreator store={this.props.store} />
        <Todos store={this.props.store} todos={this.state.todos} />
      </div>
    );
  }
}
