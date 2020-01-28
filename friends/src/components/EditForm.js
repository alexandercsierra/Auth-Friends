import React, {useState} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'

export default function EditForm(props) {
    const history = useHistory();
    const [addFriend, setAddFriend] = useState(props.friend)

    const handleChange = e => {
        setAddFriend({
            ...addFriend,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axiosWithAuth().put(`/api/friends/${props.friend.id}`, addFriend)
            .then(res=>window.location.reload())
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
