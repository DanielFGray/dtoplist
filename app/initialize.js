import { render } from 'react-dom';
import React from 'react';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.querySelector('#app'));
});
