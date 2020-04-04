import React from  'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
    
const Toolbar = (props) => {
    const {id} = props.stylist;
    const isAdded = props.added
    const handleSave = e => {
        e.preventDefault();
        const cssName = (this.state.isSaved === false) ? true : false
        this.setState({added: cssName})
        // props.user.bookmarks.push({stylist: this.state.stylist})
    }
    
    return(
        <Bar>
            <Link to={`/stylist/${id}/reviews`} usertype={'stylist'}><p>Read Reviews</p></Link>

            {localStorage.getItem('usertype') === 'user' && (
                <>
                    <p className={`add-stylist ${isAdded ? false : true}`} onClick={handleSave}>❤ Save</p>
                    <Link to={`/stylist/${id}/add-review`} params={{ props: props.stylist }}>
                        <p>+ Add Review</p>
                    </Link>
                </>
            )}

            {localStorage.getItem('id') === id && (
                <>
                    <Link to={`/stylist/${id}/edit`} className='edit-btn'>
                        <p>Edit</p>
                    </Link>
                    <Link to={`/stylist/${id}/add-post`}>
                        <p>+</p>
                    </Link>
                </>
            )}
        </Bar>
    )
}

export default Toolbar

const Bar = styled.div`
    display: flex;
    p{
        text-align: right;
        padding: 0 15px;
        font-size: 1.25rem;
        color: gray;
        cursor: pointer;
        :hover{color: orange}
    }    
    .edit-btn{
        color: #80808075;
        :hover{color: #000}
    }
    .add-stylist :hover{
        color: pink
    }
`;