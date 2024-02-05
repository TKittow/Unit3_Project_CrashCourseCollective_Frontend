import './App.css';
import { useEffect, useState } from 'react'
import AddProjectModal from './components/AddProjectModal';

const CLIENT_ID = '18b849ea0dd132f6729a'
// Need to remove the above, as it should be in the backend,
// Front end doesnt like to pull through from an import

function App() {
  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)



useEffect(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  
  if(codeParam && !localStorage.getItem('accessToken')) {
    async function getAccessToken() {
      await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
        method:'GET'
      }).then ((response) => {
        return response.json()
      }).then((data) =>{
        console.log(data);
        if(data.access_token) {
          localStorage.setItem('accessToken', data.access_token) // setItem does not force a rerender on react. We want it to so we can show a state with the user being logged in
          setRerender(!rerender)
        }
      })
    }
    getAccessToken()
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
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


  //? Modal Logic
  function handleClose(){
    setShowModal(false)
  }

  async function addProject(projectData) {
    try {
        const response = await fetch('/project/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });
        if (response.ok) {
            console.log('Nailed It! (Project added)');
        } else {
            console.error('Whomp Whomp, didnt add the project :(');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

  return (
    <div className="App">
      <main>
        <div className='login'>
          {localStorage.getItem('accessToken') ?
            <>
              {/* //insert if logged in items  */}
              <h1>We have a token</h1>
              <button onClick={() => { localStorage.removeItem('accessToken'); setRerender(!rerender)}}>
                Log Out
              </button>
              <h3> Get user data </h3>
              <button onClick={getUserData}>Get Data</button>
              {Object.keys(userData).length !== 0 ?
              <>
                <h4> Hey there {userData.login}</h4>
                <img width='100px' height='100px' src={userData.avatar_url} alt='profile pic'></img>
                <a href={userData.html_url} style={{'color' : 'blue'}}>Link to GitHub profile</a>
              </>
              :
              <>
              </>}
            </>
          :
            <>
            <button onClick={gitHubLogin}>
              Sign in with Git
            </button>
            </>
          }
        </div>
        <div className='projectGrid'>
          {/* // display public projects for non logged in users */}
          <AddProjectModal show={showModal} handleClose={handleClose} AddProject={addProject}/>
        </div>
        
      </main>
    </div>
  );
}

export default App;
