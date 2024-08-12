import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from "./nav-routes/Navigation";
import Routes from "./nav-routes/Routes";
import KfgApi from './api/api';
import UserContext from './auth/UserContext';
import jwt from 'jsonwebtoken';
import LoadingSpinner from './common/LoadingSpinner.jsx';

export const TOKEN_STORAGE_ID = "kfg-token";

// This is my App.jsx component. It is the root component of my application. It contains the Navigation component and the Routes component. The Navigation component displays the navigation bar at the top of the page. The Routes component contains the routes for the application. The App component also contains the UserContext.Provider, which provides the currentUser and setCurrentUser values to all components in the application. The App component uses the useLocalStorage hook to store the token in local storage. The App component also uses the useEffect hook to load the current user information when the component mounts. The App component also contains the login, signup, and logout functions, which are passed down to the Routes component as props. The App component also contains the isAuthenticated and isadmin variables, which are used to determine if the user is authenticated and if the user is an admin. The App component also contains the logout function, which logs the user out of the application.

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            KfgApi.token = token;
            let currentUser = await KfgApi.getCurrentUser(username);
            // console.log(`Current User in App:`, currentUser);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    }, 
    [token]
  );

  const isAuthenticated = currentUser !== null;
  const isadmin = currentUser?.isadmin || false;

  function logout() {
    // console.log("Logging out...");
    setCurrentUser(null);
    setToken(null);
    
    // console.log("currentUser after logging out: ", currentUser);
    // console.log("token after logging out: ", token);
  }

  async function signup(signupData) {
    try {
      let token = await KfgApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await KfgApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  async function profile(profileData) {
    try {
      let res = await KfgApi.profile(profileData);
      return { success: true, res };
    } catch (errors) {
      console.error("profile failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider 
        value={{ currentUser, setCurrentUser }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <Routes 
            login={login} 
            signup={signup} 
            profile={profile} 
            isAuthenticated={isAuthenticated} 
            isadmin={isadmin}
            />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;