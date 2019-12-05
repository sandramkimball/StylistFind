import React, {useState, useEffect} from 'react';
import PostCard from './PostCard';
import Styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

const Posts = props => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const id = props.id
        axiosWithAuth()
        .get(`/stylists/profile/3/posts`)
        .then(res=> { 
            console.log('Posts Res.Data: ', res.data);
            const posts = res.data;
            // setPosts(posts);
            console.log('Posts: ', posts);
        })
        .catch(err=>{console.log('PHKHHK POST ERROR: ', err)});
    }, [])

    return (
        <div>
            <Card>
                {posts.map(post=> (
                    <PostCard key={post.id} post={post}/>
                ))}                
            </Card>
        </div>
    )
}

export default Posts;

const Card = Styled.div`
    width: 100%;
    margin: 10vh auto;
    text-align: left;
    border: 2px solid orange;
    display: flex;
    flex-wrap: wrap;
`;