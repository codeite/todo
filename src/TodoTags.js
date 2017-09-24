import React from 'react'
import createReactClass from 'create-react-class'
import {addTag, removeTag} from './common/actions'

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
    return <form className='TodoTags' onSubmit={this.onSubmit}>
      <input
        value={this.state.newTagText}
        onChange={e => this.setState({newTagText: e.target.value})}
      />
      <button>Add</button>
      <ol>
        {(tags || []).map(tag => <li key={tag} className='TodoTags-tag'>
          <span className='TodoTags-tag-text'>{tag}</span>
          {' '}
          <a className="TodoTags-tag-delete" title={'Delete tag ' + tag} onClick={() => this.props.store.dispatch(removeTag(this.props.todo.id, tag))}>♻</a>
        </li>)}
      </ol>
    </form>
  }
})
