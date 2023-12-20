import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { StateProvider } from '../context/AuthContext';
import user_image from '../images/user.png'
import { Link } from 'react-router-dom';

function Header() {

    const { user } = useContext(StateProvider);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload()
    }

    return (
        <div style={{ position: 'sticky', top: '0px', zIndex: '3' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link style={{color:'white'}} to={'/home'}>Mediex</Link>
                        </Typography>
                        {user && <Button color="inherit"><Link to={`/chat`} style={{ color: "white" }}><i class="fa-solid fs-4 fa-message"></i></Link></Button>}
                        {user && <Button onClick={handleLogout} color="inherit"><Link to={`/login`} style={{ color: "white" }}>Logout</Link></Button>}
                        {user && <Button color="inherit"><Link to={`/profile/${user.username}`}><img style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} src={user.profile_picture ? `http://localhost:4000/images/${user.profile_picture}` : user_image} alt="" /></Link></Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header