import React from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import axiosWithAuth from './utilis/axiosWithAuth';
import PostCard from './posts/PostCard';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        homeSearch: '',
        redirect: false,
        posts: []
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(props){
    axiosWithAuth()
    .get(`/stylists/1/posts`)
    .then(res=> { 
        this.setState({posts: res.data});
    })
    .catch(err=>{console.log('RECENT POSTS ERROR: ', err)});
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
          <img src='https://image.flaticon.com/icons/png/512/41/41463.png' alt='clipart of scissors and a comb'/>
          <div>
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
          </div>
        </Landing>
        <Recent>
          <h1>Checkout the Most Recent Posts</h1>
          <div>
            {this.state.posts.map(post=> (
                <PostCard 
                    id={post.id} 
                    post={post}
                />
            ))}
          </div>
        </Recent>
      </div>
    )
  }
}

export default Home;

const Landing = Styled.div`
  height: 45vh;
  width: 100%;
  margin: auto;
  background: linear-gradient(lavender, #6d5a73);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1{
    font-size: 2.75rem; 
    margin: 0 0 10px 0; 
    padding-top: 10%;
    font-family: 'Dancing Script', cursive;  
    text-align: left;
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
  img{ height: 80%; margin-top: 5px}
`;

const Recent = Styled.div`
  height: 45vh;
  width: 90vw;
  margin: 5% auto;
  h1{
    font-size: 1.5rem; 
    margin-bottom: 10px;  
    text-align: left;
    font-family: "Source Sans Pro", sans-serif;
  }
  div{
    margin: auto;
    display: flex;
    flex-wrap: wrap; 
    margin: 0 1px 2px 1px;
  }
`;
