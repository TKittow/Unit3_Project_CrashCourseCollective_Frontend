import './App.css';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import CohortPage from './pages/CohortPage/CohortPage';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState, useState } from 'react'

const CLIENT_ID = '18b849ea0dd132f6729a'
// Need to remove the above, as it should be in the backend,
// Front end doesnt like to pull through from an import?

function App() {

useEffect(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  console.log(codeParam);
}, []) // empty array to make the use effect only run once

async function getUserData() {
  await fetch('http://localhost:4000/getUserData', {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('accessToken')
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    setUserData(data)
  })
}

  function gitHubLogin(){ 
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }



  return (
    <div className="App">
      <button onClick={gitHubLogin}>Sign in with Git</button>
    </div>
  );
}

export default App;
