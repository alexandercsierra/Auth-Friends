import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'
import EditForm from './EditForm'
import styled from 'styled-components'

const ListDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
//   border: 1px solid blue;
//   height: 100vh;
`;

const FriendContainer = styled.div`
    display: flex;
    margin: 2%;
`;

const FriendDiv = styled.div`
    text-align: center;
    width: 400px;
    padding: 4%;
    // border: 1px solid red;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
`;

const Button = styled.button`
    margin-top: 4%;
    font-size: 1rem;
    padding: .5%;
    border: none;
    background: #F8292B;
    color: white;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
`;

export default function FriendsList() {
    const [friends, setFriends] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        axiosWithAuth().get('/api/friends')
            .then(res=>setFriends(res.data))
            .catch(err=>console.log(err))
    }, [])

    const deleteFriend = (e) => {
        console.log(e.target.id)
        let filtered = friends.filter(friend => friend.id !== Number(e.target.id));
        console.log(filtered);
        axiosWithAuth().delete(`/api/friends/${e.target.id}`)
            .then(res=>setFriends(res.data))
            .catch(err=>console.log(err))

    }

    const editFriend = (e) => {
        console.log(e.target.id)
        let filtered = friends.filter(friend => friend.id === Number(e.target.id));
        setFriends(filtered);
        setIsEditing(true);

    }

    return (
        <div>
            <Button onClick={e=>history.push('/addfriend')}>Add a friend</Button>
            <ListDiv>
                
                {friends && friends.map(friend => {
                    return(
                        <FriendContainer>
                            <FriendDiv>
                                <h2>{friend.name}</h2>
                                <p>Age: {friend.age}</p>
                                <p>Email: {friend.email}</p>
                                <button id={friend.id} onClick={editFriend}>Edit</button>
                                <button id={friend.id} onClick={deleteFriend}>Delete</button>
                            </FriendDiv>
                            {isEditing && <EditForm friend={friends[0]}/>}
                        </FriendContainer>
                    )
                })}
            </ListDiv>
        </div>
    )
}
