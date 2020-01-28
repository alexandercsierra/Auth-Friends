import React, {useState} from 'react'
import axios from 'axios'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import styled from 'styled-components'

const TheForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    width: 30%;
    margin: 4% auto;
`;

const Input = styled.input`
    font-size: 1rem;
    padding: .5%;
`;

const Button = styled.button`
    font-size: 1rem;
    padding: 1%;
    border: none;
    background: #2F3392;
    color: white;
    box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);
    width: 20%;
    margin: 4% auto;

`;

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
        <TheForm onSubmit={onSubmit}>
            <Input  name="name" placeholder="name" value={addFriend.name} onChange={handleChange} required autoComplete="off"/>
            <Input  name="age" placeholder="age" value={addFriend.age} onChange={handleChange} required autoComplete="off"/>
            <Input name="email" placeholder="email" value={addFriend.email} onChange={handleChange} autoComplete="off" required />
            <Button>Submit</Button>
        </TheForm>
    )
}
