import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Labels } from './Labels'

import { shallow } from 'enzyme'

describe('Labels', () => {
  it('renders without crashing', () => {
    const store = {}
    const div = document.createElement('div');

    ReactDOM.render(<Labels
      store={store}
      labels={[]}
    />, div);
  })

  it('should have an <li> for each label', () => {
    const labels = ['A', 'B', 'C'].map((x, i) => (
      {
        name: 'label ' + x,
        count: i+1+''
      }
    ))

    const wrapper = shallow(<Labels labels={labels} />)
    const listItems = wrapper.find('li')
    expect(listItems.length).toBe(3);

    labels.forEach((label, i) => {
      const li = listItems.at(i)
      expect(li.find('.Labels-name').text()).toEqual(label.name)
      expect(li.find('.Labels-count').text()).toEqual(label.count)

      expect(li.find('.Labels-delete Icon').props().iconName).toEqual('cancel-circle')
    })
  })

  it('should raise a "DELETE_LABEL" event when delete label icon pressed', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const labels = [{
      name: 'label1'
    }]

    const wrapper = shallow(<Labels labels={labels} store={store} />)
    const deleteButton = wrapper.find('.Labels-delete');

    expect(deleteButton.length).toBe(1)
    deleteButton.simulate('click');

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('DELETE_LABEL')
    expect(event.labelName).toBe('label1')
  })
})