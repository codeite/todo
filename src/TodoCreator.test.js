import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { TodoCreator } from './TodoCreator'
import { app } from './reducers.js'

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
    wrapper.find('form').simulate('submit', fakeEvent);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(preventDefault.mock.calls.length).toBe(1);
  })
})