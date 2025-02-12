import './Loader.css'

// https://codepen.io/dragontheory/pen/zbmjoR

export default function Loader() {
    return (
        <div className="loader-overlay">
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
