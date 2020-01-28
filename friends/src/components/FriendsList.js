import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'

export default function FriendsList() {
    const [friends, setFriends] = useState()

    useEffect(()=>{
        axiosWithAuth().get('/api/friends')
            .then(res=>setFriends(res.data))
            .catch(err=>console.log(err))
    }, [])


    return (
        <div>
            {friends && friends.map(friend => {
                return(
                    <div>
                        <h1>{friend.name}</h1>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                    </div>
                )
            })}
        </div>
    )
}
