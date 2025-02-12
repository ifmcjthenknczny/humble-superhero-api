import React from 'react'
import ComicPanel from './ComicPanel'

export default function HeroImagePanel() {
    return (
        <ComicPanel centered>
            <img
                className="w-1/2"
                src="/superhero.png"
                alt="Superhero is coming for rescue!!!"
            ></img>
        </ComicPanel>
    )
}
