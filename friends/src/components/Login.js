import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
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

const Login = (props) => {
    let history = useHistory()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //axios post with user info, expect back a token then proceed to protected route
        axios.post('http://localhost:5000/api/login', user)
            .then(res=>{
                localStorage.setItem('token', res.data.payload);
                history.push('/friends')
            })
            .catch(err=>console.log(err, user))
        setUser({
            username:'',
            password:''
        })
    }

    return (
        <TheForm onSubmit={onSubmit}>
            <Input type="text" name="username" placeholder="username" onChange={handleChange} value={user.username} autoComplete="off"/>
            <Input type="password" name="password" placeholder="password" onChange={handleChange} value={user.password} autoComplete="off"/>
            <Button>login</Button>

        </TheForm>
    )
}

export default Login
