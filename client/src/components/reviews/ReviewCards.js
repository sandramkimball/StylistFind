import styled from 'styled-components';

export default ReviewCard = (props) => {
    return (
        <div>
            <Card>
                <h4>{props.username}</h4>
                <h5>{props.stylist}</h5>
                <h5>at {props.salon}</h5>
                <p>{props.date}</p>
                <p>Comment</p>
                <img src=''/>
            </Card>
        </div>
    )
}


const Card = styled.div`
    width: 200px;
    border-radius: 4px;
    box-shadow: 0px 1px 1px black;
    display: flex;
    flex-direction: column;
    img{
        height: 200px;
        width: 100%;
        object-fit: cover;
    }
`;