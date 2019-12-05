import React from 'react';
import PostCard from './PostCard';
import Styled from 'styled-components';

const Posts = (props) => {
    return (
        <div>
            <Card>
                <p>All Posts Tests</p>
            </Card>
        </div>
    )
}

export default Posts;

const Card = Styled.div`
    width: 80%;
    margin: 10vh auto;
    text-align: left;
    border: 1px solid gray;
    p{height: 250px; width: 200px; border: 1px solid purple}
`;