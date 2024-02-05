import './App.css';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import CohortPage from './pages/CohortPage/CohortPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MyDetailsPage from './pages/MyDetailsPage/MyDetailsPage'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUsers } from './context/UserContext'

const CLIENT_ID = '18b849ea0dd132f6729a'
// Need to remove the above, as it should be in the backend,
// Front end doesnt like to pull through from an import

function App() {
  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})
  const { addUser } = useUsers()



useEffect(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  
  if(codeParam && !localStorage.getItem('accessToken')) {
    async function getAccessToken() {
      try {
        const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
          method:'GET'
      })
      const data = await response.json()
        console.log(data)
        if(data.access_token) {
          localStorage.setItem('accessToken', data.access_token) // setItem does not force a rerender on react. We want it to so we can show a state with the user being logged in
          setRerender(!rerender)
          getUserData()
          console.log(userData.login)
        }
      } catch (error) {
        console.error("Error fetching access token:", error)
      }
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
    if (data.login) {
      setUserData(data)
    } else {
      console.error('GitHub user data does not contain username')
    }
  })
  .catch((error) => {
    console.error('error fetching user data:', error)
  })
}

useEffect(() => {
  if (userData.login) {
    loginUser()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userData.login])

async function loginUser() {
  const newUser = {
    username: userData.login,
    gitUrl: userData.html_url
  }
  if (userData.login) {
    await addUser(newUser)
    console.log(`User ${userData.login}, gitUrl: ${userData.html_url} added to the database`)
  } else {
    console.error("No username available in userData");
  }
}

  function gitHubLogin(){ 
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }



  return (
    <div className="App">
      <main>
          <NavBar />
          <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/about' element={ <AboutPage /> } />
            <Route path='/cohort' element={ <CohortPage /> } />
            <Route path='/profilepage' element={ <ProfilePage /> } />
            <Route path='/mydetails' element={ <MyDetailsPage /> } />
            <Route path='/login' />
          </Routes>
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
        </div>
        
      </main>
    </div>
  );
}

export default App;
