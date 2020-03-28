import React, {useState, useEffect} from 'react'
import axiosWithAuth from '../utilis/axiosWithAuth'
import Styled from 'styled-components'
import ReviewCard from './ReviewCards.js'
import {Link} from 'react-router-dom'

const AllReviews = (props) => {
    const[reviews, setReviews] = useState([])
    var id = props.match.params.id
    
    function checkId(review){
        if (review.sylist_id === id){
            return review
        }
    }
    useEffect(()=> {
        axiosWithAuth()
        .get(`/search/reviews`)
        .then(res=> {
            const filteredArr = res.data.filter(obj=> obj.stylist_id == id)
            setReviews(filteredArr)
            console.log('reviews', reviews)
        })
        .catch(err=> console.log('Unable to fetch reviews', err))
    }, [])
        

    return(
        <Page>
            <Link to={`/stylists/${id}/dash`} className='return-btn'><p>Return</p></Link>
            <div className='container'>
                {reviews && reviews.map(review=> (
                    <ReviewCard  
                        key={id}
                        id={review.id} 
                        review={review}
                    />
                ))}
            </div>
        </Page>
    )
}

export default AllReviews

const Page = Styled.div`
    width: 70vw;   
    margin: 0 auto;
    margin-bottom: 5vh;
    .return-btn{ 
        text-decoration: none;
        padding: 0 10px;
        text-align: left;
        font-size: 1.25rem;
        color: gray
        :hover{cursor: pointer; color: orange}
    }
`