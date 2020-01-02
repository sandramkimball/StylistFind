import React from 'react';
import styled from 'styled-components';

export default function FilterBar(props){
    const [filterResults, setFilterResults] = useState('stylists');

    const handleChange = e => {
        e.preventDefault();
        setFilterResults(e.target.value)
    };

    const sortByAlph = props => {
        return props.sort()
    }

    return (
        <div>
            <SIDEBAR>
            <div className='menu-container'>

                <p>Show me</p>
                <select name='show-me-opt' onChange={handleChange}>
                    <option value={stylists}>Stylists</option>
                    <option value={salons}>Salons</option>
                    <option value={posts}>Posts</option>
                    <option value={reviews}>Reviews</option>
                </select>

                <p>Sort By</p>
                <select name='sort-by-opt'>
                    <option value={}>Nearest</option>
                    <option value={}>Price (Asc)</option>
                    <option value={}>Price (Desc)</option>
                    <option value={} onSelect={sortByAlph}>Alphabetical</option>
                </select>

            </div>
            </SIDEBAR>
        </div>
    )
}

module.export = {filterResults};

let SIDEBAR = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 10px;
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



