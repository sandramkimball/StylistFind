import React, {useState, useEffect} from 'react';
import PostCard from './PostCard';
import Styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';

function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const id = props.id;
        axiosWithAuth()
        .get(`/stylists/profile/${id}/posts`)
        .then(res=> { 
            console.log('Posts: ', res.data);
            setPosts(res.data);
        })
        .catch(err=>{console.log('PHKHHK POST ERROR: ', err)
        });
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
    margin: 10vh auto;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
`;