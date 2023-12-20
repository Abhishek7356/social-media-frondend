import React, { useEffect } from 'react'
import './getStarted.css'
import { Link } from 'react-router-dom'

function GetStarted() {

    return (
        <div className='outerContainer'>
            <div className='startedWrap'>
                <h1>Welcome to Mediex</h1>
                <Link to={'/login'} ><button className='getStarted'>Get started</button></Link>
            </div>

        </div>
    )
}

export default GetStarted