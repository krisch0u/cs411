import React, {useState, useEffect, useRef, useCallback } from 'react';
import { gapi } from 'gapi-script';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { API_BASE_URL, BEARER_TOKEN } from './hooks/config';
import axios from 'axios';

// reminder to install in terminal using command: npm install react-google-login gapi-script

function App () {
  const [ profile, setProfile ] = useState([]);
  const [place, setPlaces]=useState([]);
  const [location, setLocation] = useState(null);
  const [posts,setPosts] = useState([]);
  const inputRef = useRef(null);
  const clientId = '920757342306-retlhm1jpfe3j3q00uj5l6l2lqokps15.apps.googleusercontent.com';
  const config = {
    headers: {
      Authorization: BEARER_TOKEN
    },
    params: {
      term: 'food',
      location: 'Boston'
    }
  };
  
  const fetchNearbyPlacesWithYelp = async () => {
    return axios
    .get(API_BASE_URL, config)
    .then(place => {
      // Get places’ names and images.
      setPlaces(
        place.data.businesses.map(x => ({
          name: x.name,
          image_url: x.image_url,
      })),
    );
    alert(place.data.businesses[0].name)
  })
  .catch(error => {
    alert(error);
    console.log(error);
  });
};

  function handleClick() {
    console.log(inputRef.current.value);
    setLocation(inputRef);
    inputRef.current.value = null;

  }

  // const fetchItems = async () => {
  //   const data = await axios
  //     .get(
  //       `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=usa`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${BEARER_TOKEN}`,
  //         },
  //         params: {
  //           term: 'restaurants',
  //           location:'Boston'
  //         },
  //       },
  //     )
  //     .then(json => {
  //       setPlaces({ items: json.data.businesses });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }

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
                      id="city"
                      name="city"
                      placeholder='Ex. Boston'
                    />
                    <button onClick={handleClick}>Enter</button>
                    <button onClick={fetchNearbyPlacesWithYelp}>Get</button>

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
