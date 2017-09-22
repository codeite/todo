import React from 'react'
import {} from './common/actions'

export const Tags = ({store, tags}) => {
  return <div className='Tags'>
    <h2>Tags</h2>
    <ul>
      {tags.map(tag => <li className='Tags-tag' key={tag.name}>
        <span className='Tags-name'>{tag.name}</span>
        {': '}
        <span className='Tags-count'>{tag.count}</span>
      </li>)}
    </ul>
  </div>
}
