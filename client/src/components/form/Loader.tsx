import React from 'react'
import './Loader.css'

export default function Loader() {
    return (
        <div>
            <div className="body">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="hand">
                    <span></span>
                    <div className="face"></div>
                    <div className="cowl"></div>
                </div>
            </div>
            <div className="speed">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

// https://codepen.io/dragontheory/pen/zbmjoR
