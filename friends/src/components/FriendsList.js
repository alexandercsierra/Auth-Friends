import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'
import EditForm from './EditForm'




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
            <button onClick={e=>history.push('/addfriend')}>Add a friend</button>
            {friends && friends.map(friend => {
                return(
                    <div>
                        <div>
                            <h1>{friend.name}</h1>
                            <p>Age: {friend.age}</p>
                            <p>Email: {friend.email}</p>
                            <button id={friend.id} onClick={editFriend}>Edit</button>
                            <button id={friend.id} onClick={deleteFriend}>Delete</button>
                        </div>
                        {isEditing && <EditForm friend={friends[0]}/>}
                    </div>
                )
            })}
        </div>
    )
}
