import React, { useContext, useEffect, useState } from 'react'
import './ProfileRightBar.css'
import { getFriends, handleAllFollows } from '../../services/allApi'
import user_image from '../../images/user.png'
import { StateProvider } from '../../context/AuthContext'

function ProfileRightBar({ currentUser, updatedMode, setCity, setCountry, setRelationship, city, country, relationship }) {

    const { user } = useContext(StateProvider);
    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const fetchFriends = async () => {
        let response = await getFriends();
        setFriends(response.data);
    }
    console.log(isFollowed);

    useEffect(() => {
        setIsFollowed(currentUser.followers?.includes(user._id));
        setFollowers(currentUser.followers?.length)
    }, [currentUser])

    useEffect(() => {
        fetchFriends();
    }, [])

    let allUsersList = friends.map((item) => {
        if (item._id != currentUser?._id) {
            return (
                <div className='userFrients'>
                    <div className='users'>
                        <img className='usersPic' src={item.profile_picture ? `http://localhost:4000/images/${item.profile_picture}` : user_image} alt="" />
                        <h6 className='text-center mt-2'>{item.username}</h6>
                    </div>
                </div>
            )
        }
    })

    const handleFollow = async () => {
        let response = await handleAllFollows({ userId: user?._id }, currentUser?._id);
        // console.log(response);
        setIsFollowed(!isFollowed)
        if (isFollowed) {
            setFollowers(followers - 1)
        } else {
            setFollowers(followers + 1)
        }
    }

    return (
        <div className='proRightBar'>
            <div className='followDetails'>
                <div className='followList'>
                    <h5>Followers</h5>
                    <h3 className='text-center'>{followers}</h3>
                </div>
                <div className='followList'>
                    <h5>Following</h5>
                    <h3 className='text-center'>{currentUser?.followings?.length}</h3>
                </div>
            </div>
            {currentUser?._id != user?._id && <button onClick={handleFollow} className='btn btn-primary mb-3'>{isFollowed ? "Unfollow" : "Follow"}</button>}
            <h6 className='fw-bold'>User Informations :</h6>
            <div className='userUpdate'>
                {updatedMode ? <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder='City' /> : <p>City : {currentUser.city}</p>}
                {updatedMode ? <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" placeholder='Country' /> : <p>Country : {currentUser.country}</p>}
                {updatedMode ? <input onChange={(e) => setRelationship(e.target.value)} value={relationship} type="text" placeholder='Relationship' /> : <p>Relationship : {currentUser.relationship}</p>}
            </div>
            <h6 className='fw-bold'>User Friends : </h6>
            <div className='userFrients'>
                {allUsersList}
            </div>
        </div>
    )
}

export default ProfileRightBar