import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import './App.css';

// STYLING
import GlobalStyle from './components/styled-components/GlobalStyle';

// CONTEXTS MANAGE STATE
import UserProvider from './components/contexts/UserContext';
import DataProvider from './components/contexts/DataContext';

//COMPONENTS
import Nav from './components/Nav';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import LoginForm from './components/forms/LoginForm';
import SignUpForm from './components/forms/SignUpForm';
import SearchPage from './components/search/SearchPage';
import UserDash from './components/users/UserDash';
import StylistDash from './components/users/StylistDash';
// import PrivateRoute from './components/PrivateRoute';

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
            <Route path="/login" component={LoginPage}/>
            <Route path="/userlogin" component={LoginForm}/>
            <Route path="/signup" component={SignUpForm}/>
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

