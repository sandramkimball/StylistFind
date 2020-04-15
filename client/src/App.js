import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

// STYLING
import GlobalStyle from './components/styled-components/GlobalStyle';
import bckgImg from './images/Wave-PNG-Clipart.png'
import './App.css';

//COMPONENTS
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginPage from './components/login&signup/LoginPage';
import LoginForm from './components/login&signup/LoginForm';
import {SignUpPage} from './components/login&signup/SignUpPage';
import SalonSignUp from './components/login&signup/SalonSignUp';
import EditUser from './components/users/EditUser';
import EditStylist from './components/stylists/EditStylist';
import SearchPage from './components/search/SearchPage';
import UserDash from './components/users/UserDash';
import StylistDash from './components/stylists/StylistDash';
import AllReviews from './components/reviews/AllReviews';
import ReviewForm from './components/reviews/ReviewForm';
import AddPost from './components/posts/AddPost.js';
// import PrivateRoute from './components/PrivateRoute';

// CONTEXTS
import DataProvider from './components/contexts/DataContext.js'
import UserProvider from './components/contexts/UserContext.js'

function App() {

  return (
    <div className="App">
      <img src={bckgImg} alt='wave' className='bckgImg'/>
      <GlobalStyle/>
      <UserProvider>
        <DataProvider>
        <Router>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/userlogin" component={LoginForm}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/signup/salon" component={SalonSignUp}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/users/:id/dash' component={UserDash} />
            <Route path='/user/:id/edit' component={EditUser}/>
            <Route path='/stylists/:id/dash' component={StylistDash}/>
            <Route path='/stylist/:id/edit' component={EditStylist}/>
            <Route path='/stylist/:id/add-review' component={ReviewForm}/>
            <Route path='/stylist/:id/add-post' component={AddPost}/>
            <Route path='/:usertype/:id/reviews' component={AllReviews}/>
        </Switch>
        <Footer/>
        </Router>
      </DataProvider>
      </UserProvider>
      
      
    </div>
  );
}

export default App;

