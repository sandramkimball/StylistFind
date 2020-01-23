import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import FilterBar from './Filter-Bar';
import GoogleApiWrapper from './Map';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filterOpt, setFilterOpt] = useState({});
    const [sortOpt, setSortOpt] = useState({});

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    };

    const changeFilter = e => {
        e.preventDefault();
        setFilterOpt(e.target.value);
    };

    const changeSort = e => {
        e.preventDefault();
        setSortOpt(e.target.value);
    };
    

    useEffect(()=> {
        if (filterOpt === 'stylists' || 'salons'){
            axiosWithAuth()
            .get('/search') 
            .then(res=> {
                const results = res.data.filter(item=> 
                    item.salon.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) 
                );
                setSearchResults(results);
            })   
        } else if(filterOpt === 'posts'){
            axiosWithAuth()
            .get('/search/posts')
            .then(res=> {
                var latest = res.data.filter(item=> item.date.sort())
                setSearchResults(latest);
            })
        } else if(filterOpt === 'reviews'){
            axiosWithAuth()
            .get('/search/reviews')
            .then(res=> {setSearchResults(res.data)})
        }
     }, [searchTerm])
    

    return(
        <div>
            <div>
            <SearchBar>
                <form onSubmit={handleChange}>
                    <input
                    id='search_input'
                    type='text'
                    name='textfield'
                    placeholder='Search stylist, salon, city...'
                    value={searchTerm}
                    onChange={handleChange}/>
                </form>
            </SearchBar>
            </div>

            <BodyContainer>
                <SideBarContainer>
                    <FilterBar 
                        props={searchResults}
                        onChange={handleChange}
                        setFilterOpt={setFilterOpt}
                        setSortOpt={setSortOpt}
                    />
                    <GoogleApiWrapper/>
                </SideBarContainer>
                <SearchContainer>
                    {searchResults.map(result=> (
                        <SearchCard 
                        key={result.id} 
                        result={result}
                        props={filterOpt}/>
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
`;

const SearchContainer = styled.div`
    width: 65vw;
    margin: auto;
    display: flex;
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