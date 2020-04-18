import React from 'react';
import ReactDOM, {act} from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
//import {fireEvent, cleanup, act, render} from '@testing-library/react';
import App from './App';

//afterEach(cleanup);

test('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//END TO END TESTING
test('should navigate to search page when button is clicked', ()=> {
  const root = document.createElement('div');
  document.body.appendChild(root)
  ReactDOM.render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
    root
  );

  act(()=> {
    //find the link 
    const pageLink = document.querySelector(`nav .search-btn`)
    pageLink.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  });

  //check if correct page content showed up
  expect(document.body.textContent).toBe('Search')
})
