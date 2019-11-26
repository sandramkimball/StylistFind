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
          <Home/>
          <Switch>
            <Route path="/signup" component={SignUp}/>

            <Route path='/search' 
              render={props=> 
              <SearchPage stylists={props.stylists} salons={props.salons} {...props}/>
            } />

            {/* <Route 
              path='/user/:id/dash' 
              render={ props => 
              <UserDash user={props.user} {...props}/>
            }/>*/}

            <Route path='/stylist/:id/dash' 
            render={props=> 
            <StylistDash stylist={props.stylist} {...props}/>
            } />

        </Switch>
        </Router>
      </DataProvider>
      </UserProvider>
      
      
    </div>
  );
}

export default App;

