import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import FilterBar from './Filter-Bar';


function SearchPage({stylists, salons}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(stylists, salons);

    //Two apis? search location+name against salon+stylists.
    useEffect(()=> {
        axiosWithAuth()
        .get('stylists') 
        .then(res=> {
            console.log('LIST OF STYLISTS:', res);
            const results = res.data.stylists.filter(item=> item.city.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(results);
        })
        .catch(err=> {
            console.log(err)
        })
    }, [searchTerm]);

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    };

   

    return(
        <div>
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
            </div>
            <BodyContainer>
                {/* <FilterBar/> */}
                <SearchContainer>
                    <div className='search-results'>
                        <p>Test Stylists</p>
                        {/* {searchResults.map(result=> (
                            <SearchCard key={result.id} result={result}/>
                        ))} */}
                    </div>
                </SearchContainer>
            </BodyContainer>
        </div>
    )
}

export default SearchPage;

const BodyContainer = styled.div`
    display: flex
`;

const SearchContainer = styled.div`
    margin: 0 auto;  
    width: 80%;
    display: flex;
    flex-direction: column;
    border: 1px solid #80808095;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column
`;

const SearchBar = styled.div`
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