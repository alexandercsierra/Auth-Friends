import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {Route} from 'react-router-dom'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav'
import AddFriend from './components/AddFriend'
import styled from 'styled-components'
import friends from './imgs/friends.jpg'

const Banner = styled.div`
  height: 35vh;
  background-image: url(${friends});
  background-size: cover;
  background-position: 50% 10%;
`;

function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner></Banner>
      <Route exact path="/login"><Login/></Route>
      <div>
        <PrivateRoute path='/friends' component={FriendsList}/>
      </div>
      
      <PrivateRoute path='/addfriend' component={AddFriend}/>
    </div>
  );
}

export default App;
