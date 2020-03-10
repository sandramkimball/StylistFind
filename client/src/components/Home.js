import React from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";


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
  
  handleChange = e => {
    e.preventDefault();
    this.setState({homeSearch: e.target.value})
  };

  handleSubmit = e => {
    this.setState({redirect: true})
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
                placeholder='Enter city, salon or stylist name...'
                value={this.state.homeSearch}
                onChange={this.handleChange}
              />
          </form>
          <img src='https://image.flaticon.com/icons/png/512/41/41463.png' alt='clipart of scissors and a comb'/>
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
  background: linear-gradient(lavender, #6d5a73);
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
  img{ height: 270px; margin-top: 50px}
`;




