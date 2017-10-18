import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { TodoLabels } from './TodoLabels'
import { removeLabel } from './common/commandActions'

import { shallow } from 'enzyme'

describe('TodoLabels', () => {
  it('should render the labels', () => {
    const todo = {
      id: 23,
      labels: ['alpha', 'bravo', 'charlie']
    }

    const wrapper = shallow(<TodoLabels todo={todo} />)

    const labels = wrapper.find('.TodoLabels-label-text')
    expect(labels.length).toBe(3)
    expect(labels.at(0).text()).toBe('alpha')
    expect(labels.at(1).text()).toBe('bravo')
    expect(labels.at(2).text()).toBe('charlie')
  })

  it('should render a delete button for each label', () => {
    const todo = {
      id: 23,
      labels: ['alpha', 'bravo', 'charlie']
    }

    const wrapper = shallow(<TodoLabels todo={todo} />)

    const labels = wrapper.find('.TodoLabels-label-delete')
    expect(labels.length).toBe(3)
    expect(labels.at(0).text()).toBe('<Icon />')
    expect(labels.at(0).getNode().props.title).toBe('Delete label alpha')
    expect(labels.at(1).text()).toBe('<Icon />')
    expect(labels.at(1).getNode().props.title).toBe('Delete label bravo')
    expect(labels.at(2).text()).toBe('<Icon />')
    expect(labels.at(2).getNode().props.title).toBe('Delete label charlie')
  })

  it('should have a form to add new labels', () => {
    const todo = {
      id: 23
    }

    const wrapper = shallow(<TodoLabels todo={todo} />)

    const newLabel = wrapper.find('form.TodoLabels')
    expect(newLabel.length).toBe(1)
  })

  it('should raise an "ADD_LABEL" event when add label form submitted and prevent default submission', () => {
    const dispatch = jest.fn()
    const preventDefault = jest.fn()
    const store = {
      dispatch
    }
    const fakeEvent = { preventDefault }
    const todo = {
      id: 14,
    }

    const wrapper = shallow(<TodoLabels todo={todo} store={store} />)
    wrapper.find('input').simulate('change', { target: { value: 'label1' } })
    wrapper.find('form').simulate('submit', fakeEvent);

    expect(preventDefault.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('ADD_LABEL')
    expect(event.id).toBe(14)
    expect(event.labelName).toBe('label1')
  })

  it('should raise a "REMOVE_LABEL" event when add label delete pressed', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const todo = {
      id: 14,
      labels: ['a']
    }

    const wrapper = shallow(<TodoLabels todo={todo} store={store} />)
    expect(wrapper.length).toBe(1)
    wrapper.find('.TodoLabels-label-delete').simulate('click');

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('REMOVE_LABEL')
    expect(event.id).toBe(14)
  })
})