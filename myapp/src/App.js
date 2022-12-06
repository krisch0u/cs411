import React, {useState, useEffect, useRef} from 'react';
import { gapi } from 'gapi-script';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
// import { BEARER_TOKEN } from './hooks/config';
// import axios from 'axios';

function App() {
  const [ profile, setProfile ] = useState([]);
  // const [food, setFood] = useState(null);
  // const [city, setCity] = useState(null);
  // const [restaurants, setRest] = useState([]);
  const inputRef = useRef(null);
  const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer %s' % BEARER_TOKEN
  //   }
  // };
  
  // fetch('https://cors-anywhere.herokuapp.com/corsdemo/https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

  // const getRandomWords = () => {
  //   const options = {
  //       method: 'GET',
  //       url: 'https://cors-anywhere.herokuapp.com/corsdemo/https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20',
  //       Authorization: 'Bearer %s' % BEARER_TOKEN,
  //       params: {term: food, location: city},
  //   }

  //   axios.request(options).then((response) => {
  //       alert(response.data)
  //       console.log(response.data)
  //       setRest(response.data)

  //   }).catch((error) => {
  //       console.error(error)
  //   })
  //}

  function handleClick() {
    console.log(inputRef.current.value);
    inputRef.current.value = null;
  }

//   useEffect(() => {
//     if (food) getRandomWords()
// }, [food]);

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
       <br />
        {profile ? (
          <div>
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <input
            ref={inputRef}
            type="text"
            id="City"
            name="City"
            placeholder='Ex. Boston'
          />
          <button onClick={handleClick}>Enter</button>
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
