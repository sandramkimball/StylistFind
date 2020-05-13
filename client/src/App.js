import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// STYLING
import GlobalStyle from './components/styled-components/GlobalStyle';
import bckgImg from './images/Wave-PNG-Clipart.png'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './App.css';

//COMPONENTS
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import LoginLanding from './components/login&signup/LoginLanding';
import LoginForm from './components/login&signup/LoginForm';
import SignUpForm from './components/login&signup/SignUpForm';
import SalonSignUp from './components/login&signup/SalonSignUp';
import EditUser from './components/users/EditUser';
import EditStylist from './components/stylists/EditStylist';
import {SearchPage} from './components/search/SearchPage';
import UserDash from './components/users/UserDash';
import StylistDash from './components/stylists/StylistDash';
import StylistPortfolio from './components/stylists/StylistPortfolio';
import AllReviews from './components/reviews/AllReviews';
import ReviewForm from './components/reviews/ReviewForm';
import AddPost from './components/posts/AddPost.js';

// CONTEXTS
import DataProvider from './components/contexts/DataContext.js'
import {UserProvider} from './components/contexts/UserContext.js'

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
            <Route exact path='/policy' component={PrivacyPolicy}/>
            <Route path="/login" component={LoginLanding}/>
            <Route path="/signup" component={SignUpForm}/>
            <Route path="/signup/salon" component={SalonSignUp}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/stylists/:id/portfolio' component={StylistPortfolio}/>
            <Route path='/:usertype/:id/reviews' component={AllReviews}/>
            <Route path='/stylist/:id/add-review' component={ReviewForm}/>
            <PrivateRoute path='/users/:id/dash' component={UserDash} />
            <PrivateRoute path='/user/:id/edit' component={EditUser}/>
            <PrivateRoute path='/stylists/:id/dash' component={StylistDash}/>
            <PrivateRoute path='/stylist/:id/edit' component={EditStylist}/>
            <PrivateRoute path='/stylist/:id/add-post' component={AddPost}/>
        </Switch>
        <Footer/>
        </Router>
      </DataProvider>
      </UserProvider>     
      
    </div>
  );
}

export default App;

