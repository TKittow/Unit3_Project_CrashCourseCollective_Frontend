import './App.css';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import CohortPage from './pages/CohortPage/CohortPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import EditProfilePage from './pages/EditProfilePage/EditProfilePage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useUsers } from './context/UserContext'
import { useProjects } from './context/ProjectContext';

const CLIENT_ID = '18b849ea0dd132f6729a'
// Need to remove the above, as it should be in the backend,
// Front end doesnt like to pull through from an import

function App() {
  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})
  const { addUser } = useUsers()
  const { projects, } = useProjects()
  
  //! 'projects' as above will be moved to the project card

useEffect(() => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString) 
  const codeParam = urlParams.get('code')
  
  if(codeParam && !localStorage.getItem('accessToken')) {
    async function getAccessToken() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getAccessToken?code=${codeParam}`, {
          method:'GET'
      })
      const data = await response.json()
        if(data.access_token) {
          localStorage.setItem('accessToken', data.access_token) // setItem does not force a rerender on react. We want it to so we can show a state with the user being logged in
          setRerender(!rerender)
          getUserData()

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
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserData`, {
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
      console.log("user data logged")
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
    gitUrl: userData.html_url,
    userAvatar: userData.avatar_url
  }
  if (userData.login) {
    await addUser(newUser)
    console.log(`User ${userData.login}, gitUrl: ${userData.html_url} added to the database`)
  } else {
    console.error("No username available in userData")
  }
}

  function gitHubLogin(){ 
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }


 

  return (
    <div className="App">
      <main>
      <NavBar />
        <div className='login'>
          {localStorage.getItem('accessToken') ?
            <>
              {/* //insert if logged in items  */}
              <h1>Welcome {userData.login}</h1>
              <button onClick={() => { localStorage.removeItem('accessToken'); setRerender(!rerender)}}>
                Log Out
              </button> <br></br>
              

            </>
          :
            <>
            <button onClick={gitHubLogin}>
              Sign in with Git
            </button>
            </>
          }
        </div>
        <hr/>
          <Routes>
            <Route path='/' element={ <HomePage userData={userData} projects={projects}/> } />
            <Route path='/about' element={ <AboutPage userData={userData}/> } />
            <Route path='/cohort' element={ <CohortPage /> } />
            <Route path='/profilepage' element={ <ProfilePage userData={userData} /> } />
            <Route path='/profilepage/:username' element={ <UserProfilePage userData={userData} /> } />
            <Route path='/editprofilepage' element={ <EditProfilePage userData={userData}/> } />
            <Route path='/login' />
          </Routes>
        
      </main>
    </div>
  );
}

export default App;