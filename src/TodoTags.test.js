import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { TodoTags } from './TodoTags'
import { removeTag } from './common/actions'

import { shallow } from 'enzyme'

describe('TodoTags', () => {
  it('should render the tags', () => {
    const todo = {
      id: 23,
      tags: ['alpha', 'bravo', 'charlie']
    }

    const wrapper = shallow(<TodoTags todo={todo} />)

    const tags = wrapper.find('.TodoTags-tag-text')
    expect(tags.length).toBe(3)
    expect(tags.at(0).text()).toBe('alpha')
    expect(tags.at(1).text()).toBe('bravo')
    expect(tags.at(2).text()).toBe('charlie')
  })

  it('should render a delete button for each tag', () => {
    const todo = {
      id: 23,
      tags: ['alpha', 'bravo', 'charlie']
    }

    const wrapper = shallow(<TodoTags todo={todo} />)

    const tags = wrapper.find('.TodoTags-tag-delete')
    expect(tags.length).toBe(3)
    expect(tags.at(0).text()).toBe('♻')
    expect(tags.at(0).getNode().props.title).toBe('Delete tag alpha')
    expect(tags.at(1).text()).toBe('♻')
    expect(tags.at(1).getNode().props.title).toBe('Delete tag bravo')
    expect(tags.at(2).text()).toBe('♻')
    expect(tags.at(2).getNode().props.title).toBe('Delete tag charlie')
  })

  it('should have a form to add new tags', () => {
    const todo = {
      id: 23
    }

    const wrapper = shallow(<TodoTags todo={todo} />)

    const newTag = wrapper.find('form.TodoTags')
    expect(newTag.length).toBe(1)
  })

  it('should raise an "ADD_TAG" event when add tag form submitted and prevent default submission', () => {
    const dispatch = jest.fn()
    const preventDefault = jest.fn()
    const store = {
      dispatch
    }
    const fakeEvent = { preventDefault }
    const todo = {
      id: 14,
    }

    const wrapper = shallow(<TodoTags todo={todo} store={store} />)
    wrapper.find('input').simulate('change', { target: { value: 'tag1' } })
    wrapper.find('form').simulate('submit', fakeEvent);

    expect(preventDefault.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('ADD_TAG')
    expect(event.id).toBe(14)
    expect(event.tagName).toBe('tag1')
  })

  it('should raise a "REMOVE_TAG" event when add tag delete pressed', () => {
    const dispatch = jest.fn()
    const store = {
      dispatch
    }
    const todo = {
      id: 14,
      tags: ['a']
    }

    const wrapper = shallow(<TodoTags todo={todo} store={store} />)
    expect(wrapper.length).toBe(1)
    wrapper.find('.TodoTags-tag-delete').simulate('click');

    expect(dispatch.mock.calls.length).toBe(1);
    const event = dispatch.mock.calls[0][0]
    expect(event.type).toBe('REMOVE_TAG')
    expect(event.id).toBe(14)
  })
})