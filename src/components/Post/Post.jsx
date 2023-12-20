import React, { useContext, useEffect, useState } from 'react'
import './Post.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getUser, updatePostLikes } from '../../services/allApi';
import { Link } from 'react-router-dom';
import { StateProvider } from '../../context/AuthContext';
import user_image from '../../images/user.png'
import { format } from 'timeago.js'

function Post({ post }) {
    // console.log(item);
    const { user: current_user } = useContext(StateProvider);
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(current_user._id));

    const fetchUserData = async () => {
        let responseUserData = await getUser('', post.userId);
        // console.log(responseUserData);
        setUser(responseUserData.data)
    }

    // useEffect(() => {
    //     setIsLiked(post.likes.includes(current_user._id));
    // }, []);

    useEffect(() => {
        fetchUserData();
    }, [post.userId]);

    const handlelikes = async () => {
        let response = await updatePostLikes({ userId: current_user._id }, post._id);
        // setIsLiked(post.likes.includes(current_user._id))
        setIsLiked(!isLiked)
        if (!isLiked) {
            setLikes(likes + 1)
        } else {
            setLikes(likes - 1)
        }
        // console.log(response);
    }

    return (
        <div className='postContainer'>
            <Card style={{ maxWidth: '500px', height: '500px' }}>
                <CardHeader
                    avatar={
                        <Link to={`/profile/${user.username}`}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                <img style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }} src={user.profile_picture ? `http://localhost:4000/images/${user.profile_picture}` : user_image} alt="" />
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={user.username}
                    subheader={format(post.createdAt)}
                />

                <CardMedia style={{ width: '500px', height: '330px', objectFit: 'cover' }}
                    component="img"
                    image={`http://localhost:4000/images/${post.image}`}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.caption}
                    </Typography>
                    <div className='d-flex justify-content-between'>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon onClick={handlelikes} className={isLiked ? 'text-danger' : ""} />
                            <span>{likes} <span className='fs-6'>peoples liked</span></span>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Post