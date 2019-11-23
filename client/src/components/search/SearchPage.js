import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import { axiosWithAuth } from '../utilis/axiosWithAuth';


function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(stylists, users);

    //how to get from two apis? search location and name.
    useEffect(()=> {
        axiosWithAuth()
        .get('/api/stylists') 
        const results = stylists.filter(item=> item.city.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    }, [searchTerm])

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    };

   

    return(
        <div>
            <SearchBar>
                <h1>Find Stylists</h1>
                <form onSubmit={handleChange}>
                    <input
                    id='search_input'
                    type='text'
                    name='textfield'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleChange}/>
                </form>
            </SearchBar>

            <SearchContainer>
                <div className='search-results'>
                    {searchResults.map(result=> (
                        <SearchCard key={result.id} result={result}/>
                    ))}
                </div>
            </SearchContainer>
        </div>
    )
}

export default SearchPage;


const SearchContainer = styled.div`
    margin: 0 auto;  
    width: 80%;
    display: flex;
    flex-direction: column;
    border: 1px solid #80808095;
`;

const SearchBar = styled.form`
    width: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    form{
        border-bottom: 1.5px solid gray;
        height: 30px;

        button{
            background: none;
            border: 1px solid black;
            padding: 7px;
        }
        input{
            border: none;
            width: 200px;
        }
    }
`;