import React from 'react'
import {deleteTodo, setTodoStatus} from './common/actions'
import {TodoTags} from './TodoTags'

export const Todos = ({store, todos}) => {
  return <ul>
    {todos.map(todo => <Todo store={store} key={todo.id} todo={todo}/>)}
  </ul>
}

export const Todo = ({store, todo}) => {
  return <li className='Todo'>
      <input
        className='Todo-status'
        type="checkbox"
        checked={!!todo.done}
        onChange={e => store.dispatch(setTodoStatus(todo.id, e.target.checked))}
      />
      <span className='Todo-text'>{todo.text}</span>
      {' '}
      <a className='Todo-delete' onClick={() => store.dispatch(deleteTodo(todo.id))}>X</a>
      <TodoTags store={store} todo={todo} />
  </li>
}