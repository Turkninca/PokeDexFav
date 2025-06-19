import './segments/Header.css'

export default function Header() {
    return(
        <div className='header-container'>
            <img src={"./pokemon-party.jpg"} alt="Header_background_image" className='top-image'/>
            <div className='text-container inset-0'>
                <div className='text-box'>
                    <h1 className="header-text">PokeFav</h1>
                    <p className="sub-text">Add Your Favorite Pokemon&apos;s</p>
                </div>
            </div>
        </div>
    )
}