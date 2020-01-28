import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

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
        <form onSubmit={onSubmit}>
            <input type="text" name="username" placeholder="username" onChange={handleChange} value={user.username}/>
            <input type="password" name="password" placeholder="password" onChange={handleChange} value={user.password}/>
            <button>login</button>

        </form>
    )
}

export default Login
