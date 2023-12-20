import React, { useContext } from 'react'
import './LeftBar.css'
import { Link } from 'react-router-dom'
import { StateProvider } from '../../context/AuthContext'

function LeftBar() {

    const { user } = useContext(StateProvider);

    return (
        <div className='leftBarContainer'>
            <h2 className='fw-bolder'>Mediex</h2>
            <Link to={'/home'}><div className='leftBarContent'>
                <i class="fa-solid fa-house fs-5"></i>
                <h5>Home</h5>
            </div></Link>
            <div className='leftBarContent'>
                <i class="fa-solid fa-magnifying-glass fs-5"></i>
                <h5>Search</h5>
            </div>
            <div className='leftBarContent'>
                <i class="fa-brands fa-wpexplorer fs-4"></i>
                <h5>Explore</h5>
            </div>
            <div className='leftBarContent'>
                <i class="fa-solid fa-message fs-5"></i>
                <h5>Messages</h5>
            </div>
            <div className='leftBarContent'>
                <i class="fa-solid fa-bell fs-5"></i>
                <h5>Notifications</h5>
            </div>
            <div className='leftBarContent'>
                <i class="fa-solid fa-square-plus fs-5"></i>
                <h5>Create</h5>
            </div>
            <Link to={`/profile/${user.username}`}><div className='leftBarContent'>
                <i class="fa-solid fa-user fs-5"></i>
                <h5>Profile</h5>
            </div></Link>
            <hr />
            <div className='leftBarContent'>
                <i class="fa-solid fa-bars fs-5"></i>
                <h5>More</h5>
            </div>
        </div>
    )
}

export default LeftBar