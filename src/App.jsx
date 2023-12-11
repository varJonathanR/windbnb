import React from 'react'
import './App.css'
import FalseSearch from './components/FalseSearch'
import Search from './components/Search'
import Stays from './components/Stays'
import Footer from './components/Footer'
import { useState } from 'react'

function App() {
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
        locationFilter={locationFilter}
        countFilter={countFilter}
      />
      <Footer />
    </>
  )
}

export default App
