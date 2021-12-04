import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a href="/" className="navbar-brand">
                    Rick and Morty App
                </a>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        {/* <a href="">Hola world</a> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
