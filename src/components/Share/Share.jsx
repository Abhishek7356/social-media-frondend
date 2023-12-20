import React, { useContext, useState } from 'react'
import './Share.css'
import user_image from '../../images/user.png'
import { StateProvider } from '../../context/AuthContext';
import { addfile } from '../../services/allApi';


function Share() {

    const { user: currentUser } = useContext(StateProvider);
    const [postDetails, setPostDetails] = useState({
        caption: "",
        userId: currentUser._id,
        image: ""
    });
    const [Postfile, setPostFile] = useState(null)
    console.log(Postfile);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Postfile) {
            const data = new FormData();
            data.append("file", Postfile);
            data.append("caption", postDetails.caption);
            data.append("userId", postDetails.userId);
            // console.log(data);
            let fileResponse = await addfile(data);
            window.location.reload();
            console.log(fileResponse);
        }
    }

    return (
        <form className='addPost shadow' onSubmit={handleSubmit}>
            <div className='caption shadow'>
                <img src={currentUser.profile_picture ? `http://localhost:4000/images/${currentUser.profile_picture}` : user_image} alt="error" />
                <input className='' type="text" onChange={(e) => setPostDetails({ ...postDetails, caption: e.target.value })} placeholder={'What is in your mind ' + currentUser.username} />
            </div>
            {Postfile &&
                <div className='fileimg d-flex flex-column align-items-end'>
                    <i className='btn btn-close p-2 ' onClick={() => setPostFile(null)} ></i>
                    <img src={URL.createObjectURL(Postfile)} alt="" />
                </div>
            }
            <div className='caption'>
                <label htmlFor='postfile' className='post'>
                    <i class="fa-solid fa-image text-info fs-5"></i>
                    Photo/Video
                    <input style={{ display: 'none' }} onChange={(e) => setPostFile(e.target.files[0])} type="file" id='postfile' accept='.png, .jpg, .jpeg' />
                </label>
                <div className='post'>
                    <i class="fa-solid fa-tag text-success fs-5"></i>
                    Tag
                </div>
                <div className='post'>
                    <i class="fa-solid fa-location-dot text-danger fs-5"></i>
                    Location
                </div>
                <button type='submit'>Share</button>
            </div>
        </form>
    )
}

export default Share