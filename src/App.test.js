import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'

import { createStore } from 'redux';
import { App } from './App';
import { Todos } from './Todos';
import { appReducer } from './reducers/reducers.js'

it('renders without crashing', () => {
  const store = createStore(appReducer)
  const div = document.createElement('div')
  ReactDOM.render(<App store={store}/>, div)
});

it('should have an <Todos /> ', () => {
  const wrapper = shallow(<App />)
  const todosComponent= wrapper.find(Todos)
  expect(todosComponent.length).toBe(1)
})