import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { UsersProvider } from './context/UserContext';
import { ProjectsProvider } from './context/ProjectContext';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <UsersProvider>
      <ProjectsProvider>
    <App />
    </ProjectsProvider>
    </UsersProvider>

  </Router>
  /* </React.StrictMode> */
);

