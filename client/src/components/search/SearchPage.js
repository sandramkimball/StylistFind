import React from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            searchTerm: '',
            searchResults: [],
            filterOpt: '',
            sortOpt: '',
            isLoading: true,
            isError: false,

        }
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount(){
        axiosWithAuth()
            .get('/search') 
            .then(res=> {
                const results = res.data
                this.setState({searchResults: results, isLoading: false, isError: false});
            }) 
            .catch(err=>{
                console.log(err)
                this.setState({isLoading: false, isError: true});

            }) 
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({searchTerm: e.target.value})
   
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
            .catch(err=>{
                console.log(err)
            }) 
                        
        } 
        else if(this.state.filterOpt === 'posts'){
            axiosWithAuth()
            .get('/search/posts')
            .then(res=> {
                var latest = res.data.filter(item=> item.date.sort())
                this.setState({searchResults: latest});
            })
            .catch(err=>{
                console.log(err)
            })  

        } 
        else if(this.state.filterOpt === 'reviews'){
            axiosWithAuth()
            .get('/search/reviews')
            .then(res=>{ this.setState({searchResults: res.data}) })
            .catch(err=> {console.log(err)})
        }
     };
    
    render(){
        return(
            <div>
            <SearchBar>
                {/* <FilterBar 
                    props={this.state.searchResults}
                    onChange={this.handleChange}
                /> */}
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
            <SearchResultsContainer>
                {this.state.isLoading === true && (
                    <p>Finding stylists...</p>
                )}
                {this.state.isError === true && (
                    <p>There seems to be a server error. Check back later.</p>
                )}


                {this.state.searchResults === [] && (
                    <p>Results</p>
                )}
                
                {this.state.searchResults.map(result=> (
                    <SearchCard 
                        key={result.id} 
                        id={result.id} 
                        result={result}
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
`;