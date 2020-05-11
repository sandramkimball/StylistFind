import React from "react";
import { Redirect, Link } from "react-router-dom";
import Styled from "styled-components";
import hairImg from '../images/pink.jpg'
import hair2 from '../images/person-cutting-hair.jpg'
import { handleSubmit } from "./search/SearchPage";

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
    //this.props.history.push(`/search`, props=this.state.homeSearch)
  };

  render(){
    if(this.state.redirect === true){
      return <Redirect to="/search" props={this.state.homeSearch}/>
    }
    
    return (
      <div>
        <Landing className='landing-b1'>
          <div>
            <h1>Stylist Find</h1>
            <p>Welcome! Start your search for the perfect stylists here.</p>
            <form onSubmit={this.handleSubmit}>
                <input
                  id='search_input'
                  type='text'
                  name='textfield'
                  placeholder='Enter city, salon or stylist name...'
                  value={this.state.homeSearch}
                  onChange={this.handleChange}
                />
                <button onSubmit={this.handleSubmit}>Search</button>
            </form>
          </div>
        </Landing>
        <Info className='landing-b2'>
          <div>
            <h2>One Community for Stylists and Clients</h2>
            <p>Discover and be discovered. Display, post and update your artist portfolio. Share your talents. Review experiences. Save your favorites. Connect with someone who totally feels your vide. Try something new and feel beautiful. Get started today!</p>
            <Link to='/signup'><button>Join</button></Link>
          </div>
          <div>
            <img src={hair2} alt='person cutting hiar'/>
          </div>
        </Info>
      </div>
    )
  }
}

export default Home;

const Landing = Styled.section`
  height: 80vh;
  width: 70vw;
  margin: auto;
  display: flex;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  background-image: url(${hairImg});
  background-size: cover;
  border-radius: 2px;  
  box-shadow: 0px 4px 10px #d7d7d7;
  h1{
    font-size: 4rem; 
    margin: 0 0 10px 0; 
    padding-top: 10%;
    font-family: 'Dancing Script', cursive;  
    text-align: left;
  }
  p{
    text-align: left;
    font-size: 2rem
  }
  form{
    border: none;
    display: flex;
    justify-content: center;
    input{
      height: 50px;
      width: 40vw;
      text-align: left;
      padding: 0 5px;
      border: none;
      font-size:1.125rem
    }
    button{
      background: #fff;
      margin: 0;
      font-size: 1rem;
      padding: 0 7px;
      border: none;
      height: 50px;
      cursor: pointer
      :hover{background: #eeeeef}
    }
  }
`;

const Info = Styled.section`
  display: flex;
  justify-content: space-between;
  margin 15vh auto;
  width: 70vw;
  height: 40vh;
  div{
    width: 48%;
    height: 40vh;
    border-radius: 2px;
    box-shadow: 0px 4px 10px #d7d7d7;
  }
  div:nth-child(1){
    display: flex;
    flex-direction: column;
    background: #fff;
    justify-content: center;
    h2, p{ 
      margin: 2px auto;
      width: 90%;
      font-family: 'Source Sans Pro',sans-serif;
    }
    p{text-align: left;  font-size: 1.25rem;}
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button{
      background: orange;
      margin: 5px auto;
      width: 25%;
      font-size: 1rem;
      max-width: 30%;
      padding: 4px ;
      color: #fff;
      border: none;
      height: 30px;
      border-radius: 2px;
      cursor: pointer
  }    
`
