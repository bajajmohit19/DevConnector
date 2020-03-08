import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark" style={{position:'absolute'}}>
            <h1>
                <Link to="/"><i className="fa fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li className='small'>
                    <Link to="!3">Developers</Link>
                </li>
                <li className='small'>
                    <Link to="/register">Register</Link>
                </li>
                <li className='small'>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar