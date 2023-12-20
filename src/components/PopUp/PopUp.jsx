import React, { useContext } from 'react'
import './PopUp.css'
import { updateImage } from '../../services/allApi'
import { StateProvider } from '../../context/AuthContext'

function PopUp({ ProfilePic, setprofilePic }) {
    const { user } = useContext(StateProvider);

    const handleProfilePicUpload = async () => {
        const data = new FormData();
        data.append("file", ProfilePic);
        let response = await updateImage(user._id, data);
        console.log(response.data);
        setprofilePic(null)
        let storageUser = JSON.parse(localStorage.getItem("user"));
        storageUser.profile_picture = response.data;
        localStorage.setItem("user", JSON.stringify(storageUser));
        window.location.reload();
    }

    return (
        <div className='outerPopUp'>
            <div className='popUp'>
                <div>
                    <img src={URL.createObjectURL(ProfilePic)} alt="" />
                </div>
                <div>
                    <button onClick={handleProfilePicUpload} className='btn btn-primary ms-2'>Upload</button>
                    <button onClick={() => setprofilePic(null)} className='btn btn-danger ms-2'>cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp