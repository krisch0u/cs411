import React, {useState, useRef,useEffect } from 'react';
import Login from './Components/Login';
import { API_BASE_URL, API_BASE_URL2, BEARER_TOKEN} from './hooks/config';
import axios from 'axios';
import "./App.css";
import logo from './logo.png'

// reminder to install in terminal using command: 
// npm install react-google-login gapi-script
// npm install axios

function App () {
  const [places, setPlaces]=useState([]);
  const [location, setLocation] = useState('');
  const [foodItem, setNutrients]=useState([]);
  const [meal, setMeal] = useState('');
  const inputRef = useRef(null);

  // YELP API
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

// NUTRITIONIX API
const config2 = {
  headers: {
    'X-RapidAPI-Key': 'a6e6cb8997mshc9cc50ae76e2c3ap1c0685jsn889611677324',
    'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
  },
  params: {
    fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat',
    phrase: meal
  }
}
const fetchNutriutionInfo = async () => {
  return axios
  .get(API_BASE_URL2, config2)
  .then(foodItem => {
    // Get the nutrition info
    setNutrients(
      foodItem.data.search.map(x => ({
        food: x.food
      }))
    );
  })
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
    setMeal(inputRef.current.value);
    fetchNutriutionInfo();
  }

  return (
    <div className='App'>
      <div className='heading'>
      <h1>Restaurants and Wellness App</h1>
      </div>
      <Login/>
      {window.value && <div className='LoggedIn'>
      <h2>Enter Your City</h2>
      <input 
            ref={inputRef}
            type="text"
            id="city"
            name="city"
            placeholder='Ex. Boston'
          />
      <div className='button'>
        <button onClick={handleClick}>Enter</button>
        {places.map((x,index) => (
          <p key={index}>{x.name}
            <img src={x.image_url} alt=""></img>
         </p>
        ))}
      </div>
      <h2>Enter Your Meal</h2>
      <input 
            ref={inputRef}
            type="text"
            id="foodItem"
            name="foodItem"
            placeholder='Ex. Pizza'
          />
      <div className='button'>
        <button onClick={handleClick2}>Enter</button>
        {foodItem.map((x,index) => (
         <p key={index}>{x.food}
         </p>
       ))}
      </div>
      </div>}
      <br />
      <img src={logo} alt="" className="logo" />
    </div>
            
  );
}

export default App;

