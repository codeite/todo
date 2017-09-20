import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import { App } from './App';
import { app } from './reducers.js'
import { ServerClient } from './serverClient.js'
import { init } from './common/actions.js'
//import { FakeServer } from './common/fakeServer'
import { RealServer } from './common/realServer'

//import registerServiceWorker from './registerServiceWorker';

const store = createStore(app)
// store.subscribe(server.onAction)
//new ServerClient(store, new FakeServer(2000))
new ServerClient(store, new RealServer(store, 'http://localhost:3001'))

store.dispatch(init())
// console.log('store.getState():', store.getState())
ReactDOM.render(<App store={store} />, document.getElementById('root'));

// registerServiceWorker();