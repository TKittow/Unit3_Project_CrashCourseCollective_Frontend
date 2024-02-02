import './App.css';
import { useEffect } from 'react'

const CLIENT_ID = '18b849ea0dd132f6729a'


function App() {

useEffect(()=> {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  console.log(codeParam);
}, []) // empty array to make the use effect only run once

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


// cd648d801403bd594f2c