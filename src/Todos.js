import React from 'react'

export const Todos = ({store, todos}) => {
  return <ul>
    {todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
  </ul>
}

export const Todo = ({store, todo}) => {
  return <li className='Todo'>
    <div className='Todo-text' >{todo.text}</div>
  </li>
}
