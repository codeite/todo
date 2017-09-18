import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Todos, Todo, TodoCreator } from './Todos'
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

  it('should render the delete button', () => {
    const todo = {
      id: 23,
      text: 'my todo text'
    }

    const wrapper = shallow(<Todo todo={todo} />)

    const button = wrapper.find('.Todo-delete')
    expect(button.length).toBe(1)
    expect(button.text()).toBe('D')
  })

  it('should raise an "DELETE_TODO" event when delete button clicked', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const todo = {
      id: 23,
      text: 'my todo text'
    }

    const wrapper = shallow(<Todo todo={todo} store={store} />)
    wrapper.find('.Todo-delete').simulate('click')

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('DELETE_TODO')
    expect(event.id).toBe(23)
  })
})
