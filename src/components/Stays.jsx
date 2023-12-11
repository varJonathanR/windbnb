/* Create all stays card */

import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Stays({ stays, locationFilter, countFilter }) {
    /* Filter by location */
    const locationCity = locationFilter.split(",")[0];
    let filteredStays = stays.filter(data => data.city.toLowerCase().includes(locationCity.toLowerCase()));

    /* Add Gests filter when user adds gests */
    if(countFilter !== "") filteredStays = filteredStays.filter(data => data.maxGuests >= parseInt(countFilter, 10));

    return (
        <>
            <div className="align-row stays-header">
                <h1>Stays in Finland</h1>
                <p className="total-stays">{filteredStays.length} Stays</p>
            </div>
            <section className='stays'>
                { filteredStays
                    .map(data => (
                        <div className='stay' key={data.id}>
                            <div className="img-container">
                                <img src={data.photo} alt="" />
                            </div>
                            <div className="info-container">
                                <div className="align-row">
                                    { data.superHost === true ? <p className='superHost'>SUPER HOST</p> : "" }
                                    {/* Writting the number of beds in each stay, if there is only 1 bed, will be in singular */}
                                    <p className='type'>{`${data.type} ${ data.beds === null ? "" 
                                        : data.beds === 1 ? `● ${data.beds} bed`
                                        : `● ${data.beds} beds` }`}</p>
                                    <p className="rating"><i className="bi bi-star-fill"></i> {data.rating}</p>
                                </div>
                                <h4>{data.title}</h4>
                            </div>
                        </div>
                )) }
            </section>
        </>
    )
}
