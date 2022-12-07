import React, {useState, useRef,useEffect } from 'react';
import Login from './Components/Login';
import { API_BASE_URL, BEARER_TOKEN } from './hooks/config';
import axios from 'axios';
import "./App.css";
import logo from './logo.jpeg'

// reminder to install in terminal using command: 
// npm install react-google-login gapi-script
// npm install axios

function App () {
  const [places, setPlaces]=useState([]);
  //const [result, setResult] = useState('');
  //const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);

  const config = {
    headers: {
      Authorization: BEARER_TOKEN
    },
    params: {
      term: 'food',
      location: location,
      limit:5
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
  })
  .catch(error => {
    alert(error);
    console.log(error);
  });
};
// const fetchProducts = async () => {
//   const { data } = await axios
//   .get(API_BASE_URL, config);
//   const places = data;
//   setPlaces(
//     places.businesses.map(x=>({
//       name: x.name,
//       image_url: x.image_url,
//     })),
//   );
//   alert(places);
//   console.log(places);
// };

useEffect(() => {
  fetchNearbyPlacesWithYelp();
});

  const handleClick = () => {
    setLocation(inputRef.current.value);
    fetchNearbyPlacesWithYelp();
  }

  return (
    <div>
      <Login/>
      <input 
            ref={inputRef}
            type="text"
            id="city"
            name="city"
            placeholder='Ex. Boston'
          />
      <button onClick={handleClick}>Enter</button>
      {places.map((x,index) => (
        <p key={index}>{x.name}
          <img src={x.image_url} alt=""></img>
        </p>
      ))}
      <br />
      <img src={logo} alt="" className="logo" />
    </div>
            
  );
}

export default App;

