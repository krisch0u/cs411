
import React, {useState, useRef, useEffect } from 'react';
import Login from './Components/Login';
import { API_BASE_URL, BEARER_TOKEN,API_BASE_URL2 } from './hooks/config';
import axios from 'axios';
import "./App.css";
import logo from './logo.png';

// reminder to install in terminal using command: 
// npm install react-google-login gapi-script
// npm install axios
// refresh cors before starting
// npm i nutritionix-api --legacy-peer-deps


function App () {
  const [places, setPlaces]=useState([]);
  const [foodItem, setNutrients] = useState([]);
  const [meal, setMeal] = useState('');
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  // const nutritionix = require("nutritionix-api");
  // const appId = '1fe9de8b';
  // const appkey = '8718096fbd6e7307d8fc8625f0857bab';
  // nutritionix.init(appId,appkey);
  // nutritionix.natural.search('Apple').then(result =>{
  //   alert(result);
  // })
  // YELP API
  const config = {
    headers: {
      Authorization: BEARER_TOKEN,
      'client_id':"aXyCTnnddco_hfwwOa5Lyg",
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
    //alert(place.data.businesses[0].name)
  })
  .catch(error => {
    console.log(error);
  });
};
// NUTRITIONIX API
const config2 = {
  headers: {
    "appId": '1fe9de8b',
    "appKey": '8718096fbd6e7307d8fc8625f0857bab',
  },
}
const fetchNutriutionInfo = async () => {
  return await axios
  .get(API_BASE_URL2,config2)
  .then(foodItem.set({
    food: 'item_name',
    calories: 'nf_calories',
  }))
  .catch(error => {
    alert(error);
    console.log(error);
  });
}

useEffect(() => {
  fetchNearbyPlacesWithYelp();
});
  useEffect(() => {
    fetchNutriutionInfo(); 
  });
  const handleClick = () => {
    setLocation(inputRef.current.value);
    fetchNearbyPlacesWithYelp();
  }
  const handleClick2 = () => {
    setMeal(inputRef2.current.value);
    fetchNutriutionInfo();
  }
  return (
    <div className='App'>
      <div className='heading'>
        <h1>Restaurants and Wellness App</h1>
      </div>
      <img src={logo} alt="" className='logo'></img>
    <Login/>
    <h2>Enter Your City</h2>
    <input 
          ref={inputRef}
          type="text"
          id="city"
          name="city"
          placeholder='Ex. Boston'
        />
    <button onClick={handleClick} className='button'>Enter</button>
    {places.map((x,index) => (
      <p key={index} className='restaurantNames'>{x.name} 
      <br/>
        <img src={x.image_url} alt="" className='restaurantImages'></img>
      </p>
    ))}
    <br />
    {/* <input 
          ref={inputRef2}
          type="text"
          id="meal"
          name="meal"
          placeholder='Ex. Pizza'
        />
    <button onClick={handleClick2}>Enter</button>
    {foodItem.map((x,index) =>(
      <p key ={index}>{x.fields.nf_calories}</p>
      ))} */}
      <br/>
  </div>
);
}
export default App;
