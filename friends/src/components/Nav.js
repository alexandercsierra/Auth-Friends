import React from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import styled from 'styled-components'

const NavBar = styled.nav`
    background: black;
    display: flex;
    justify-content: flex-end;
    // border: 1px solid red;
`;

const NewNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    margin: 2%;
`;


export default function Nav() {
    const history = useHistory();
    return (
        <NavBar>
            <NewNavLink to='/friends'>Friends List</NewNavLink>
            <NewNavLink to='/login' onClick={()=>localStorage.clear()}>Sign Out</NewNavLink>
        </NavBar>
    )
}
