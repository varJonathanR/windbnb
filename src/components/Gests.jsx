import React from 'react'

export default function Gests({ countGests, handleGests, remove, add, gestType, age }) {
    return (
        <div className="count-cont">
            <p>{gestType}</p>
            <p>{age}</p>
            <div className="count">
                <button onClick={() => handleGests(remove)}>-</button>
                <p>{countGests}</p>
                <button onClick={() => handleGests(add)}>+</button>
            </div>
        </div>
    )
}