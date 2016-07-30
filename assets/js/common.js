import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from './container/Main';
import Result from './container/Result';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
    <Route path='/:type' component={Result} />
  </Router>,
  document.getElementById('app')
)
