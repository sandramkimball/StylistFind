import React from 'react';
import ReactDOM from 'react-dom';
import {fireEvent, cleanup} from '@testing-library/react'
import App from './App';

afterEach(cleanup);

test('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//END TO END TESTING
test('should switch between pages when nav links clicked', ()=> {
  ReactDOM.render(<App />);
  let button = document.querySelector(`nav .search-btn`)
  fireEvent.click(button)
  expect()
})
