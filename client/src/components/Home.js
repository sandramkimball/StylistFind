import React, {useState, useEffect} from "react";
import {  NavLink, Route, Link } from "react-router-dom";
import Styled from "styled-components";
import Reviews from './reviews/Reviews';
import ReviewCard from './reviews/ReviewCards';
import Posts from './posts/Posts';
import axiosWithAuth from "./utilis/axiosWithAuth";


export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(()=>{
    axiosWithAuth()
    .get('/search/reviews')
    .then(res=> {
      console.log(res.data);
      setRecentReviews(res.data)
    })
    .catch(err=> {console.log('Latest Review Error: ', err)})
  }, [])

  useEffect(()=>{
    axiosWithAuth()
    .get('/search/posts')
    .then(res=> {
      var latest = res.data.filter(item=> item.date.sort())
      setRecentPosts(latest)
      console.log('Latest Posts: ', latest)
    })
    .catch(err=> {console.log('Latest Post Error: ', err)})
  }, [])

  const handleEnter = e => {
    e.preventDefault();
    return <Link to='/search'/>
    // props.history.push('/search')
  };

  return (
    <div>
      <Body>
        <Section1>
          <h1>Search</h1>
          <form onSubmit={handleEnter}>
              <input
                id='search_input'
                type='text'
                name='textfield'
                placeholder='Enter location, salon or stylist name...'
              />
          </form>
        </Section1>
        <Section2>
          <h1>Latest Reviews </h1>
          <div>
            {recentReviews.map(userReview=> (
                <ReviewCard key={userReview.id} userReview={userReview}/>
            ))}
            {/* <Reviews props={recentReviews} /> */}
          </div>
        </Section2>
        <Section3>
          <div>
            <h1>Latest Posts</h1>
            <Posts key={1} id={1}/>
          </div>
        </Section3>
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

const Section2 = Styled.section`
  width: 90vw;
  margin: 0 auto;
  h1{font-size: 1.5rem; color: orange; margin:  20px 0 0 0 }
  div{margin: 0 auto; display: flex; justify-content: center}
`;

const Section3 = Styled.section`
  width: 90vw;
  margin: 0 auto;
  div{margin: 0 auto}
  h1{font-size: 1.5rem; color: orange; margin: 20px 0 0 0 }
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




