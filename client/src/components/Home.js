import React, {useState, useEffect} from "react";
import {  Route } from "react-router-dom";
import Styled from "styled-components";
import axiosWithAuth from "./utilis/axiosWithAuth";
import SearchPage from './search/SearchPage';


export default function Home() {
  const [homeSearch, setHomeSearch] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    setHomeSearch(e.target.value)
    return <Route path="/search" component={SearchPage} searchTerm={homeSearch}/>
    // props.history.push('/search')
  };

  const handleChange = e => {
    e.preventDefault();
    setHomeSearch(e.target.value)
};

  return (
    <div>
      <Body>
        <Section1>
          <h1>Search</h1>
          <form onSubmit={handleSubmit}>
              <input
                id='search_input'
                type='text'
                name='textfield'
                placeholder='Enter location, salon or stylist name...'
                value={homeSearch}
                onChange={handleChange}
              />
          </form>
        </Section1>
     </Body>
    </div>
  );
}


const Body = Styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  dislay: flex;
  flex-direction: column;
`;

const Section1 = Styled.div`
  height: 90vh;
  width: 100vw;
  margin: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px 3px;
  background-color: #fff3df;
  h1{font-size: 2.75rem; padding: 0; margin: 10px 0; font-family: 'Dancing Script', cursive;  }
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

const RegisterBtn = Styled.div`
  width: 40vw;
  align-items: center;
  a{text-decoration: none;}
  h3{
    font-size: 3rem;
    color: purple;
    :hover{
      transform: scale(1.1);
      color: #80808095; 
      cursor: pointer;
    }
  }
`;




