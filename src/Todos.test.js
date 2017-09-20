import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Todos, Todo, TodoTags } from './Todos'
import { appReducer } from './reducers.js'

import { shallow } from 'enzyme'

describe('Todos', () => {
  it('renders without crashing', () => {
    const store = createStore(appReducer)
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

describe('Todo', () => {
  it('renders without crashing', () => {
    const store = createStore(appReducer)
    const div = document.createElement('div');

    ReactDOM.render(<Todo
      store={store}
      todo={{}}
    />, div);
  })

  it('should render an unfinished todo with an un-checked box', () => {
    const todo = {
      text: 'my todo text'
    }

    const wrapper = shallow(<Todo todo={todo} />)

    const checkbox = wrapper.find('input[type=\'checkbox\'].Todo-status')
    expect(checkbox.length).toBe(1)
    expect(checkbox.props().checked).toBe(false)
  })

  it('should render an done todo with a checked checkbox', () => {
    const todo = {
      text: 'my todo text',
      done: true
    }

    const wrapper = shallow(<Todo todo={todo} />)

    const checkbox = wrapper.find('input[type=\'checkbox\'].Todo-status')
    expect(checkbox.length).toBe(1)
    expect(checkbox.props().checked).toBe(true)
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
    expect(button.text()).toBe('X')
  })

  it('should not mind about missing tags', () => {
    const todo = {
      id: 23,
      text: 'my todo text',
    }

    const wrapper = shallow(<Todo todo={todo} />)
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

  it('should raise an "SET_TODO_STATUS" done:true event when unchecked box clicked', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const todo = {
      id: 33,
      text: 'my todo text',
      done: false
    }

    const wrapper = shallow(<Todo todo={todo} store={store} />)
    wrapper.find('.Todo-status').simulate('change', {target: {checked: true}})

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('SET_TODO_STATUS')
    expect(event.id).toBe(33)
    expect(event.newStatus).toBe(true)
  })

  it('should raise an "SET_TODO_STATUS" done:false event when checked box clicked', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const todo = {
      id: 33,
      text: 'my todo text',
      done: true
    }

    const wrapper = shallow(<Todo todo={todo} store={store} />)
    wrapper.find('.Todo-status').simulate('change', {target: {checked: false}})

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('SET_TODO_STATUS')
    expect(event.id).toBe(33)
    expect(event.newStatus).toBe(false)
  })
})