import React, {useEffect, useContext, useState} from 'react';
import {DataContext} from '../contexts/DataContext'
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import Loader from 'react-loader-spinner';
import {filterFunction} from './Filter.js';
import {SearchMap} from './Map.js';


const SearchPage = (props) => {
    const [data, setData] = useContext(DataContext)
    var recentSearch = localStorage.getItem('searched')
    const [state, setState] = useState({
        searchTerm: recentSearch || '',
        searchResults: [],
        isLoading: true,
        isError: false,
    })

    useEffect(()=>{
        axiosWithAuth()
        .get('/search') 
        .then(res=> {
            setState({
                searchResults: res.data,
                isLoading: false,
                isError: false,
            })    
            setData(res.data)          
        }) 
        .catch(err=> {
            console.log(err.message, err) 
            setState({isLoading: false, isError: true})
        })
    }, [])

    const handleChange = e => {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.target.value }); 
    }
 
    const handleSubmit = e => {
        e.preventDefault()
        setState({isLoading: true})
        axiosWithAuth()
        .get('/search') 
        .then(res=> {
            let results = filterFunction(res.data, state.searchTerm)
            setState({
                searchResults: results,
                isLoading: false,
                isError: false,
            })              
        }) 
        .catch(err=> {
            console.log(err.message, err) 
            setState({isLoading: false, isError: true})
        })         
    }
   
    return(
        <div>
        <SearchBar className='search-bar'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='searchTerm'
                    placeholder='Search stylist, salon, city...'
                    value={state.searchTerm}
                    onChange={handleChange}
                />
                <button>Search</button>
            </form>
        </SearchBar>
        <Container className='search-container'>
            <div className='results'>
                {state.isLoading === true && (                        
                    <Loader
                        type="Puff"
                        color="#925967"
                        height={100}
                        width={100}
                        className='loader'
                    />
                )}

                {state.isError === true && (
                    <p>There seems to be a server error. Check back later.</p>
                )}

                
                {state.searchResults && state.searchResults.map(result=> (
                    <SearchCard 
                        key={result.id} 
                        id={result.id} 
                        result={result}
                    />
                ))}

            </div>
            <div  className='map-container' style={{ height: '80vh', width: '40vw' }}>
                <SearchMap
                    results={state.searchResults}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    yesIWantToUseGoogleMapApiInternals
                    loadingElement={<div style={{height: '100%'}}/>}
                    containerElement={<div style={{height: '100%'}}/>}
                    mapElement={<div style={{height: '100%'}}/>}
                />
            </div>
        
        </Container>
    </div>
    )

}

export {SearchPage}

// modified export for testing
export const handleSubmit=(filterOpt)=> {
    // var isLoading = false
    if(filterOpt === 'posts'){
        // isLoading = true
        axiosWithAuth().get('/search/posts')
    }
    if(filterOpt === 'stylists'){
        // isLoading = true
        axiosWithAuth().get('/search')
    }
};



const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    display: flex;
    width: 85vw;  
    height: 70vh;
    div{
        width: 40vw; 
        display: flex;
        flex-direction: column;
    }
    .loader{align-self: center; margin: auto}
`;

const SearchBar = styled.div`
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 70%;
    form{
        display: flex;
        width: 40vw;
        border: none;
        height: 40px;
        button{
            background: none;
            border: 1px solid black;
            padding: 7px;
        }
        input{
            border: 1px solid gray;
            border-radius: 2px;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            font-size: 1rem;
            padding: 0 5px
        }
        input:focus{border: 1px solid gray}
        button{
            background: orange;
            font-size: 1rem;
            padding: 2px 5px;
            color: #fff;
            border: none;
            height: 100%;
            cursor: pointer
        }
    }
`;