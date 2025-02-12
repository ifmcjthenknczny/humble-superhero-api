import ComicPanel from './ComicPanel'
import AddSuperheroForm, {
    Props as SuperheroFormProps,
} from '../form/AddSuperheroForm'

export default function FormPanel(props: SuperheroFormProps) {
    return (
        <ComicPanel centered header="Superhero registration form!!!">
            <AddSuperheroForm {...props} />
        </ComicPanel>
    )
}
