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
    

    return (
        <div>
            <SIDEBAR>
            <div>
                <p>Show me</p>
                <select name='show-me-opt' onChange={changeFilter}>
                    <option value={'stylists'}>Stylists</option>
                    <option value={'salons'}>Salons</option>
                    <option value={'posts'}>Posts</option>
                    <option value={'reviews'}>Reviews</option>
                </select>
            </div>
            <div>
                <p>Sort By</p>
                <select name='sort-by-opt' onChange={changeSort}>
                    <option value={'alphabetical'}>Alphabetical</option>
                    <option value={'nearest'}>Nearest</option>
                    <option value={'rating'}>Rating</option>
                </select>
            </div>
            </SIDEBAR>
        </div>
    )
}


let SIDEBAR = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 10px;
    div{width: 49%;}
    select{
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



