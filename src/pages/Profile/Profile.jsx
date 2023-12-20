import React, { useContext, useEffect, useRef, useState } from 'react'
import LeftBar from '../../components/LeftBar/LeftBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'
import './Profile.css'
import ProfileRightBar from '../../components/ProfileRightBar/ProfileRightBar'
import { getUser, updateUser, updateUserDetails } from '../../services/allApi'
import { json, useNavigate, useParams } from 'react-router-dom'
import cover_image from '../../images/default_cover_image.png'
import user_image from '../../images/user.png'
import PopUp from '../../components/PopUp/PopUp'
import { StateProvider } from '../../context/AuthContext'



function Profile() {

    const [Currentuser, setCurrentUser] = useState({})
    const [ProfilePic, setprofilePic] = useState(null)
    const [coverPic, setCoverPic] = useState(null)
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [relationship, setRelationship] = useState("")
    const [updatedMode, setUpdateMode] = useState(false)
    const { user } = useContext(StateProvider);
    const navigate = useNavigate()
    const { username } = useParams();
    const scrollRef = useRef()
    console.log(user)

    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [])
    // console.log(Currentuser);

    const fetchCurrentUserPost = async () => {
        let responseCurrentUser = await getUser(username, '');
        setCurrentUser(responseCurrentUser.data[0])
        // console.log(responseCurrentUser.data);
    }

    useEffect(() => {
        setName(user.username)
        setAbout(user.about)
        setCity(user.city)
        setCountry(user.country)
        setRelationship(user.relationship)
    }, [updatedMode])

    const handleCoverPicUpdate = async () => {
        if (user && coverPic) {
            const reqBody = new FormData();
            reqBody.append("username", user.username)
            reqBody.append("email", user.email)
            reqBody.append("password", user.password)
            reqBody.append("profile_picture", user.profile_picture)
            reqBody.append("file", coverPic)
            reqBody.append("about", user.about)
            reqBody.append("city", user.city)
            reqBody.append("country", user.country)
            reqBody.append("relationship", user.relationship)
            reqBody.append("followings", user.followings)
            reqBody.append("followers", user.followers)

            const reqHeader = {
                "Content-Type": "multipart/form-data"
            }

            const response = await updateUser(user._id, reqBody, reqHeader)
            console.log(response)
            if (response.status == 200) {
                setCoverPic(null)
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.reload();
            } else {
                alert("Something went wrong , Failed to update cover picture")
            }

        } else {
            alert("Please Login")
        }
    }

    const handleUserUpdate = async () => {
        if (name && about && city && country && relationship && user) {
            const reqBody = {
                username: name,
                about,
                city,
                country,
                relationship,
                cover_picture: user.cover_picture,
                email: user.email,
                followers: user.followers,
                followings: user.followings,
                password: user.password,
                profile_picture: user.profile_picture
            };
            const res = await updateUserDetails(user._id, reqBody)
            console.log(res);
            if (res.status == 200) {
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate('/home')
                window.location.reload()
                alert("User Updated Successfully")
            } else {
                alert("Something went wrong , failed to update user")
            }
        } else {
            alert("Some fields are empty!")
        }
    }

    useEffect(() => {
        fetchCurrentUserPost();
    }, [username, ProfilePic])

    return (
        <div className='outerDiv' ref={scrollRef}>
            <div className='profileConatiner'>
                <LeftBar />
                <div className='rightSection'>
                    <div className='profileTopSection'>
                        <div className='forImg'>
                            <img className='coverImg' src={coverPic ? URL.createObjectURL(coverPic) : (Currentuser?.cover_picture ? `http://localhost:4000/images/${Currentuser?.cover_picture}` : cover_image)} alt="" />
                            <div className='profileDiv'>
                                <form className='imgContainer'>
                                    <img className='profilePic' src={Currentuser?.profile_picture ? `http://localhost:4000/images/${Currentuser?.profile_picture}` : user_image} alt="" />
                                    {Currentuser?._id == user?._id && (!updatedMode && <label htmlFor='file' class="fa-solid fa-camera-retro"></label>)}
                                    <input style={{ display: 'none' }} onChange={(e) => setprofilePic(e.target.files[0])} type="file" id='file' />
                                </form>
                                {updatedMode ?
                                    <div className='updateModeBtnAndInput'>
                                        <div className='UpdateNameAndAbout'>
                                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Username' />
                                            <input onChange={(e) => setAbout(e.target.value)} value={about} type="text" placeholder='About you' />
                                        </div>
                                        <button onClick={handleUserUpdate} className='UpdateBtn'>Update</button>
                                        <button onClick={() => setUpdateMode(false)} className='updateDiscardBtn'>Discard</button>
                                    </div>
                                    :
                                    <div>
                                        <h5 className='fw-bold'>{Currentuser?.username}</h5>
                                        <h6 className='fw-bold'>{Currentuser?.about}</h6>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className='profilePostSection'>
                        <Feed user={Currentuser} />
                        <ProfileRightBar setCountry={setCountry} city={city} country={country} relationship={relationship} setRelationship={setRelationship} updatedMode={updatedMode} setCity={setCity} setUpdateMode={setUpdateMode} currentUser={Currentuser} />
                    </div>
                </div>
            </div>
            {Currentuser?._id == user?._id && (!updatedMode && <label className='coverUpdateBtn'>
                <input style={{ display: 'none' }} onChange={(e) => setCoverPic(e.target.files[0])} type="file" />
                <i class="fa-solid fa-camera-retro"></i>
            </label>)}
            {coverPic && <div className='coverImageCancelOrSaveBtns'>
                <button className='discardBtn' onClick={() => setCoverPic(null)}>Discard</button>
                <button onClick={handleCoverPicUpdate} className='saveBtn'>Save</button>
            </div>}
            {ProfilePic && <PopUp ProfilePic={ProfilePic} setprofilePic={setprofilePic} />}
            {Currentuser?._id == user?._id && <button onClick={() => setUpdateMode(true)} className='userUpdateBtn'><i class="fa-solid fa-user-pen"></i></button>}
        </div>
    )
}

export default Profile