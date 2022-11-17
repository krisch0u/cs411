import React from 'react';


function Login () {
  return (
    <p>
      Username: <input type="text" name="username" placeholder="Username" required></input>
      <br></br>
      Password: <input type="text" name="password" placeholder="Password" required></input>
    </p>
  )
};

export default Login;