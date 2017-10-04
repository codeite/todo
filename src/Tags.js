import React from 'react'
import { Icon } from './Icon'
import { deleteTag } from './common/commandActions'

export const Tags = ({store, tags}) => {
  return <div className='Tags'>
    <h2>Tags</h2>
    <ul>
      {tags.map(tag => <li className='Tags-tag' key={tag.name}>
        <span>
          <span className='Tags-name'>{tag.name}</span>
        </span>
        <span>
          <span className='Tags-count'>{tag.count}</span>
          <a className='Tags-delete' onClick={() => store.dispatch(deleteTag(tag.name))} >
            <Icon iconName='cancel-circle' alt='Delete' />
          </a>
        </span>
      </li>)}
    </ul>
  </div>
}
