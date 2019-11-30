import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

// STYLING
import GlobalStyle from './components/styled-components/GlobalStyle';


// CONTEXTS MANAGE STATE
import UserProvider from './components/contexts/UserContext';
import DataProvider from './components/contexts/DataContext';

//COMPONENTS
import Nav from './components/Nav';
import Home from './components/Home';
import SearchPage from './components/search/SearchPage';
import UserDash from './components/users/UserDash';
import StylistDash from './components/users/StylistDash';
import SignUp from './components/forms/SignUp';
import Login from './components/forms/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div className="App">
      <GlobalStyle/>
      <UserProvider>
        <DataProvider>
        <Router>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/users/:id/dash' component={UserDash}  />
            <Route path='/stylists/:id/dash' component={StylistDash}/>
        </Switch>
        </Router>
      </DataProvider>
      </UserProvider>
      
      
    </div>
  );
}

export default App;

