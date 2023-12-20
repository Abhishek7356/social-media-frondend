import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import Post from '../Post/Post';
import user_image from '../../images/user.png'
import { getAllPost, getCurrentUserPost } from '../../services/allApi'
import { StateProvider } from '../../context/AuthContext';
import Share from '../Share/Share';
function Feed({ user }) {
    // console.log(user);

    const [post, setPost] = useState([])
    const { user: currentUser } = useContext(StateProvider);

    const fetchData = async () => {
        let responsePost = user ? await getCurrentUserPost(user._id) : await getAllPost();
        setPost(responsePost.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
        // console.log(responsePost);
    }

    useEffect(() => {
        fetchData()
    }, [user])

    let showAllPost = post.map((item) => (
        <Post post={item} />
    ))

    return (
        <div className='feedContainer'>
            {user ? currentUser._id == user._id && <Share /> : <Share />}
            {showAllPost.length > 0 ? showAllPost : <h3 style={{ marginRight:'150px',marginTop:'100px' }}>There is no post to show !</h3>}
        </div>
    )
}

export default Feed