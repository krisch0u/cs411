import React from "react";
import {GoogleLogout} from 'react-google-login';

const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';

function Logout(){
  const onSuccess = () => {
    alert("Logout made successfully");
  }
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );  
}
export default Logout;