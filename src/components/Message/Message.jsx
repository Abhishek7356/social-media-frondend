import React, { useEffect, useState } from 'react'
import './Message.css'
import { format } from 'timeago.js'
import { getUser } from '../../services/allApi'
import user_image from '../../images/user.png'

function Message({ own, message }) {
    const [currentUser, setCurrentUser] = useState({});
    const fetchUser = async () => {
        let response = await getUser('', message.senderId);
        // console.log(response)
        setCurrentUser(response.data)
    }

    useEffect(() => {
        fetchUser()
    }, [message])

    return (
        <div className={own ? 'ownmessage' : 'message'}>
            <div className={own ? 'ownimgAndMsg' : 'imgAndMsg'}>
                <img className='userProImg' src={currentUser.profile_picture ? `http://localhost:4000/images/${currentUser.profile_picture}` : user_image} alt="" />
                <p className='userTextMsg'>{message.text}</p>
            </div>
            <div className='time'>{format(message.createdAt)}</div>
        </div>
    )
}

export default Message