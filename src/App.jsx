import React, { useState, useEffect } from 'react'
import './App.css'
import FalseSearch from './components/FalseSearch'
import Search from './components/Search'
import Stays from './components/Stays'
import Footer from './components/Footer'

function App() {
  /* Fetching stays data */
  const [stays, setStays] = useState([]);

  useEffect(() => {
    fetch("/data/stays.json")
      .then(response => response.json())
      .then(data => {
          console.log(data)
          setStays(data)
      })
      .catch(error => console.log("Error:", error));
  }, []);

  /* Filter by location state */
  const [locationFilter, setLocationFilter] = useState("");
  const locations = ['Helsinki, Finland', 'Turku, Finland', 'Oulu, Finland', 'Vaasa, Finland'];

  /* Filter by gests state */
  const [countFilter, setCountFilter] = useState("");

  /* Search nav activation */
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className={`${isActive ? 'active' : ''}`} id='header'>
        <FalseSearch isActive={isActive} setIsActive={setIsActive} />
        <Search 
          setLocationFilter={setLocationFilter} locations={locations} 
          countFilter={countFilter} setCountFilter={setCountFilter}
          isActive={isActive} setIsActive={setIsActive}
        />
      </header>
      <Stays 
        stays={stays}
        locationFilter={locationFilter}
        countFilter={countFilter}
      />
      <Footer />
    </>
  )
}

export default App
