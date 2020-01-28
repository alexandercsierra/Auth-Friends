import React, {useState} from 'react'
import axios from 'axios'
import {axiosWithAuth} from  '../utils/axiosWithAuth'

export default function AddFriend() {
    const [addFriend, setAddFriend] = useState({
        id: Date.now(),
        name: '',
        age: '',
        email: ''
    })

    const handleChange = e => {
        setAddFriend({
            ...addFriend,
            [e.target.name]: e.target.value
        })
        console.log(addFriend);
    }

    const onSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post('/api/friends', addFriend)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))

        setAddFriend({
            id: Date.now(),
            name: '',
            age: '',
            email: ''
        })
    }


    return (
        <form onSubmit={onSubmit}>
            <input name="name" placeholder="name" value={addFriend.name} onChange={handleChange} required/>
            <input name="age" placeholder="age" value={addFriend.age} onChange={handleChange} required/>
            <input name="email" placeholder="email" value={addFriend.email} onChange={handleChange} required/>
            <button>Submit</button>
        </form>
    )
}
