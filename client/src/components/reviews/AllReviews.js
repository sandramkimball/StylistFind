import React, { useState, useEffect } from 'react'
import axiosWithAuth from '../utilis/axiosWithAuth'
import Styled from 'styled-components'
import ReviewCard from './ReviewCards.js'
import { Link } from 'react-router-dom'

const AllReviews = (props) => {
    const[reviews, setReviews] = useState([])
    var id = props.match.params.id
    var usertype = props.match.params.usertype

    useEffect(()=> {
        axiosWithAuth()
        .get(`/${usertype}s/${id}/reviews`)
        .then(res=> {
            setReviews(res.data)
        })
        .catch(err=> console.log(err.response))
    }, [])
        
    return(
        <Page>
            <nav>
                {localStorage.getItem('stylist') ==='stylsit' && localStorage.getItem('id') === id && (
                    <Link to={`/stylists/${id}/dash`}><button>Return</button></Link>
                )}
                {(
                    <Link to={`/stylists/${id}/portfolio`}><button>Return</button></Link>
                )}
            </nav>
            <section className='container'>
                {!reviews && (
                    <p>You have no reviews.</p>
                )}
                {reviews && reviews.map(review=> (
                    <ReviewCard  
                        key={id}
                        id={review.id} 
                        review={review}
                    />
                ))}
            </section>
        </Page>
    )
}

export default AllReviews

const Page = Styled.section` 
    margin: 0 auto;
    margin-bottom: 5vh;
    nav{
        width: 100vw;
        margin-bottom: 5vh;
        border-bottom: 1px solid gray;
        background: #fff;
        padding: 5px 10px;
        text-align: left;
    }
    button{ 
        text-decoration: none;
        border: none;
        font-size: 1.25rem;
        background: none;
        color: gray
        :hover{cursor: pointer; color: orange}
    }
    .add-review{
        position: fixed;
        bottom: 10px;
        right: 5vw;
        z-index: 10;
        background: orange;
        border-radius: 2px;
        padding: 10px 20px;
        textarea{
            border: none; 
            padding: 2px;
            font-size: 1rem;
            font-family: 'Source Sans Pro',sans-serif;
        }
        p{ 
            background: white;
            max-width: 45%;
            padding: 5px 10px;
            margin: 2px auto;
            font-size: 1rem;
            :hover{cursor: pointer; color: gray}
        }
    }
`