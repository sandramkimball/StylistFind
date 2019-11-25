import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
  // const [stylist, setStylist] = useState(stylists)
  // const [user, setUser] = useState(users)
  return (
    <div className="App">
      <GlobalStyle/>
      <UserProvider>
        <DataProvider>
        <Router>
          <Nav/>
          <Home/>
          <Switch>
            {/* <Route exact path='/' render={()=> <Redirect to='login'/>}/> */}
            {/* <Route path="/signup" component={SignUp}/> */}
            <Route path="/user-dash" component={UserDash}/>
            <Route path="/stylist-dash" component={StylistDash}/>
            <Route path="/search" component={SearchPage}/>

          {/* <Route 
            path='/customer-dash' 
            render={ props => 
            <CustomerDash customer={user} {...props}/>
          }/>
          
          <Route path='/stylist-dash/:dataID' 
          render={props=> 
          <StylistDash stylist={stylist} {...props}/>
          } /> */}

          {/* <Route path='/search' 
            render={props=> 
            <SearchPage stylist={stylist} {...props}/>
          } /> */}

        
        </Switch>
        </Router>
      </DataProvider>
      </UserProvider>
      
      
    </div>
  );
}

export default App;

