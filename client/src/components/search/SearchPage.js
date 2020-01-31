import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import FilterBar from './Filter-Bar';
import GoogleApiWrapper from './Map';

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            searchTerm: '',
            searchResults: [],
            filterOpt: '',
            sortOpt: ''

        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({searchTerm: e.target.value})
    };

    componentWillMount(){
        if (this.state.filterOpt === 'stylists' || 'salons'){
            axiosWithAuth()
            .get('/search') 
            .then(res=> {
                const results = res.data.filter(item=> 
                    item.salon.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                    item.city.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                    item.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                    item.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) 
                );
                this.setState({searchResults: results});
            })   
        } else if(this.state.filterOpt === 'posts'){
            axiosWithAuth()
            .get('/search/posts')
            .then(res=> {
                var latest = res.data.filter(item=> item.date.sort())
                this.setState({searchResults: latest});
            })
        } else if(this.state.filterOpt === 'reviews'){
            axiosWithAuth()
            .get('/search/reviews')
            .then(res=>{ this.setState({searchResults: res.data}) })
        }
     };
    
    render(){
        return(
            <div>
                <div>
                <SearchBar>
                    <form onSubmit={this.handleChange}>
                        <input
                        id='search_input'
                        type='text'
                        name='textfield'
                        placeholder='Search stylist, salon, city...'
                        value={this.state.searchTerm}
                        onChange={this.handleChange}/>
                    </form>
                </SearchBar>
                </div>

                <BodyContainer>
                    <SideBarContainer>
                        <FilterBar 
                            props={this.state.searchResults}
                            onChange={this.handleChange}
                        />
                        {/* <GoogleApiWrapper/> */}
                    </SideBarContainer>
                    <SearchContainer>
                        {this.state.searchResults.map(result=> (
                            <SearchCard 
                            key={result.id} 
                            result={result}
                            props={this.state.filterOpt}/>
                        ))}
                    </SearchContainer>
                </BodyContainer>
            </div>
        )
    }
}

export default SearchPage;

const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
`;

const SideBarContainer = styled.div`
   margin: 0 auto;
    width: 20%;
    height: 100vh;
`;

const SearchContainer = styled.div`
    width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
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