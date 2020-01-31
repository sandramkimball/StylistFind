import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import Background from '../images/person-cutting-hair.jpg';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        homeSearch: '',
        redirect: false,
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // useEffect(()=>{
  //   axiosWithAuth()
  //   .get('/search/reviews')
  //   .then(res=> {
  //     console.log(res.data);
  //     setRecentReviews(res.data)
  //   })
  //   .catch(err=> {console.log('Latest Review Error: ', err)})
  // }, [])

  // useEffect(()=>{
  //   axiosWithAuth()
  //   .get('/search/posts')
  //   .then(res=> {
  //     var latest = res.data.filter(item=> item.date.sort())
  //     setRecentPosts(latest)
  //     console.log('Latest Posts: ', latest)
  //   })
  //   .catch(err=> {console.log('Latest Post Error: ', err)})
  // }, [])

  handleSubmit = e => {
    e.preventDefault();
    this.setState({redirect: true})
  };

  handleChange = e => {
    // e.preventDefault();
    this.setState({setHomeSearch: e.target.value})
  };

  render(){
    if(this.state.redirect === true){
      return <Redirect to="/search" searchTerm={this.state.homeSearch}/>
    }
    
    return (
      <div>
        <Landing>
          <h1>Search</h1>
          <form onSubmit={this.handleSubmit}>
              <input
                id='search_input'
                type='text'
                name='textfield'
                placeholder='Enter location, salon or stylist name...'
                value={this.state.homeSearch}
                onChange={this.handleChange}
              />
          </form>
        </Landing>
      </div>
    )
  }
}

export default Home;

const Landing = Styled.div`
  height: 92vh;
  width: 100vw;
  margin: auto;
  // background: url('https://images.pexels.com/photos/4614/woman-morning-bathrobe-bathroom.jpg?cs=srgb&dl=woman-morning-bathrobe-bathroom-4614.jpg&fm=jpg')
  background: lavender;
  h1{
    font-size: 2.75rem; 
    margin: 0 0 10px 0; 
    padding: 15% 0 0 0; 
    font-family: 'Dancing Script', cursive;  
  }
  form{
    border: none;
    button{
      background: red;
      border: 1px solid black;
      padding: 7px;
    }
    input{
      height: 40px;
      width: 40vw;
      text-align: left;
      padding: 5px;
      border: none;
      border-bottom: 1.5px solid #eeeeef;
    }
  }
`;




