import React, {useState, useEffect} from 'react';
import { gapi } from 'gapi-script';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
// reminder to install in terminal using command: npm install react-google-login gapi-script

function App() {
  const [ profile, setProfile ] = useState([]);
    const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';
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
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };
  return (
    <div>
        <h2>Foodies</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
  );
}

export default App;
