import React from 'react';
import SearchCard from './SearchCard';
import PostCard from '../posts/PostCard'
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            searchTerm: '',
            searchResults: [],
            filterOpt: 'stylists',
            isLoading: true,
            isError: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    };

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value }); 
        console.log('change handled')
    };

    handleFilter = e => {
        e.preventDefault()
        if(this.state.filterOpt === 'stylists'){
            let target = this.state.searchTerm.toLowerCase()
            const results = this.state.searchResults.filter(item=> 
                item.salon.toLowerCase().includes(target) ||
                item.city.toLowerCase().includes(target) ||
                item.first_name.toLowerCase().includes(target) ||
                item.last_name.toLowerCase().includes(target)         
            )
            this.setState({searchResults: results}) 
        }
        if(this.state.filterOpt === 'posts'){
            let target = this.state.searchTerm.toLowerCase()
            const results = this.state.searchResults.filter(item=>  
                item.comment !== null &&   
                item.comment.toLowerCase().includes(target)         
            )
            this.setState({searchResults: results}) 
        }
       
    }
 
    componentDidMount(){
        this.setState({isLoading: true})
        if(this.state.filterOpt === 'posts'){
            axiosWithAuth().get('/search/posts')
            .then(res=> {
                console.log('POSTS', res.data)
                this.setState({
                    searchResults: res.data,
                    isLoading: false,
                    isError: false,
                });
            })
            .catch(err=> {
                console.log(err) 
                this.setState({
                    isLoading: false,
                    isError: true,
                })
            })  
        } 
        else{
            axiosWithAuth().get('/search') 
            .then(res=> {
                console.log('STYLISTS', res.data)
                this.setState({
                    searchResults: res.data,
                    isLoading: false,
                    isError: false,
                })                
            }) 
            .catch(err=> {
                console.log(err) 
                this.setState({isLoading: false, isError: true})
            })         
        } 
    }
   
    render(){
        return(
            <div>
            <SearchBar>
                <form onSubmit={this.handleFilter}>
                    <input
                        type='text'
                        name='searchTerm'
                        placeholder='Search stylist, salon, city...'
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                </form>
                    <select className='filterOpt' name='filterOpt' onChange={this.handleChange}>
                        <option value='stylists'>Stylists</option>
                        <option value='posts'>Posts</option>
                    </select>
            </SearchBar>
            <SearchResultsContainer>
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

export default SearchPage;

const SearchResultsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 75%;
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
        border: none;
        height: 40px;
        width: 45%;
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
        }
        input:focus{border: 1px solid gray}
    }
    .filterOpt{
        font-size: 1rem;
        width: 15vw;
        height: 40px;
        border-radius: 2px;
        color: gray;
    }
`;