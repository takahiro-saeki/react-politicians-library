import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from './container/Main';
import {Router, Route, browserHistory} from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
  </Router>,
  document.getElementById('app')
)
