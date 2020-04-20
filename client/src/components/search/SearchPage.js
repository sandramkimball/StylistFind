import React from 'react';
import SearchCard from './SearchCard';
import PostCard from '../posts/PostCard'
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import {filterFunction} from './Filter.js'

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            searchTerm: '',
            searchResults: [],
            filterOpt: '',
            isLoading: true,
            isError: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ ...this.state, [e.target.name]: e.target.value }); 
    }
 
    componentDidMount(){
       axiosWithAuth()
       .get('/search') 
       .then(res=> {
            this.setState({
                searchResults: res.data,
                isLoading: false,
                isError: false,
                filterOpt: 'stylists'
            })                
        }) 
        .catch(err=> {
            console.log(err.message, err) 
            this.setState({isLoading: false, isError: true})
        })
    }

    // switches between stylist and posts api. Currently there is a bug in the dropdown that, when switched, auto returns a post/card with no data until form is fully submitted.
    handleSubmit = e => {
        e.preventDefault()
        this.setState({isLoading: true})
        if(this.state.filterOpt === 'posts'){
            axiosWithAuth().get('/search/posts')
            .then(res=> {
                let results = filterFunction(res.data, this.state.filterOpt, this.state.searchTerm)
                this.setState({
                    searchResults: results,
                    isLoading: false,
                    isError: false,
                });
            })
            .catch(err=> {
                console.log(err.message, err) 
                this.setState({
                    isLoading: false,
                    isError: true,
                })
            })  
        } 
        if (this.state.filterOpt === 'stylists'){
            axiosWithAuth().get('/search') 
            .then(res=> {
                let results = filterFunction(res.data, this.state.filterOpt, this.state.searchTerm)
                this.setState({
                    searchResults: results,
                    isLoading: false,
                    isError: false,
                })                
            }) 
            .catch(err=> {
                console.log(err.message, err) 
                this.setState({isLoading: false, isError: true})
            })         
        } 
    }
   
    render(){
        return(
            <div>
            {/* this is the keyword search and stylist/post option */}
            <SearchBar className='search-bar'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='searchTerm'
                        placeholder='Search stylist, salon, city...'
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                    <select className='filterOpt' name='filterOpt' onChange={this.handleChange}>
                        <option value='stylists'>Stylists</option>
                        <option value='posts'>Posts</option>
                    </select>
                </form>
            </SearchBar>
            <SearchResultsContainer className='search-container'>
                {this.state.isLoading === true && (
                    <p>Finding {this.state.filterOpt}...</p>
                )}

                {this.state.isError === true && (
                    <p>There seems to be a server error. Check back later.</p>
                )}

                
                {this.state.filterOpt === 'stylists' && this.state.searchResults.map(result=> (
                    <SearchCard 
                        key={result.id} 
                        id={result.id} 
                        result={result}
                    />
                ))}
                
                {this.state.filterOpt === 'posts' && this.state.searchResults.map(result=> (
                    <PostCard 
                        key={result.id} 
                        id={result.id} 
                        post={result}
                        stylist={result}
                    />
                ))}
            </SearchResultsContainer>
        </div>
        )
    }
}

export {SearchPage}

// modified export for testing
export const handleSubmit=(filterOpt)=> {
    var isLoading = false
    if(filterOpt === 'posts'){
        isLoading = true
        axiosWithAuth().get('/search/posts')
    }
    if(filterOpt === 'stylists'){
        isLoading = true
        axiosWithAuth().get('/search')
    }
};



const SearchResultsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 85vw;
    margin: 5vh auto;
    display: flex;
    ::-webkit-scrollbar{ width: 0}
    }
`;

const SearchBar = styled.div`
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 70%;
    form{
        display: flex;
        width: 90vw;
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
            margin: 0 10px;
        }
        input:focus{border: 1px solid gray}
    }
    .filterOpt{
        font-size: 1rem;
        width: 20vw;
        height: 40px;
        border-radius: 2px;
        color: gray; 
    }
`;