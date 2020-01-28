import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Nav() {
    const history = useHistory();
    return (
        <nav>
            <button onClick={(e)=>{
                localStorage.clear();
                history.push('/login');
                }}>Sign Out</button>
        </nav>
    )
}
