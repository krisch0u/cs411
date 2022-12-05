import React from 'react';
import {GoogleLogin} from 'react-google-login';
// refresh token
import { refreshTokenSetup } from './RefreshToken.js';

const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      'Logged in successfully welcome.'
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login'
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}
export default Login;