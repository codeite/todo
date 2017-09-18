import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import {App} from './App';
import {app} from './reducers.js'

//import registerServiceWorker from './registerServiceWorker';


const store = createStore(app)
console.log('store.getState():', store.getState())
ReactDOM.render(<App store={store} />, document.getElementById('root'));

// registerServiceWorker();