import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'
export default function FriendsList() {
    const [friends, setFriends] = useState();
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

    return (
        <div>
            <button onClick={e=>history.push('/addfriend')}>Add a friend</button>
            {friends && friends.map(friend => {
                return(
                    <div>
                        <h1>{friend.name}</h1>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                        <button id={friend.id} onClick={deleteFriend}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}
