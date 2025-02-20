import ComicPanel from './ComicPanel'

// https://www.flaticon.com/free-icon/superhero_1352473

export default function HeroImagePanel() {
    return (
        <ComicPanel
            centered
            className="hidden md:flex opacity-90 hover:opacity-100 transition-all"
        >
            <img
                className="w-72"
                src="/superhero.png"
                alt="Superhero is coming for rescue!!!"
            ></img>
        </ComicPanel>
    )
}
