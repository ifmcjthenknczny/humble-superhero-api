import React from 'react'
import ComicPanel from './ComicPanel'
import SuperheroForm from '../form/SuperheroForm'

export default function FormPanel() {
    return (
        <ComicPanel centered>
            <SuperheroForm />
        </ComicPanel>
    )
}
