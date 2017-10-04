import React from 'react'
import createReactClass from 'create-react-class'
import {addLabel, removeLabel} from './common/commandActions'

export const TodoLabels = createReactClass({
  getInitialState() {
    return {
      newLabelText: ''
    }
  },

  onSubmit (e) {
    e.preventDefault()
    this.props.store.dispatch(addLabel(this.props.todo.id, this.state.newLabelText))
    this.setState({newLabelText: ''})
  },

  render () {
    const labels = this.props.todo.labels || []
    return <form className='TodoLabels' onSubmit={this.onSubmit}>
      <input
        value={this.state.newLabelText}
        onChange={e => this.setState({newLabelText: e.target.value})}
      />
      <button>Add</button>
      <ol>
        {(labels || []).map(label => <li key={label} className='TodoLabels-label'>
          <span className='TodoLabels-label-text'>{label}</span>
          {' '}
          <a className="TodoLabels-label-delete" title={'Delete label ' + label} onClick={() => this.props.store.dispatch(removeLabel(this.props.todo.id, label))}>♻</a>
        </li>)}
      </ol>
    </form>
  }
})
