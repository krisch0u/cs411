import Login from './Components/Login.js';
import './App.css';
import { useState, useEffect } from 'react';
import City from './Components/City.js';


function App() {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const[error,setError] = useState(null);

  useEffect(() => {
    fetch("http://opentable.herokuapp.com/api")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error)
        setError(error);
      })
      .finally(()=>{
        setLoading(false);
      })
  },[])

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <>
      <Login></Login>
      <City></City>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}

export default App;
