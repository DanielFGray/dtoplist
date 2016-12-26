import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';

const Init = props => (
  <App {...props} />
);

const AppRoutes = (
  <Router history={hashHistory}>
    <Route path="/" component={Init}>
      <Route path=":nick" />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(AppRoutes, document.querySelector('#app'));
});
