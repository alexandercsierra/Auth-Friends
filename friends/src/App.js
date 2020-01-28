import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {Route} from 'react-router-dom'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path="/login"><Login/></Route>
      <PrivateRoute path='/friends' component={FriendsList}/>
    </div>
  );
}

export default App;
