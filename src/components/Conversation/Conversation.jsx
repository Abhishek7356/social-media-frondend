import React, { useContext, useEffect, useState } from 'react'
import './Conversation.css'
import user_image from '../../images/user.png'
import { StateProvider } from '../../context/AuthContext'
import { getUser } from '../../services/allApi'

function Conversation({ conversation, users }) {

    const { user } = useContext(StateProvider)
    const [coversationUserFriend, setCoversationUserFriend] = useState({});

    const friendDetails = async () => {
        if (conversation) {
            let friendId = conversation.member.filter((id) => (
                id !== user._id
            ));
            // console.log(...friendId);
            let userResponse = await getUser('', ...friendId);
            // console.log(userResponse);
            setCoversationUserFriend(userResponse.data)
        }
    }

    useEffect(() => {
        if (conversation) {
            friendDetails()
        }
    }, [conversation, coversationUserFriend])

    return (
        <div className='conversation'>
            <img src={conversation ? coversationUserFriend?.profile_picture ? `http://localhost:4000/images/${coversationUserFriend.profile_picture}` : user_image : users.profile_picture ? `http://localhost:4000/images/${users.profile_picture}` : user_image} alt="" />
            <h6 className='fw-bold'>{conversation ? coversationUserFriend.username : users.username}</h6>
        </div>
    )
}

export default Conversation