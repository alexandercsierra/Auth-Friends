import React, {useState} from 'react'
import {axiosWithAuth} from  '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const TheForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    width: 50%;
    margin: 4% 0 0 4%;
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
    width: 40%;
    margin: 4% auto;

`;

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
        <TheForm onSubmit={onSubmit}>
            <Input name="name" placeholder="name" value={addFriend.name} onChange={handleChange} required/>
            <Input name="age" placeholder="age" value={addFriend.age} onChange={handleChange} required/>
            <Input name="email" placeholder="email" value={addFriend.email} onChange={handleChange} required/>
            <Button>Submit</Button>
        </TheForm>
    )
}
