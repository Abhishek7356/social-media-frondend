import React, { useContext, useEffect, useState } from 'react'
import './RightBar.css'
import { getFriends } from '../../services/allApi';
import user_image from '../../images/user.png'
import { StateProvider } from '../../context/AuthContext';

function RightBar() {

    const [friends, setFriends] = useState([]);
    const { user } = useContext(StateProvider)
    const fetchFriends = async () => {
        let response = await getFriends();
        console.log(response);
        setFriends(response.data);
    }
    // console.log(user)

    useEffect(() => {
        fetchFriends();
    }, [])

    let allUserRightBarFriendList = friends.map((item) => {
        if (item._id != user._id) {
            return (
                <div className='userDetails'>
                    <img className='userImage' src={item.profile_picture ? `http://localhost:4000/images/${item.profile_picture}` : user_image} alt="" />
                    <p className='fw-bold'>{item.username}</p>
                </div>
            )
        }
    })

    return (
        <div className='rightBarContainer'>
            <img className='friendsImage shadow' src="https://th.bing.com/th/id/OIP.SJw1t3Gxy1v1UCD2trGGuwHaEn?pid=ImgDet&rs=1" alt="" />
            <div className='onlineFriends'>
                <h5 className='fw-bold'>Online friends</h5>
                {allUserRightBarFriendList}
            </div>
        </div>
    )
}

export default RightBar