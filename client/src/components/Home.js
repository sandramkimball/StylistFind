import React from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import hairImg from '../images/pink.jpg'
import hair2 from '../images/person-cutting-hair.jpg'

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
            </form>
          </div>
        </Landing>
        <Info className='landing-b2'>
          <div>
            <h2>One Community for Stylists and Clients</h2>
            <p>Discover and be discovered. Display, post and update your artist portfolio. Share your talents. Review experiences. Save your favorites. Connect with someone who totally feels your vide. Try something new and feel beautiful.</p>
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

const Landing = Styled.div`
  height: 90vh;
  width: 70vw;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
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

const Info = Styled.div`
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
`
