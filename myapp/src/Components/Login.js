import { gapi } from 'gapi-script';
import React, { useEffect, useState} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

function Login (){
  const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';

  const [profile, setProfile] = useState([]);


  useEffect(() => {
    const initClient = () => {
        gapi.client.init({
            clientId: clientId,
            scope: ''
        });
    };
    gapi.load('client:auth2', initClient);
  });
  const onSuccess = (res) => {
      setProfile(res.profileObj);
      window.value=true;
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
  };

  return(
  <div>
  <br />
  {profile ? (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess} 
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true} 
        />
      </div>
      
  ) : (
    
    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />

  )}
  {window.value && <div className= 'LoggedInSucess'>
  <h2>User Logged On</h2>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
  </div>}
  </div> 
    )
  }
export default Login;
