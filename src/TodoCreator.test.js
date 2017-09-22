import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { TodoCreator } from './TodoCreator'

import { shallow } from 'enzyme'

describe('TodoCreator', () => {
  it('should raise an "ADD_TODO" event when form submitted and prevent default submission', () => {
    const dispatch = jest.fn()
    const preventDefault = jest.fn()
    const store = {
      dispatch
    }
    const fakeEvent = { preventDefault }

    const wrapper = shallow(<TodoCreator store={store} />)
    wrapper.find('input').simulate('change', { target: { value: 'todo1' } })
    wrapper.find('form').simulate('submit', fakeEvent);

    expect(preventDefault.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('ADD_TODO')
    expect(event.text).toBe('todo1')
  })

  it('should not raise an "ADD_TODO" event when form submitted with empty (after trim) todo name', () => {
    const dispatch = jest.fn()
    const preventDefault = jest.fn()
    const store = {
      dispatch
    }
    const fakeEvent = { preventDefault }

    const wrapper = shallow(<TodoCreator store={store} />)
    wrapper.find('input').simulate('change', { target: { value: ' \t ' } })
    wrapper.find('form').simulate('submit', fakeEvent);

    expect(preventDefault.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(0);
  })
})