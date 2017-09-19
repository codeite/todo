import React from 'react'
import createReactClass from 'create-react-class'
import {addTag} from './common/actions'

export const TodoTags = createReactClass({
  getInitialState() {
    return {
      newTagText: ''
    }
  },

  onSubmit (e) {
    e.preventDefault()
    this.props.store.dispatch(addTag(this.props.todo.id, this.state.newTagText))
    this.setState({newTagText: ''})
  },

  render () {
    const tags = this.props.todo.tags || []
    return <form className='Todo-newTag' onSubmit={this.onSubmit}>
      <input
        value={this.state.newTagText}
        onChange={e => this.setState({newTagText: e.target.value})}
      />
      <button>Add</button>
      <ol>
        {(tags || []).map(tag => <li key={tag} className='Todo-tag'>{tag}</li>)}
      </ol>
    </form>
  }
})
