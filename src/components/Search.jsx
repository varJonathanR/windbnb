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
    const [showLocations, setShowLocations] = useState(true);
    const [showCounts, setShowCounts] = useState(false);

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
        if(action === "addA" && countFilter <= 10) setcountGestsA(countGestsA + 1);
        else if(action === "addC" && countFilter <= 10) setcountGestsC(countGestsC + 1);
        else if(action === "removeA" && countGestsA > 0) setcountGestsA(countGestsA - 1);
        else if(action === "removeC" && countGestsC > 0) setcountGestsC(countGestsC - 1);
    };

    /* Show or hide location and gests control panel */
    const handleShow = show => {
        if(show === "locations") {
            setShowLocations(true);
            setShowCounts(false);
        } else if(show === "counts") {
            setShowLocations(false);
            setShowCounts(true);
        }
    }

    return (
        <>
            <section className='search-nav' id='search-nav'>
                <div className="align-row">
                    <section className='seacrh-filter-container column'>
                        <section className="search-filter">
                            <label htmlFor="location-label">
                                LOCATION
                                <input type="text" placeholder='Add Location' 
                                    value={filter} onChange={handleFilterChange} onClick={() => handleShow("locations")} />
                            </label>
                            <label htmlFor="gest">
                                Gests
                                <input type="number" placeholder='Add Gests' 
                                    value={countFilter} onChange={handleGestsChange}  onClick={() => handleShow("counts")} />
                            </label>
                        </section>
                        <section className="search-filter">
                            <div className={`align-row column gests-control ${showLocations ? "activeShow" : ""}`}>
                                { notFound && <p>{notFound}</p> }
                                { locations
                                    .filter(location => location.toLowerCase().includes(filter.toLowerCase()))
                                    .map((location, i) => (
                                        <p className='location' key={i} onClick={() => selectLocation(location)}>
                                            <i className="bi bi-geo-alt-fill"></i> {location}
                                        </p>
                                    )) }
                            </div>
                            <div className={`align-row column gests-control ${showCounts ? "activeShow" : ""}`}>
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
                            </div>
                        </section>
                    </section>
                    <button className="searchBtn" onClick={handleClick}>
                        <i className="bi bi-search"></i> Seacrh
                    </button>
                </div>
            </section>
        </>
    )
}
