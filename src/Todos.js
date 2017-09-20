import React from 'react'
import {deleteTodo} from './common/actions'
import {TodoTags} from './TodoTags'

export const Todos = ({store, todos}) => {
  return <ul>
    {todos.map(todo => <Todo store={store} key={todo.id} todo={todo}/>)}
  </ul>
}

export const Todo = ({store, todo}) => {
  return <li className='Todo'>
    <div >
      <span className='Todo-text'>{todo.text}</span>
      {' '}
      <a className='Todo-delete' onClick={() => store.dispatch(deleteTodo(todo.id))}>X</a>
      <TodoTags store={store} todo={todo} />
    </div>
  </li>
}