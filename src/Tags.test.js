import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Tags } from './Tags'

import { shallow } from 'enzyme'

describe('Tags', () => {
  it('renders without crashing', () => {
    const store = {}
    const div = document.createElement('div');

    ReactDOM.render(<Tags
      store={store}
      tags={[]}
    />, div);
  })

  it('should have an <li> for each tag', () => {
    const tags = ['A', 'B', 'C'].map((x, i) => (
      {
        name: 'tag ' + x,
        count: i+1+''
      }
    ))

    const wrapper = shallow(<Tags tags={tags} />)
    const listItems = wrapper.find('li')
    expect(listItems.length).toBe(3);

    tags.forEach((tag, i) => {
      const li = listItems.at(i)
      expect(li.find('.Tags-name').text()).toEqual(tag.name)
      expect(li.find('.Tags-count').text()).toEqual(tag.count)

      expect(li.find('.Tags-delete Icon').props().iconName).toEqual('cancel-circle')
    })
  })

  it('should raise a "DELETE_TAG" event when delete tag icon pressed', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const tags = [{
      name: 'tag1'
    }]

    const wrapper = shallow(<Tags tags={tags} store={store} />)
    const deleteButton = wrapper.find('.Tags-delete');

    expect(deleteButton.length).toBe(1)
    deleteButton.simulate('click');

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('DELETE_TAG')
    expect(event.tagName).toBe('tag1')
  })
})