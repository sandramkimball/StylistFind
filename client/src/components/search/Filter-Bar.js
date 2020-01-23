import React, {useState} from 'react';
import styled from 'styled-components';

export default function FilterBar(props){
    const [filterOpt, setFilterOpt] = useState('stylists');
    const [sortOpt, setSortOpt] = useState('stylists');

    const changeFilter = e => {
        e.preventDefault();
        setFilterOpt(e.target.value);
    };

    const changeSort = e => {
        e.preventDefault();
        setSortOpt(e.target.value);
    };

    const sortByAlph = props => {
        return props.salon.sort() || props.first_name.sort()
    }

    return (
        <div>
            <SIDEBAR>
            <div className='menu-container'>

                <p>Show me</p>
                <select name='show-me-opt' onChange={changeFilter}>
                    <option value={'stylists'}>Stylists</option>
                    <option value={'salons'}>Salons</option>
                    <option value={'posts'}>Posts</option>
                    <option value={'reviews'}>Reviews</option>
                </select>

                <p>Sort By</p>
                <select name='sort-by-opt' onChange={changeSort}>
                    <option onSelect={sortByAlph}>Alphabetical</option>
                    <option>Nearest</option>
                    <option>Rating</option>
                </select>

            </div>
            </SIDEBAR>
        </div>
    )
}


let SIDEBAR = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 10px;
    select{
        width: 100%;
        border-radius: 2px;
        padding: 3px 5px;
        font-size: 1rem;
        color: gray;
    }
    p{
        text-align: left;
        font-weight: 600;
        margin: 0;
    }
    ul{
        text-align: left;
        list-style: none;
        margin: 0;
        padding-left: 0
        li:hover{
            cursor: pointer;
            color: red;
            text-decoration: underline;
        }
    }
`;



