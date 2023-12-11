import React, { useEffect, useState } from 'react'
import Gests from './Gests';

export default function Search({ setLocationFilter, locations, countFilter, setCountFilter, isActive, setIsActive }) {
    const handleClick = () => {
        setIsActive(!isActive);
    };

    const [filter, setFilter] = useState("");
    const [notFound, setNotFound] = useState("");
    const [countGestsA, setcountGestsA] = useState(0);
    const [countGestsC, setcountGestsC] = useState(0);

    /* Filter by location */

    const handleFilterChange = e => {
        const userInput = e.target.value.trim();
        setFilter(userInput);

        if(!locations.some(location => location.toLowerCase().includes(userInput.toLowerCase()))) setNotFound("Location not found! :d");
        else setNotFound("");
    };

    /* Updating global states when user changes location or the number of gests */

    useEffect(() => {
        setLocationFilter(filter)
    }, [filter]);

    useEffect(() => {
        setCountFilter(countGestsA + countGestsC)
    }, [countGestsA, countGestsC]);

    const selectLocation = selectedLocation => {
        setFilter(selectedLocation);
        setNotFound("");
    };

    /* Filter by gests */

    const handleGestsChange = e => {
        const userInput = e.target.value.trim();
        const numberInput = userInput !== "" ? parseInt(userInput, 10) : "";
        
        if(!isNaN(numberInput)) setCountFilter(numberInput)
    };

    /* Add or Remove gests */

    const handleGests = action => {
        if(action === "addA") setcountGestsA(countGestsA + 1);
        else if(action === "addC") setcountGestsC(countGestsC + 1);
        else if(action === "removeA" && countGestsA > 0) setcountGestsA(countGestsA - 1);
        else if(action === "removeC" && countGestsC > 0) setcountGestsC(countGestsC - 1);
    };

    return (
        <>
            <section className='search-nav' id='search-nav'>
                <div className="align-row">
                    <section className="search-filter">
                        <label htmlFor="location-label">
                            LOCATION
                            <input type="text" placeholder='Add Location' value={filter} onChange={handleFilterChange} />
                        </label>
                        { notFound && <p>{notFound}</p> }
                        { locations
                            .filter(location => location.toLowerCase().includes(filter.toLowerCase()))
                            .map((location, i) => (
                                <p className='location' key={i} onClick={() => selectLocation(location)}>
                                    <i className="bi bi-geo-alt-fill"></i> {location}
                                </p>
                            )) }
                    </section>
                    <section className="search-filter">
                        <label htmlFor="gest">
                            Gests
                            <input name='gest' id='gest' type="number" placeholder='Add Gests' value={countFilter} onChange={handleGestsChange} />
                        </label>
                        <Gests 
                            countGests={countGestsA} handleGests={handleGests} 
                            remove={"removeA"} add={"addA"}
                            gestType={"Adult"} age={"Ages 13 or above"}
                        />
                        <Gests 
                            countGests={countGestsC} handleGests={handleGests} 
                            remove={"removeC"} add={"addC"}
                            gestType={"Children"} age={"Ages 2 - 12"}
                        />
                    </section>
                    <button className="searchBtn" onClick={handleClick}>
                        <i className="bi bi-search"></i> Seacrh
                    </button>
                </div>
            </section>
        </>
    )
}
