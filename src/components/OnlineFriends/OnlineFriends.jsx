import React, { useContext, useEffect, useState } from 'react'
import './OnlineFriends.css'
import { getParticularConversation, getUser } from '../../services/allApi'
import user_image from '../../images/user.png'
import { StateProvider } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function OnlineFriends({ onlineUser, setCurrentChat }) {
    const { user: currentUser } = useContext(StateProvider)
    const [user, setUser] = useState({});
    // console.log(onlineUser);
    const fetchUser = async () => {
        let response = await getUser('', onlineUser.userId);
        // console.log(response);
        setUser(response.data)

    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleCoversation = async () => {
        let response = await getParticularConversation(onlineUser.userId, currentUser._id);
        // console.log(response.data);
        setCurrentChat(response.data)
    }

    return (
        <div onClick={handleCoversation} className='onlineFrnds' >
            <div className='imgContainer'>
                <Link to={'/profile/' + user.username}><img src={user.profile_picture ? `http://localhost:4000/images/${user.profile_picture}` : user_image} alt="" /></Link>
                <div className='onlineSign'></div>
            </div>
            <h6 className='fw-bold'>{user.username}</h6>
        </div>
    )
}

export default OnlineFriends