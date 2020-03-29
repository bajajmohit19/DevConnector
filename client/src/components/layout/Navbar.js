import React ,{Fragment} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'
import {FaSignOutAlt} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSignOutAlt, faDatabase, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/fontawesome-svg-core'



const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                    <span className='hide-sm'><FontAwesomeIcon icon={faTachometerAlt}/>{' '}</span> 
                        
                    Dashboard
                </Link>
            </li>
                <li className='small'>

                    <a onClick={logout} href='#!'>
                    <span className='hide-sm'><FontAwesomeIcon icon={faSignOutAlt}/>{' '}</span> 
                        <span className='hide-sm'>Logout</span>
                    </a>
                </li>
            </ul>

    )
    const guestLinks = (
        <ul>
                <li className='small'>
                    <Link to="#!">Developers</Link>
                </li>
                <li className='small'>
                    <Link to="/register">Register</Link>
                </li>
                <li className='small'>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
    )
    return (
        <nav className="navbar bg-dark" style={{position:'absolute'}}>
            <h1>
                <Link to="/"><i className="fa fa-code"></i> DevConnector</Link>
            </h1>
    { !loading&& <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
            
        </nav>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, {logout}) (Navbar)