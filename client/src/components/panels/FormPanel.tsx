import ComicPanel from './ComicPanel'
import AddSuperheroForm, {
    Props as SuperheroFormProps,
} from '../form/AddSuperheroForm'

export default function FormPanel(props: SuperheroFormProps) {
    return (
        <ComicPanel centered>
            <AddSuperheroForm {...props} />
        </ComicPanel>
    )
}
