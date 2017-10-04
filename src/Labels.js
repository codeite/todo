import React from 'react'
import { Icon } from './Icon'
import { deleteLabel } from './common/commandActions'

export const Labels = ({store, labels}) => {
  return <div className='Labels'>
    <h2>Labels</h2>
    <ul>
      {labels.map(label => <li className='Labels-label' key={label.name}>
        <span>
          <span className='Labels-name'>{label.name}</span>
        </span>
        <span>
          <span className='Labels-count'>{label.count}</span>
          <a className='Labels-delete' onClick={() => store.dispatch(deleteLabel(label.name))} >
            <Icon iconName='cancel-circle' alt='Delete' />
          </a>
        </span>
      </li>)}
    </ul>
  </div>
}
