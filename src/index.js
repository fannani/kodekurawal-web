import ReactDOM from 'react-dom';
import React from 'react';
import firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './assets/styles/app.scss';
import 'bootstrap';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = {
    apiKey: 'AIzaSyAp6n4l5KsgTi4UCWJCFtRyQU-R_PLOUkU',
    authDomain: 'kodekurawal-ab777.firebaseapp.com',
    databaseURL: 'https://kodekurawal-ab777.firebaseio.com',
    projectId: 'kodekurawal-ab777',
    storageBucket: 'kodekurawal-ab777.appspot.com',
    messagingSenderId: '714027380697',
};
firebase.initializeApp(config);

window.Popper = require('popper.js').default;
window.$ = require('jquery');
window.axios = require('axios');

window.jQuery = window.$;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

library.add(faBars, faPlusCircle);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
