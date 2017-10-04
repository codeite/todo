import React, { Component } from 'react';
//import createReactClass from 'create-react-class'
import './App.scss';

import { Labels } from './Labels';
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
    return (
      <div className="App">
        <header>
          <div style={{height: '1.5em'}}>{this.state.loading ? <img alt='Loading..' src='/spinner.svg' style={{height: '1.5em'}}/> : <div>&nbsp;</div>}</div>
          <div>{this.state.error || ''}</div>
        </header>
        <main>
          <section className="App-labelsSection">
            <Labels store={this.props.store} labels={this.state.labels} />
          </section>

          <section className="App-todosSection">
            <TodoCreator store={this.props.store} />
            <Todos store={this.props.store} todos={this.state.todos} />
          </section>
        </main>
      </div>
    );
  }
}
