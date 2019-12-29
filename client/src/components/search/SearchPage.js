import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import FilterBar from './Filter-Bar';
import GoogleApiWrapper from './Map';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=> {
        axiosWithAuth()
        .get('/search') 
        .then(res=> {
            console.log('LIST OF STYLISTS:', res);
            const results = res.data.filter(item=> item.salon.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(results);
        })
        .catch(err=> {
            console.log('FACEPALM', err)
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
                    <form onSubmit={handleChange}>
                        <input
                        id='search_input'
                        type='text'
                        name='textfield'
                        placeholder='Search stylist or salon'
                        value={searchTerm}
                        onChange={handleChange}/>
                    </form>
                </SearchBar>
            </div>
            <BodyContainer>
                <SideBarContainer>
                    <FilterBar/>
                    <GoogleApiWrapper/>
                </SideBarContainer>
                <SearchContainer>
                    {searchResults.map(result=> (
                        <SearchCard key={result.id} result={result}/>
                    ))}
                </SearchContainer>
            </BodyContainer>
        </div>
    )
}

export default SearchPage;

const BodyContainer = styled.div`
    display: flex
`;

const SideBarContainer = styled.div`
    position: fixed;
    left: 0;
    width: 20vw;
    height: 100vh;
    border-right: .5px solid gray;
`;

const SearchContainer = styled.div`
    width: 65vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: fixed;
    top: 20vh;
    left: 25vw;
    padding-bottom: 10px;
    ::-webkit-scrollbar{ width: 0}
    }
`;

const SearchBar = styled.div`
    margin: 10px 5px;
    display: flex;
    justify-content: flex-end;
    form{
        border: none;
        height: 40px;
        width: 25%;
        button{
            background: none;
            border: 1px solid black;
            padding: 7px;
        }
        input{
            border: 1px solid black;
            border-radius: 2px;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding-left: 5px;
            font-size: 1rem;
        }
        input:focus{border: 1px solid gray}
    }
`;