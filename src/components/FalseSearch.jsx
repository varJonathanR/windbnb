import React, { useState } from 'react';

export default function FalseSearch({ isActive, setIsActive }) {
    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <section className="align-row fsearch-container">
            <img src="/src/assets/logo.png" alt="Windbnb Logo" />
            <div className="fsearch" onClick={handleClick}>
                <input type="text" placeholder='Add Location' />
                <input type="text" placeholder='Add Gests' />
                <button><i className="bi bi-search"></i></button>
            </div>
        </section>
    );
}
