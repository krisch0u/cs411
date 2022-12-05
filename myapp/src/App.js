import React from 'react';
import './App.css';
import City from './Components/City.js';
import Login from './Components/Login.js';
import Logout from './Components/Logout.js';
//import useBusinessSearch from './hooks/useBusinessSearch';

function App() {
  //const [items,setItems] = useState(null);
  // const [loading,setLoading] = useState(true);
  // const[error,setError] = useState(null);
  return (
    <div>
      <Login/>
      <br/>
      <Logout/>
      <br/>
      <City></City>
    </div>
  );
}

export default App;
