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
      expect(listItems.at(i).find('.Tags-name').text()).toEqual(tag.name)
      expect(listItems.at(i).find('.Tags-count').text()).toEqual(tag.count)
    })
  })
})