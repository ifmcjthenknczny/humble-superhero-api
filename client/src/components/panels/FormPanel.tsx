import React from 'react'
import ComicPanel from './ComicPanel'
import SuperheroForm, {
    Props as SuperheroFormProps,
} from '../form/SuperheroForm'

export default function FormPanel(props: SuperheroFormProps) {
    return (
        <ComicPanel centered>
            <SuperheroForm {...props} />
        </ComicPanel>
    )
}
