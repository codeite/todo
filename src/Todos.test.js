import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'

import { createStore } from 'redux'
import { Todos, Todo } from './Todos'
import { app } from './reducers.js'

import { shallow } from 'enzyme'

describe('Todos.js', () => {
  it('renders without crashing', () => {
    const store = createStore(app)
    const div = document.createElement('div');

    ReactDOM.render(<Todos
      store={store}
      todos={[]}
    />, div);
  })

  it('should have a <Todo /> for each todo and pass on the prop', () => {
    const todos = [1,2,3,4,5].map(x => (
      {
        id: x,
        text: 'todo ' + x,
        done: false
      }
    ))

    const wrapper = shallow(<Todos todos={todos} />)
    const todoComponents = wrapper.find(Todo)
    expect(todoComponents.length).toBe(5);

    todos.forEach((todo, i) => {
      expect(todoComponents.at(i).props().todo).toEqual(todo)
    })
  })
})

describe('Todos', () => {
  it('renders without crashing', () => {
    const store = createStore(app)
    const div = document.createElement('div');

    ReactDOM.render(<Todo
      store={store}
      todo={{}}
    />, div);
  })

  it('should render the text in .todo-text', () => {
    const todo = {
      text: 'my todo text'
    }

    const wrapper = shallow(<Todo todo={todo} />)

    const text = wrapper.find('.Todo-text')
    expect(text.length).toBe(1)
    expect(text.text()).toBe('my todo text')
  })
})